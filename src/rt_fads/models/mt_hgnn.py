import torch
import torch.nn as nn
from secretflow.ml.nn import SecureModule


class MTHGNN(SecureModule):
    """Multi-scenario Temporal Heterogeneous Graph Neural Network"""

    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.feature_extractor = self._build_feature_extractor(
            input_dim, hidden_dim)
        self.scene_encoder = self._build_scene_encoder(hidden_dim)
        self.temporal_processor = self._build_temporal_processor(hidden_dim)
        self.predictor = self._build_predictor(hidden_dim, output_dim)

    def _build_feature_extractor(self, input_dim, hidden_dim):
        return nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.5)
        )

    def _build_scene_encoder(self, hidden_dim):
        return SceneEncoder(hidden_dim)

    def _build_temporal_processor(self, hidden_dim):
        return TemporalProcessor(hidden_dim)

    def _build_predictor(self, hidden_dim, output_dim):
        return nn.Linear(hidden_dim, output_dim)

    def forward(self, x, scene_info, temporal_info):
        # Extract features
        features = self.feature_extractor(x)

        # Scene-aware processing
        scene_features = self.scene_encoder(features, scene_info)

        # Temporal processing
        temporal_features = self.temporal_processor(
            scene_features, temporal_info)

        # Prediction
        output = self.predictor(temporal_features)
        return output
