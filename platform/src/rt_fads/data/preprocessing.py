import numpy as np
import pandas as pd
import torch
from typing import Dict, List, Tuple
from sklearn.preprocessing import StandardScaler, LabelEncoder
from ..utils.logger import setup_logger

logger = setup_logger(__name__)


class FeatureProcessor:
    """Feature processing and engineering for transaction data"""

    def __init__(self, config: Dict):
        self.config = config
        self.scalers = {}
        self.encoders = {}
        self.feature_names = []

    def fit_transform(
        self,
        data: pd.DataFrame
    ) -> Tuple[torch.Tensor, Dict]:
        """Fit and transform features"""
        # Numerical features
        numerical_features = self._process_numerical_features(
            data,
            fit=True
        )

        # Categorical features
        categorical_features = self._process_categorical_features(
            data,
            fit=True
        )

        # Temporal features
        temporal_features = self._extract_temporal_features(data)

        # Scene features
        scene_features = self._extract_scene_features(data)

        # Graph features
        graph_features = self._extract_graph_features(data)

        # Combine all features
        all_features = np.concatenate([
            numerical_features,
            categorical_features,
            temporal_features,
            scene_features,
            graph_features
        ], axis=1)

        return torch.FloatTensor(all_features), {
            'feature_names': self.feature_names,
            'scalers': self.scalers,
            'encoders': self.encoders
        }

    def transform(
        self,
        data: pd.DataFrame
    ) -> torch.Tensor:
        """Transform features using fitted processors"""
        numerical_features = self._process_numerical_features(
            data,
            fit=False
        )
        categorical_features = self._process_categorical_features(
            data,
            fit=False
        )
        temporal_features = self._extract_temporal_features(data)
        scene_features = self._extract_scene_features(data)
        graph_features = self._extract_graph_features(data)

        all_features = np.concatenate([
            numerical_features,
            categorical_features,
            temporal_features,
            scene_features,
            graph_features
        ], axis=1)

        return torch.FloatTensor(all_features)

    def _process_numerical_features(
        self,
        data: pd.DataFrame,
        fit: bool = False
    ) -> np.ndarray:
        """Process numerical features"""
        numerical_cols = self.config['numerical_features']
        if fit:
            self.scalers['numerical'] = StandardScaler()
            numerical_features = self.scalers['numerical'].fit_transform(
                data[numerical_cols].values
            )
        else:
            numerical_features = self.scalers['numerical'].transform(
                data[numerical_cols].values
            )

        self.feature_names.extend(numerical_cols)
        return numerical_features

    def _process_categorical_features(
        self,
        data: pd.DataFrame,
        fit: bool = False
    ) -> np.ndarray:
        """Process categorical features"""
        categorical_cols = self.config['categorical_features']
        categorical_features = []

        for col in categorical_cols:
            if fit:
                self.encoders[col] = LabelEncoder()
                encoded = self.encoders[col].fit_transform(data[col])
            else:
                encoded = self.encoders[col].transform(data[col])
            categorical_features.append(encoded.reshape(-1, 1))

        self.feature_names.extend(categorical_cols)
        return np.hstack(categorical_features)

    def _extract_temporal_features(
        self,
        data: pd.DataFrame
    ) -> np.ndarray:
        """Extract temporal features"""
        temporal_features = []

        # Convert timestamp to datetime
        timestamps = pd.to_datetime(data[self.config['timestamp_col']])

        # Extract time-based features
        temporal_features.extend([
            timestamps.dt.hour.values.reshape(-1, 1),
            timestamps.dt.day_of_week.values.reshape(-1, 1),
            timestamps.dt.day.values.reshape(-1, 1),
            timestamps.dt.month.values.reshape(-1, 1)
        ])

        # Calculate time differences
        if 'prev_timestamp' in data.columns:
            time_diff = (
                timestamps - pd.to_datetime(data['prev_timestamp'])
            ).dt.total_seconds() / 3600  # Convert to hours
            temporal_features.append(time_diff.values.reshape(-1, 1))

        self.feature_names.extend([
            'hour', 'day_of_week', 'day', 'month', 'time_diff'
        ])

        return np.hstack(temporal_features)

    def _extract_scene_features(
        self,
        data: pd.DataFrame
    ) -> np.ndarray:
        """Extract scene-specific features"""
        scene_features = []
        scene_cols = self.config['scene_features']

        for col in scene_cols:
            if col in data.columns:
                scene_features.append(data[col].values.reshape(-1, 1))

        self.feature_names.extend(scene_cols)
        return np.hstack(scene_features)

    def _extract_graph_features(
        self,
        data: pd.DataFrame
    ) -> np.ndarray:
        """Extract graph-based features"""
        graph_features = []

        # Node degree features
        if 'node_in_degree' in data.columns:
            graph_features.append(data['node_in_degree'].values.reshape(-1, 1))
        if 'node_out_degree' in data.columns:
            graph_features.append(
                data['node_out_degree'].values.reshape(-1, 1))

        # Clustering coefficient
        if 'clustering_coef' in data.columns:
            graph_features.append(
                data['clustering_coef'].values.reshape(-1, 1))

        # PageRank
        if 'pagerank' in data.columns:
            graph_features.append(data['pagerank'].values.reshape(-1, 1))

        self.feature_names.extend([
            'in_degree', 'out_degree', 'clustering_coef', 'pagerank'
        ])

        return np.hstack(graph_features)
