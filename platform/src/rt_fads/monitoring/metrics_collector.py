import time
from typing import Dict, List
import prometheus_client as prom
from prometheus_client import Counter, Histogram, Gauge
import threading
import psutil
import torch
from ..utils.logger import setup_logger

logger = setup_logger(__name__)


class MetricsCollector:
    """System and model metrics collection"""

    def __init__(self):
        # Model metrics
        self.prediction_counter = Counter(
            'rt_fads_predictions_total',
            'Total number of predictions made'
        )
        self.prediction_latency = Histogram(
            'rt_fads_prediction_latency_seconds',
            'Prediction latency in seconds',
            buckets=(0.005, 0.01, 0.025, 0.05, 0.075,
                     0.1, 0.25, 0.5, 0.75, 1.0)
        )
        self.fraud_detected = Counter(
            'rt_fads_fraud_detected_total',
            'Total number of frauds detected'
        )

        # System metrics
        self.gpu_memory_used = Gauge(
            'rt_fads_gpu_memory_used_bytes',
            'GPU memory used in bytes'
        )
        self.cpu_usage = Gauge(
            'rt_fads_cpu_usage_percent',
            'CPU usage percentage'
        )
        self.memory_usage = Gauge(
            'rt_fads_memory_usage_bytes',
            'Memory usage in bytes'
        )

        # Model performance metrics
        self.model_accuracy = Gauge(
            'rt_fads_model_accuracy',
            'Model accuracy score'
        )
        self.false_positives = Counter(
            'rt_fads_false_positives_total',
            'Total number of false positives'
        )

        # Start background metrics collection
        self._start_background_collection()

    def _start_background_collection(self):
        """Start background system metrics collection"""
        def collect_system_metrics():
            while True:
                # Collect GPU metrics if available
                if torch.cuda.is_available():
                    memory_used = torch.cuda.memory_allocated()
                    self.gpu_memory_used.set(memory_used)

                # Collect CPU metrics
                cpu_percent = psutil.cpu_percent()
                self.cpu_usage.set(cpu_percent)

                # Collect memory metrics
                memory_info = psutil.Process().memory_info()
                self.memory_usage.set(memory_info.rss)

                time.sleep(15)  # Collect every 15 seconds

        thread = threading.Thread(
            target=collect_system_metrics,
            daemon=True
        )
        thread.start()

    def record_prediction(
        self,
        start_time: float,
        is_fraud: bool,
        latency: float = None
    ):
        """Record prediction metrics"""
        self.prediction_counter.inc()

        if latency is None:
            latency = time.time() - start_time
        self.prediction_latency.observe(latency)

        if is_fraud:
            self.fraud_detected.inc()

    def update_model_metrics(
        self,
        metrics: Dict[str, float]
    ):
        """Update model performance metrics"""
        if 'accuracy' in metrics:
            self.model_accuracy.set(metrics['accuracy'])
        if 'false_positives' in metrics:
            self.false_positives.inc(metrics['false_positives'])

    def get_current_metrics(self) -> Dict[str, float]:
        """Get current metrics values"""
        return {
            'predictions_total': float(self.prediction_counter._value.get()),
            'frauds_detected': float(self.fraud_detected._value.get()),
            'avg_latency': float(sum(self.prediction_latency._sum.get())),
            'gpu_memory_used': float(self.gpu_memory_used._value.get()),
            'cpu_usage': float(self.cpu_usage._value.get()),
            'memory_usage': float(self.memory_usage._value.get()),
            'model_accuracy': float(self.model_accuracy._value.get())
        }
