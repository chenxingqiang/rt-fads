import torch
import numpy as np
from typing import Dict, Tuple
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)


class MetricsCalculator:
    """Calculate various evaluation metrics"""

    @staticmethod
    def calculate_metrics(
        y_true: torch.Tensor,
        y_pred: torch.Tensor,
        threshold: float = 0.5
    ) -> Dict[str, float]:
        """Calculate multiple metrics"""
        # Convert to numpy arrays
        if isinstance(y_true, torch.Tensor):
            y_true = y_true.cpu().numpy()
        if isinstance(y_pred, torch.Tensor):
            y_pred = y_pred.cpu().numpy()

        # Apply threshold for binary classification
        y_pred_binary = (y_pred > threshold).astype(int)

        # Calculate metrics
        metrics = {
            'accuracy': accuracy_score(y_true, y_pred_binary),
            'precision': precision_score(y_true, y_pred_binary),
            'recall': recall_score(y_true, y_pred_binary),
            'f1': f1_score(y_true, y_pred_binary),
            'auc_roc': roc_auc_score(y_true, y_pred)
        }

        return metrics

    @staticmethod
    def calculate_threshold_metrics(
        y_true: np.ndarray,
        y_pred: np.ndarray,
        thresholds: np.ndarray
    ) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
        """Calculate metrics at different thresholds"""
        precisions = []
        recalls = []
        f1_scores = []

        for threshold in thresholds:
            y_pred_binary = (y_pred > threshold).astype(int)
            precisions.append(precision_score(y_true, y_pred_binary))
            recalls.append(recall_score(y_true, y_pred_binary))
            f1_scores.append(f1_score(y_true, y_pred_binary))

        return np.array(precisions), np.array(recalls), np.array(f1_scores)

    @staticmethod
    def find_optimal_threshold(
        y_true: np.ndarray,
        y_pred: np.ndarray,
        metric: str = 'f1'
    ) -> float:
        """Find optimal threshold based on specified metric"""
        thresholds = np.linspace(0, 1, 100)
        precisions, recalls, f1_scores = MetricsCalculator.calculate_threshold_metrics(
            y_true, y_pred, thresholds
        )

        if metric == 'f1':
            optimal_idx = np.argmax(f1_scores)
        elif metric == 'precision':
            optimal_idx = np.argmax(precisions)
        elif metric == 'recall':
            optimal_idx = np.argmax(recalls)
        else:
            raise ValueError(f"Unsupported metric: {metric}")

        return thresholds[optimal_idx]
