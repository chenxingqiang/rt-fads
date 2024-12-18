import psutil
import torch
import time
import threading
from typing import Dict, List
from collections import deque
import numpy as np
from prometheus_client import Gauge, Histogram, Counter
from ..utils.logger import setup_logger

logger = setup_logger(__name__)


class PerformanceMonitor:
    """System performance monitoring"""

    def __init__(self, config: Dict):
        self.config = config
        self.metrics_window = config.get('metrics_window', 3600)  # 1 hour
        self.sampling_interval = config.get('sampling_interval', 1)  # 1 second

        # Initialize metrics storage
        self.metrics = {
            'cpu_usage': deque(maxlen=self.metrics_window),
            'memory_usage': deque(maxlen=self.metrics_window),
            'gpu_usage': deque(maxlen=self.metrics_window),
            'inference_time': deque(maxlen=self.metrics_window),
            'requests_per_second': deque(maxlen=self.metrics_window)
        }

        # Prometheus metrics
        self.prometheus_metrics = {
            'cpu_usage': Gauge(
                'rt_fads_cpu_usage_percent',
                'CPU usage percentage'
            ),
            'memory_usage': Gauge(
                'rt_fads_memory_usage_bytes',
                'Memory usage in bytes'
            ),
            'gpu_usage': Gauge(
                'rt_fads_gpu_usage_percent',
                'GPU usage percentage'
            ),
            'inference_time': Histogram(
                'rt_fads_inference_time_seconds',
                'Model inference time in seconds',
                buckets=(0.001, 0.005, 0.01, 0.025,
                         0.05, 0.075, 0.1, 0.25, 0.5)
            ),
            'requests_per_second': Gauge(
                'rt_fads_requests_per_second',
                'Number of requests processed per second'
            )
        }

        # Start monitoring thread
        self._start_monitoring()

    def _start_monitoring(self):
        """Start background monitoring thread"""
        self.should_run = True
        self.monitor_thread = threading.Thread(
            target=self._monitor_loop,
            daemon=True
        )
        self.monitor_thread.start()

    def _monitor_loop(self):
        """Main monitoring loop"""
        while self.should_run:
            try:
                # Collect system metrics
                self._collect_system_metrics()

                # Update Prometheus metrics
                self._update_prometheus_metrics()

                # Check for alerts
                self._check_alerts()

                time.sleep(self.sampling_interval)
            except Exception as e:
                logger.error(f"Error in monitoring loop: {str(e)}")

    def _collect_system_metrics(self):
        """Collect system performance metrics"""
        # CPU usage
        cpu_percent = psutil.cpu_percent(interval=None)
        self.metrics['cpu_usage'].append(cpu_percent)

        # Memory usage
        memory = psutil.Process().memory_info()
        self.metrics['memory_usage'].append(memory.rss)

        # GPU usage if available
        if torch.cuda.is_available():
            try:
                gpu_usage = self._get_gpu_usage()
                self.metrics['gpu_usage'].append(gpu_usage)
            except:
                self.metrics['gpu_usage'].append(0)

    def _get_gpu_usage(self) -> float:
        """Get GPU usage percentage"""
        try:
            import pynvml
            pynvml.nvmlInit()
            handle = pynvml.nvmlDeviceGetHandleByIndex(0)
            info = pynvml.nvmlDeviceGetUtilizationRates(handle)
            return info.gpu
        except:
            return 0.0

    def _update_prometheus_metrics(self):
        """Update Prometheus metrics"""
        # Calculate and update metrics
        for metric_name, values in self.metrics.items():
            if len(values) > 0:
                if metric_name == 'inference_time':
                    # Update histogram
                    for value in values:
                        self.prometheus_metrics[metric_name].observe(value)
                else:
                    # Update gauge with latest value
                    self.prometheus_metrics[metric_name].set(values[-1])

    def _check_alerts(self):
        """Check metrics against alert thresholds"""
        alerts = []

        # CPU usage alert
        if self.metrics['cpu_usage'] and self.metrics['cpu_usage'][-1] > 80:
            alerts.append({
                'metric': 'cpu_usage',
                'value': self.metrics['cpu_usage'][-1],
                'threshold': 80,
                'severity': 'warning'
            })

        # Memory usage alert
        memory_gb = self.metrics['memory_usage'][-1] / (1024**3)
        if memory_gb > 32:  # 32GB threshold
            alerts.append({
                'metric': 'memory_usage',
                'value': memory_gb,
                'threshold': 32,
                'severity': 'critical'
            })

        # Send alerts if any
        if alerts:
            self._send_alerts(alerts)

    def _send_alerts(self, alerts: List[Dict]):
        """Send alerts through configured channels"""
        for alert in alerts:
            logger.warning(f"Performance alert: {alert}")
            # Add alert sending logic here (e.g., Slack, email)

    def get_metrics_summary(self) -> Dict[str, float]:
        """Get summary of current metrics"""
        summary = {}

        for metric_name, values in self.metrics.items():
            if len(values) > 0:
                summary[f"{metric_name}_avg"] = np.mean(values)
                summary[f"{metric_name}_max"] = np.max(values)
                summary[f"{metric_name}_p95"] = np.percentile(values, 95)

        return summary

    def stop(self):
        """Stop monitoring"""
        self.should_run = False
        if self.monitor_thread.is_alive():
            self.monitor_thread.join()
