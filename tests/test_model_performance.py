import pytest
import torch
import numpy as np
from rt_fads.models import MTHGNN
from rt_fads.training import MTHGNNTrainer
from rt_fads.utils.metrics import MetricsCalculator


class TestModelPerformance:
    def test_model_accuracy(self, model, sample_batch):
        """Test model prediction accuracy"""
        # Forward pass
        output = model(
            x=sample_batch['features'],
            edge_index=sample_batch['edge_index'],
            edge_attr=sample_batch['edge_attr'],
            scene_info=sample_batch['scene_info'],
            temporal_info=sample_batch['temporal_info']
        )

        # Calculate metrics
        metrics = MetricsCalculator.calculate_metrics(
            sample_batch['labels'],
            output.detach()
        )

        # Assert minimum performance requirements
        assert metrics['accuracy'] > 0.7
        assert metrics['precision'] > 0.6
        assert metrics['recall'] > 0.6
        assert metrics['f1'] > 0.65

    @pytest.mark.gpu
    def test_gpu_performance(self, model, sample_batch):
        """Test model performance on GPU"""
        if not torch.cuda.is_available():
            pytest.skip("GPU not available")

        # Move model and data to GPU
        model = model.cuda()
        batch = {k: v.cuda() for k, v in sample_batch.items()}

        # Measure inference time
        start_time = torch.cuda.Event(enable_timing=True)
        end_time = torch.cuda.Event(enable_timing=True)

        start_time.record()
        _ = model(
            x=batch['features'],
            edge_index=batch['edge_index'],
            edge_attr=batch['edge_attr'],
            scene_info=batch['scene_info'],
            temporal_info=batch['temporal_info']
        )
        end_time.record()

        torch.cuda.synchronize()
        inference_time = start_time.elapsed_time(end_time)

        # Assert performance requirements
        assert inference_time < 100  # ms

    def test_memory_usage(self, model, sample_batch):
        """Test model memory usage"""
        torch.cuda.reset_peak_memory_stats()

        _ = model(
            x=sample_batch['features'],
            edge_index=sample_batch['edge_index'],
            edge_attr=sample_batch['edge_attr'],
            scene_info=sample_batch['scene_info'],
            temporal_info=sample_batch['temporal_info']
        )

        memory_usage = torch.cuda.max_memory_allocated()
        assert memory_usage < 1e9  # 1GB limit
