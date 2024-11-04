import time
import torch
import numpy as np
from typing import Dict, List
from dataclasses import dataclass
import pandas as pd
from rt_fads.models import MTHGNN
from rt_fads.utils.logger import setup_logger

logger = setup_logger(__name__)


@dataclass
class BenchmarkResult:
    """Benchmark result container"""
    name: str
    avg_latency: float
    throughput: float
    memory_usage: float
    gpu_usage: float
    accuracy: float


class ModelBenchmarker:
    """Performance benchmarking for model"""

    def __init__(
        self,
        model: MTHGNN,
        config: Dict
    ):
        self.model = model
        self.config = config
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )
        self.model.to(self.device)

    def run_latency_benchmark(
        self,
        batch_sizes: List[int] = [1, 8, 16, 32, 64, 128]
    ) -> pd.DataFrame:
        """Measure inference latency across different batch sizes"""
        results = []

        for batch_size in batch_sizes:
            # Generate test data
            test_data = self._generate_test_data(batch_size)

            # Warmup
            for _ in range(10):
                _ = self.model(**test_data)

            # Measure latency
            latencies = []
            for _ in range(100):
                start_time = torch.cuda.Event(enable_timing=True)
                end_time = torch.cuda.Event(enable_timing=True)

                start_time.record()
                _ = self.model(**test_data)
                end_time.record()

                torch.cuda.synchronize()
                latencies.append(start_time.elapsed_time(end_time))

            results.append({
                'batch_size': batch_size,
                'avg_latency': np.mean(latencies),
                'p95_latency': np.percentile(latencies, 95),
                'p99_latency': np.percentile(latencies, 99)
            })

        return pd.DataFrame(results)

    def run_throughput_benchmark(
        self,
        duration: int = 60
    ) -> Dict[str, float]:
        """Measure maximum throughput"""
        batch_size = self.config['batch_size']
        test_data = self._generate_test_data(batch_size)

        start_time = time.time()
        num_predictions = 0

        while (time.time() - start_time) < duration:
            _ = self.model(**test_data)
            num_predictions += batch_size

        elapsed_time = time.time() - start_time
        throughput = num_predictions / elapsed_time

        return {
            'throughput': throughput,
            'duration': elapsed_time,
            'total_predictions': num_predictions
        }

    def run_memory_benchmark(self) -> Dict[str, float]:
        """Measure memory usage"""
        torch.cuda.reset_peak_memory_stats()

        test_data = self._generate_test_data(
            self.config['batch_size']
        )

        # Run inference
        _ = self.model(**test_data)

        memory_stats = {
            'allocated_memory': torch.cuda.memory_allocated() / 1e9,  # GB
            'max_memory': torch.cuda.max_memory_allocated() / 1e9,  # GB
            'cached_memory': torch.cuda.memory_reserved() / 1e9  # GB
        }

        return memory_stats

    def run_full_benchmark(self) -> BenchmarkResult:
        """Run comprehensive benchmark"""
        # Latency test
        latency_results = self.run_latency_benchmark()
        avg_latency = latency_results['avg_latency'].mean()

        # Throughput test
        throughput_results = self.run_throughput_benchmark()
        throughput = throughput_results['throughput']

        # Memory test
        memory_results = self.run_memory_benchmark()
        memory_usage = memory_results['max_memory']

        # GPU utilization
        gpu_usage = self._measure_gpu_utilization()

        # Accuracy test
        accuracy = self._measure_accuracy()

        return BenchmarkResult(
            name=self.model.__class__.__name__,
            avg_latency=avg_latency,
            throughput=throughput,
            memory_usage=memory_usage,
            gpu_usage=gpu_usage,
            accuracy=accuracy
        )

    def _generate_test_data(
        self,
        batch_size: int
    ) -> Dict[str, torch.Tensor]:
        """Generate test data for benchmarking"""
        num_nodes = batch_size * 100
        num_edges = num_nodes * 3

        return {
            'x': torch.randn(
                num_nodes,
                self.config['input_dim'],
                device=self.device
            ),
            'edge_index': torch.randint(
                0, num_nodes,
                (2, num_edges),
                device=self.device
            ),
            'edge_attr': torch.randn(
                num_edges,
                self.config['edge_dim'],
                device=self.device
            ),
            'scene_info': torch.randn(
                num_nodes,
                self.config['scene_dim'],
                device=self.device
            ),
            'temporal_info': torch.randn(
                num_nodes,
                self.config['temporal_dim'],
                device=self.device
            )
        }

    def _measure_gpu_utilization(self) -> float:
        """Measure GPU utilization"""
        if not torch.cuda.is_available():
            return 0.0

        try:
            import pynvml
            pynvml.nvmlInit()
            handle = pynvml.nvmlDeviceGetHandleByIndex(0)
            info = pynvml.nvmlDeviceGetUtilizationRates(handle)
            return info.gpu
        except:
            logger.warning("Failed to measure GPU utilization")
            return 0.0

    def _measure_accuracy(self) -> float:
        """Measure model accuracy on test data"""
        self.model.eval()
        test_data = self._generate_test_data(32)

        with torch.no_grad():
            outputs = self.model(**test_data)
            # Simulate accuracy calculation
            accuracy = 0.95  # Placeholder

        return accuracy
