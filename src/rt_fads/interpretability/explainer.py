import torch
import numpy as np
from typing import Dict, List, Tuple
from captum.attr import IntegratedGradients
from ..utils.logger import setup_logger

logger = setup_logger(__name__)


class MTHGNNExplainer:
    """Model interpretability component"""

    def __init__(self, model: torch.nn.Module):
        self.model = model
        self.integrated_gradients = IntegratedGradients(self.model)

    def explain_prediction(
        self,
        x: torch.Tensor,
        edge_index: torch.Tensor,
        edge_attr: torch.Tensor,
        scene_info: torch.Tensor,
        temporal_info: torch.Tensor,
        target_idx: int
    ) -> Dict[str, torch.Tensor]:
        """
        Explain model prediction for a specific node
        
        Args:
            x: Node features
            edge_index: Edge indices
            edge_attr: Edge features
            scene_info: Scene information
            temporal_info: Temporal information
            target_idx: Index of target node
            
        Returns:
            Dictionary containing feature importance scores
        """
        # Get attention weights
        attention_weights = self.model.get_attention_weights()

        # Calculate feature attributions
        attributions = self.integrated_gradients.attribute(
            (x, edge_index, edge_attr, scene_info, temporal_info),
            target=target_idx,
            n_steps=50
        )

        # Combine different attribution sources
        explanation = {
            'feature_importance': attributions[0][target_idx],
            'scene_attention': attention_weights['scene'][-1][target_idx],
            'temporal_importance': attributions[4][target_idx],
            'neighbor_importance': self._get_neighbor_importance(
                attributions[1],
                edge_index,
                target_idx
            )
        }

        return explanation

    def _get_neighbor_importance(
        self,
        edge_attributions: torch.Tensor,
        edge_index: torch.Tensor,
        target_idx: int
    ) -> torch.Tensor:
        """Calculate importance scores for neighboring nodes"""
        # Find edges connected to target node
        target_edges = (edge_index[0] == target_idx) | (
            edge_index[1] == target_idx)
        neighbor_attrs = edge_attributions[target_edges]

        return neighbor_attrs

    def generate_explanation_summary(
        self,
        explanation: Dict[str, torch.Tensor]
    ) -> str:
        """Generate human-readable explanation summary"""
        summary = []

        # Feature importance
        top_features = torch.topk(
            explanation['feature_importance'],
            k=5
        )
        summary.append("Top 5 important features:")
        for idx, importance in zip(top_features.indices, top_features.values):
            summary.append(f"- Feature {idx}: {importance:.4f}")

        # Scene attention
        scene_importance = explanation['scene_attention'].mean()
        summary.append(f"\nScene context importance: {scene_importance:.4f}")

        # Temporal importance
        temporal_importance = explanation['temporal_importance'].mean()
        summary.append(f"Temporal context importance: {
                       temporal_importance:.4f}")

        # Neighbor importance
        if len(explanation['neighbor_importance']) > 0:
            avg_neighbor_importance = explanation['neighbor_importance'].mean()
            summary.append(f"Average neighbor importance: {
                           avg_neighbor_importance:.4f}")

        return "\n".join(summary)
