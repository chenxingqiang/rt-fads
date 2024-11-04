from prometheus_client import Counter, Histogram, start_http_server
import time


class MetricsCollector:
    """System metrics collector"""

    def __init__(self):
        self.prediction_counter = Counter(
            'rt_fads_predictions_total',
            'Total number of fraud predictions'
        )
        self.prediction_latency = Histogram(
            'rt_fads_prediction_latency_seconds',
            'Prediction latency in seconds'
        )
        self.fraud_detected = Counter(
            'rt_fads_fraud_detected_total',
            'Total number of detected fraud cases'
        )

    def record_prediction(self, start_time, is_fraud):
        latency = time.time() - start_time
        self.prediction_counter.inc()
        self.prediction_latency.observe(latency)
        if is_fraud:
            self.fraud_detected.inc()
