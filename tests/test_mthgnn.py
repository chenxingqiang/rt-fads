import pytest
import torch
import numpy as np
from rt_fads.models import MTHGNN
from rt_fads.training import MTHGNNTrainer


@pytest.fixture
def model_config():
    return {
        'input_dim': 64,
        'hidden_dim': 128,
        'output_dim': 2,
        'num_heads': 4,
        'num_layers': 3,
        'optimizer': {
            'type': 'adam',
            'learning_rate': 0.001,
            'weight_decay': 0.0001
        }
    }


@pytest.fixture
def sample_batch(model_config):
    batch_size = 32
    num_nodes = 100
    num_edges = 300

    return {
        'features': torch.randn(num_nodes, model_config['input_dim']),
        'edge_index': torch.randint(0, num_nodes, (2, num_edges)),
        'edge_attr': torch.randn(num_edges, 16),
        'scene_info': torch.randn(num_nodes, 32),
        'temporal_info': torch.randn(num_nodes, 32),
        'labels': torch.randint(0, 2, (num_nodes,)),
        'batch': torch.repeat_interleave(
            torch.arange(batch_size),
            num_nodes // batch_size
        )
    }


class TestMTHGNN:
    def test_model_initialization(self, model_config):
        model = MTHGNN(model_config)
        assert isinstance(model, MTHGNN)

    def test_forward_pass(self, model_config, sample_batch):
        model = MTHGNN(model_config)
        outputs = model(
            x=sample_batch['features'],
            edge_index=sample_batch['edge_index'],
            edge_attr=sample_batch['edge_attr'],
            scene_info=sample_batch['scene_info'],
            temporal_info=sample_batch['temporal_info'],
            batch=sample_batch['batch']
        )
        assert outputs.shape == (
            len(sample_batch['features']), model_config['output_dim'])

    def test_loss_calculation(self, model_config, sample_batch):
        model = MTHGNN(model_config)
        outputs = model(
            x=sample_batch['features'],
            edge_index=sample_batch['edge_index'],
            edge_attr=sample_batch['edge_attr'],
            scene_info=sample_batch['scene_info'],
            temporal_info=sample_batch['temporal_info'],
            batch=sample_batch['batch']
        )
        loss = model.loss_function(outputs, sample_batch['labels'])
        assert isinstance(loss.item(), float)

    @pytest.mark.gpu
    def test_gpu_training(self, model_config, sample_batch):
        if not torch.cuda.is_available():
            pytest.skip("GPU not available")

        device = torch.device('cuda')
        model = MTHGNN(model_config).to(device)
        batch = {k: v.to(device) for k, v in sample_batch.items()}

        outputs = model(
            x=batch['features'],
            edge_index=batch['edge_index'],
            edge_attr=batch['edge_attr'],
            scene_info=batch['scene_info'],
            temporal_info=batch['temporal_info'],
            batch=batch['batch']
        )
        assert outputs.device == device


class TestMTHGNNTrainer:
    def test_trainer_initialization(self, model_config):
        model = MTHGNN(model_config)
        trainer = MTHGNNTrainer(model, model_config)
        assert isinstance(trainer, MTHGNNTrainer)

    def test_training_step(self, model_config, sample_batch):
        model = MTHGNN(model_config)
        trainer = MTHGNNTrainer(model, model_config)

        metrics = trainer.train_epoch(
            [sample_batch],
            epoch=0
        )
        assert 'loss' in metrics
        assert isinstance(metrics['loss'], float)
