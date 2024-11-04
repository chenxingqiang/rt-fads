import pytest
import torch
from rt_fads.models.mt_hgnn import MTHGNN


def test_mt_hgnn_forward():
    model = MTHGNN(input_dim=128, hidden_dim=256, output_dim=2)
    x = torch.randn(32, 128)
    scene_info = torch.randn(32, 64)
    temporal_info = torch.randn(32, 32)

    output = model(x, scene_info, temporal_info)
    assert output.shape == (32, 2)


def test_secure_computation():
    # Add secure computation tests
    pass
