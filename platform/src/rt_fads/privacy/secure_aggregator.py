from secretflow.device import PYU, SPU
from secretflow.security.aggregation import SecureAggregator
import numpy as np


class PrivacyPreservingAggregator:
    """Privacy-preserving feature aggregation"""

    def __init__(self, privacy_budget=0.1):
        self.privacy_budget = privacy_budget
        self.secure_agg = SecureAggregator()
        self.spu = SPU('spu')

    def aggregate_features(self, features_list, weights=None):
        """Securely aggregate features from multiple parties"""
        with self.spu.device:
            # Convert to secret shares
            secret_features = [
                self.spu.share(features)
                for features in features_list
            ]

            # Secure aggregation
            if weights is None:
                weights = [1.0/len(features_list)] * len(features_list)

            aggregated = self.secure_agg.aggregate(
                secret_features,
                weights,
                self.privacy_budget
            )

            return aggregated

    def secure_mean(self, values):
        """Compute secure mean with differential privacy"""
        with self.spu.device:
            return self.secure_agg.mean(values, self.privacy_budget)

    def secure_variance(self, values):
        """Compute secure variance with differential privacy"""
        with self.spu.device:
            return self.secure_agg.variance(values, self.privacy_budget)


class SecureModelAggregator:
    """Secure model parameter aggregation"""

    def __init__(self):
        self.secure_agg = SecureAggregator()

    def aggregate_gradients(self, gradients_list, weights=None):
        """Securely aggregate model gradients"""
        with self.spu.device:
            # Convert gradients to secret shares
            secret_grads = [
                self.spu.share(grads)
                for grads in gradients_list
            ]

            # Secure aggregation with noise
            aggregated_grads = self.secure_agg.aggregate(
                secret_grads,
                weights,
                noise_scale=0.1
            )

            return aggregated_grads
