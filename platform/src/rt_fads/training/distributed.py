import torch
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from typing import Dict, Optional
import os
import horovod.torch as hvd
from ..utils.logger import setup_logger

logger = setup_logger(__name__)


class DistributedTrainer:
    """Distributed training implementation"""

    def __init__(
        self,
        model: torch.nn.Module,
        config: Dict,
        backend: str = 'nccl'
    ):
        self.config = config
        self.backend = backend

        # Initialize distributed environment
        self._init_distributed()

        # Wrap model with DDP
        self.model = DDP(
            model.to(self.device),
            device_ids=[self.local_rank]
        )

        # Initialize optimizer with Horovod
        self.optimizer = self._init_optimizer()

    def _init_distributed(self):
        """Initialize distributed training environment"""
        # Horovod initialization
        hvd.init()

        # Set cuda device
        if torch.cuda.is_available():
            self.local_rank = hvd.local_rank()
            torch.cuda.set_device(self.local_rank)
            self.device = torch.device(f'cuda:{self.local_rank}')
        else:
            self.device = torch.device('cpu')

        # Initialize process group
        if self.backend == 'nccl':
            dist.init_process_group(
                backend=self.backend,
                init_method='env://'
            )

    def _init_optimizer(self) -> torch.optim.Optimizer:
        """Initialize distributed optimizer"""
        optimizer = torch.optim.Adam(
            self.model.parameters(),
            lr=self.config['learning_rate']
        )

        # Wrap optimizer with Horovod
        optimizer = hvd.DistributedOptimizer(
            optimizer,
            named_parameters=self.model.named_parameters(),
            compression=hvd.Compression.fp16
        )

        return optimizer

    def train(
        self,
        train_loader: torch.utils.data.DataLoader,
        val_loader: torch.utils.data.DataLoader,
        num_epochs: int
    ):
        """Distributed training loop"""
        # Broadcast parameters
        hvd.broadcast_parameters(self.model.state_dict(), root_rank=0)

        for epoch in range(num_epochs):
            # Training
            self.model.train()
            train_loss = self._train_epoch(train_loader, epoch)

            # Validation (only on rank 0)
            if hvd.rank() == 0:
                val_metrics = self._validate(val_loader)
                logger.info(
                    f"Epoch {epoch}: "
                    f"Train Loss = {train_loss:.4f}, "
                    f"Val Loss = {val_metrics['loss']:.4f}"
                )

            # Synchronize
            dist.barrier()

    def _train_epoch(
        self,
        train_loader: torch.utils.data.DataLoader,
        epoch: int
    ) -> float:
        """Train for one epoch"""
        total_loss = 0.0
        for batch_idx, data in enumerate(train_loader):
            # Move data to device
            data = {k: v.to(self.device) for k, v in data.items()}

            # Forward pass
            self.optimizer.zero_grad()
            output = self.model(
                x=data['features'],
                edge_index=data['edge_index'],
                edge_attr=data['edge_attr'],
                scene_info=data['scene_info'],
                temporal_info=data['temporal_info']
            )

            # Calculate loss
            loss = self.model.module.loss_function(
                output,
                data['labels']
            )

            # Backward pass
            loss.backward()
            self.optimizer.step()

            # Update metrics
            total_loss += loss.item()

            # Log progress
            if batch_idx % self.config['log_interval'] == 0:
                logger.info(
                    f"Rank {hvd.rank()}, "
                    f"Epoch {epoch}, "
                    f"Batch {batch_idx}, "
                    f"Loss {loss.item():.4f}"
                )

        return total_loss / len(train_loader)

    @torch.no_grad()
    def _validate(
        self,
        val_loader: torch.utils.data.DataLoader
    ) -> Dict[str, float]:
        """Validation step"""
        self.model.eval()
        total_loss = 0.0

        for data in val_loader:
            # Move data to device
            data = {k: v.to(self.device) for k, v in data.items()}

            # Forward pass
            output = self.model(
                x=data['features'],
                edge_index=data['edge_index'],
                edge_attr=data['edge_attr'],
                scene_info=data['scene_info'],
                temporal_info=data['temporal_info']
            )

            # Calculate loss
            loss = self.model.module.loss_function(
                output,
                data['labels']
            )

            total_loss += loss.item()

        return {
            'loss': total_loss / len(val_loader)
        }

    def save_checkpoint(
        self,
        path: str,
        epoch: int,
        is_best: bool = False
    ):
        """Save distributed training checkpoint"""
        if hvd.rank() == 0:
            checkpoint = {
                'epoch': epoch,
                'model_state_dict': self.model.module.state_dict(),
                'optimizer_state_dict': self.optimizer.state_dict(),
                'config': self.config
            }

            # Save checkpoint
            torch.save(checkpoint, path)

            # Save best model if needed
            if is_best:
                best_path = f"{os.path.splitext(path)[0]}_best.pt"
                torch.save(checkpoint, best_path)

    def load_checkpoint(self, path: str):
        """Load distributed training checkpoint"""
        checkpoint = torch.load(path, map_location=self.device)
        self.model.module.load_state_dict(checkpoint['model_state_dict'])
        self.optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
        return checkpoint['epoch']
