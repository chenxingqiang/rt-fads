from tqdm import tqdm
from ..monitoring import MetricsCollector
from ..utils.logger import setup_logger
from torch.utils.data import DataLoader
from typing import Dict, Optional, Tuple
import torch.nn as nn
import torch
from secretflow.ml.nn import SecureTrainer
from rt_fads.utils.metrics import calculate_metrics


class ModelTrainer(SecureTrainer):
    """Secure model trainer"""

    def __init__(self, model, optimizer, device):
        super().__init__()
        self.model = model
        self.optimizer = optimizer
        self.device = device

    def train_epoch(self, train_loader, epoch):
        self.model.train()
        total_loss = 0

        for batch_idx, (data, target) in enumerate(train_loader):
            data, target = data.to(self.device), target.to(self.device)

            self.optimizer.zero_grad()
            output = self.model(data)
            loss = self.criterion(output, target)

            loss.backward()
            self.optimizer.step()

            total_loss += loss.item()

        return total_loss / len(train_loader)

    def evaluate(self, test_loader):
        self.model.eval()
        predictions = []
        targets = []

        with torch.no_grad():
            for data, target in test_loader:
                data, target = data.to(self.device), target.to(self.device)
                output = self.model(data)
                predictions.extend(output.cpu().numpy())
                targets.extend(target.cpu().numpy())

        metrics = calculate_metrics(targets, predictions)
        return metrics


logger = setup_logger(__name__)


class MTHGNNTrainer:
    """Trainer for MT-HGNN model"""

    def __init__(
        self,
        model: nn.Module,
        config: Dict,
        device: torch.device = None
    ):
        self.model = model
        self.config = config
        self.device = device or torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        # Move model to device
        self.model.to(self.device)

        # Setup optimizer
        self.optimizer = self._setup_optimizer()
        self.scheduler = self._setup_scheduler()

        # Metrics collector
        self.metrics_collector = MetricsCollector()

    def _setup_optimizer(self) -> torch.optim.Optimizer:
        """Setup optimizer based on config"""
        optimizer_config = self.config['optimizer']
        if optimizer_config['type'].lower() == 'adam':
            return torch.optim.Adam(
                self.model.parameters(),
                lr=optimizer_config['learning_rate'],
                weight_decay=optimizer_config['weight_decay']
            )
        # Add more optimizer options here
        raise ValueError(f"Unsupported optimizer: {optimizer_config['type']}")

    def _setup_scheduler(self) -> Optional[torch.optim.lr_scheduler._LRScheduler]:
        """Setup learning rate scheduler"""
        scheduler_config = self.config.get('scheduler')
        if not scheduler_config:
            return None

        if scheduler_config['type'].lower() == 'cosine':
            return torch.optim.lr_scheduler.CosineAnnealingLR(
                self.optimizer,
                T_max=scheduler_config['T_max'],
                eta_min=scheduler_config['eta_min']
            )
        # Add more scheduler options here
        return None

    def train_epoch(
        self,
        train_loader: DataLoader,
        epoch: int
    ) -> Dict[str, float]:
        """Train for one epoch"""
        self.model.train()
        total_loss = 0
        total_samples = 0

        pbar = tqdm(train_loader, desc=f"Epoch {epoch}")
        for batch in pbar:
            # Move batch to device
            batch = {k: v.to(self.device) for k, v in batch.items()}

            # Forward pass
            self.optimizer.zero_grad()
            outputs = self.model(
                x=batch['features'],
                edge_index=batch['edge_index'],
                edge_attr=batch['edge_attr'],
                scene_info=batch['scene_info'],
                temporal_info=batch['temporal_info'],
                batch=batch.get('batch')
            )

            # Calculate loss
            loss = self.model.loss_function(
                outputs,
                batch['labels'],
                batch.get('mask')
            )

            # Backward pass
            loss.backward()

            # Gradient clipping
            torch.nn.utils.clip_grad_norm_(
                self.model.parameters(),
                self.config.get('max_grad_norm', 1.0)
            )

            self.optimizer.step()

            # Update metrics
            total_loss += loss.item() * batch['features'].size(0)
            total_samples += batch['features'].size(0)

            # Update progress bar
            pbar.set_postfix({
                'loss': loss.item(),
                'avg_loss': total_loss / total_samples
            })

        # Step scheduler
        if self.scheduler is not None:
            self.scheduler.step()

        # Calculate epoch metrics
        metrics = {
            'loss': total_loss / total_samples,
            'lr': self.optimizer.param_groups[0]['lr']
        }

        return metrics

    @torch.no_grad()
    def evaluate(
        self,
        val_loader: DataLoader
    ) -> Dict[str, float]:
        """Evaluate model"""
        self.model.eval()
        total_loss = 0
        total_samples = 0

        all_preds = []
        all_labels = []

        for batch in val_loader:
            # Move batch to device
            batch = {k: v.to(self.device) for k, v in batch.items()}

            # Forward pass
            outputs = self.model(
                x=batch['features'],
                edge_index=batch['edge_index'],
                edge_attr=batch['edge_attr'],
                scene_info=batch['scene_info'],
                temporal_info=batch['temporal_info'],
                batch=batch.get('batch')
            )

            # Calculate loss
            loss = self.model.loss_function(
                outputs,
                batch['labels'],
                batch.get('mask')
            )

            # Update metrics
            total_loss += loss.item() * batch['features'].size(0)
            total_samples += batch['features'].size(0)

            # Store predictions and labels
            all_preds.append(outputs.cpu())
            all_labels.append(batch['labels'].cpu())

        # Concatenate predictions and labels
        all_preds = torch.cat(all_preds, dim=0)
        all_labels = torch.cat(all_labels, dim=0)

        # Calculate metrics
        metrics = self.metrics_collector.calculate_metrics(
            all_preds,
            all_labels
        )
        metrics['loss'] = total_loss / total_samples

        return metrics

    def train(
        self,
        train_loader: DataLoader,
        val_loader: DataLoader,
        num_epochs: int
    ) -> Dict[str, list]:
        """Complete training process"""
        history = {
            'train_loss': [],
            'val_loss': [],
            'val_metrics': []
        }

        best_val_loss = float('inf')
        patience = self.config.get('patience', 10)
        patience_counter = 0

        for epoch in range(num_epochs):
            # Training phase
            train_metrics = self.train_epoch(train_loader, epoch)
            history['train_loss'].append(train_metrics['loss'])

            # Validation phase
            val_metrics = self.evaluate(val_loader)
            history['val_loss'].append(val_metrics['loss'])
            history['val_metrics'].append(val_metrics)

            # Logging
            logger.info(
                f"Epoch {epoch}: "
                f"Train Loss = {train_metrics['loss']:.4f}, "
                f"Val Loss = {val_metrics['loss']:.4f}, "
                f"Val F1 = {val_metrics['f1']:.4f}"
            )

            # Early stopping
            if val_metrics['loss'] < best_val_loss:
                best_val_loss = val_metrics['loss']
                patience_counter = 0
                # Save best model
                self.save_checkpoint(f"best_model_epoch_{epoch}.pt")
            else:
                patience_counter += 1
                if patience_counter >= patience:
                    logger.info(f"Early stopping at epoch {epoch}")
                    break

        return history

    def save_checkpoint(self, path: str):
        """Save model checkpoint"""
        torch.save({
            'model_state_dict': self.model.state_dict(),
            'optimizer_state_dict': self.optimizer.state_dict(),
            'scheduler_state_dict': self.scheduler.state_dict() if self.scheduler else None,
            'config': self.config
        }, path)

    def load_checkpoint(self, path: str):
        """Load model checkpoint"""
        checkpoint = torch.load(path, map_location=self.device)
        self.model.load_state_dict(checkpoint['model_state_dict'])
        self.optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
        if checkpoint['scheduler_state_dict'] and self.scheduler:
            self.scheduler.load_state_dict(checkpoint['scheduler_state_dict'])
