import pytest
import torch
import numpy as np
from rt_fads.models import MTHGNN
from rt_fads.data import GraphDataset


@pytest.fixture
def model_config():
    """Model configuration fixture"""
    return {
        'input_dim': 64,
        'hidden_dim': 128,
        'output_dim': 2,
        'num_heads': 4,
        'num_layers': 3,
        'dropout': 0.1
    }


@pytest.fixture
def sample_batch(model_config):
    """Sample batch data fixture"""
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


@pytest.fixture
def model(model_config):
    """Model fixture"""
    return MTHGNN(model_config)


@pytest.fixture
def dataset():
    """Dataset fixture"""
    return GraphDataset(
        root='tests/data',
        transform=None
    )
