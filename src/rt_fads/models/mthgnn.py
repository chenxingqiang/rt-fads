import torch
import torch.nn as nn
from typing import Dict, List, Tuple
from .base import BaseModel
from .layers import (
    SceneAttentionLayer,
    TemporalConvLayer,
    GraphAttentionLayer
)


class MTHGNN(BaseModel):
    """Multi-scenario Temporal Heterogeneous Graph Neural Network"""

    def __init__(self, config: Dict):
        super().__init__(config)

        # Model dimensions
        self.input_dim = config['input_dim']
        self.hidden_dim = config['hidden_dim']
        self.output_dim = config['output_dim']
        self.num_heads = config.get('num_heads', 4)
        self.num_layers = config.get('num_layers', 3)

        # Layer initialization
        self.input_proj = nn.Linear(self.input_dim, self.hidden_dim)

        # Scene-aware attention layers
        self.scene_layers = nn.ModuleList([
            SceneAttentionLayer(
                self.hidden_dim,
                self.num_heads
            ) for _ in range(self.num_layers)
        ])

        # Temporal convolution layers
        self.temporal_layers = nn.ModuleList([
            TemporalConvLayer(
                self.hidden_dim,
                self.hidden_dim,
                kernel_size=3,
                dilation=2**i
            ) for i in range(self.num_layers)
        ])

        # Graph attention layers
        self.graph_layers = nn.ModuleList([
            GraphAttentionLayer(
                self.hidden_dim,
                self.hidden_dim,
                self.num_heads
            ) for _ in range(self.num_layers)
        ])

        # Output layers
        self.output_layer = nn.Sequential(
            nn.Linear(self.hidden_dim * 3, self.hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(self.hidden_dim, self.output_dim)
        )

    def forward(
        self,
        x: torch.Tensor,
        edge_index: torch.Tensor,
        edge_attr: torch.Tensor,
        scene_info: torch.Tensor,
        temporal_info: torch.Tensor,
        batch: torch.Tensor = None
    ) -> torch.Tensor:
        """
        Forward pass of MT-HGNN
        
        Args:
            x: Node features [num_nodes, input_dim]
            edge_index: Edge indices [2, num_edges]
            edge_attr: Edge features [num_edges, edge_feat_dim]
            scene_info: Scene information [num_nodes, scene_dim]
            temporal_info: Temporal information [num_nodes, temporal_dim]
            batch: Batch indices for multiple graphs
            
        Returns:
            output: Prediction results [num_nodes, output_dim]
        """
        # Initial projection
        h = self.input_proj(x)

        # Multi-layer processing
        scene_out = h
        temporal_out = h
        graph_out = h

        for i in range(self.num_layers):
            # Scene-aware processing
            scene_out = self.scene_layers[i](
                scene_out,
                scene_info
            )

            # Temporal processing
            temporal_out = self.temporal_layers[i](
                temporal_out
            )

            # Graph structure processing
            graph_out = self.graph_layers[i](
                graph_out,
                edge_index,
                edge_attr
            )

        # Feature fusion
        combined_features = torch.cat([
            scene_out,
            temporal_out,
            graph_out
        ], dim=-1)

        # Output prediction
        output = self.output_layer(combined_features)

        return output

    def get_attention_weights(self) -> Dict[str, torch.Tensor]:
        """Return attention weights for interpretability"""
        attention_weights = {
            'scene': [layer.get_attention_weights() for layer in self.scene_layers],
            'graph': [layer.get_attention_weights() for layer in self.graph_layers]
        }
        return attention_weights

    def loss_function(
        self,
        pred: torch.Tensor,
        target: torch.Tensor,
        mask: torch.Tensor = None
    ) -> torch.Tensor:
        """Calculate loss with optional masking"""
        criterion = nn.BCEWithLogitsLoss(reduction='none')
        loss = criterion(pred, target)

        if mask is not None:
            loss = loss * mask

        return loss.mean()
