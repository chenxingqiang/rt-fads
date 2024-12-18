import networkx as nx
import torch
from typing import Dict, List, Tuple
import pandas as pd
import numpy as np


class GraphBuilder:
    """Build transaction graph from data"""

    def __init__(self, config: Dict):
        self.config = config
        self.graph = nx.DiGraph()

    def build_graph(
        self,
        data: pd.DataFrame
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Build directed graph from transaction data
        
        Returns:
            edge_index: Tensor of shape [2, num_edges]
            edge_attr: Tensor of shape [num_edges, edge_feature_dim]
        """
        # Clear existing graph
        self.graph.clear()

        # Add nodes
        for _, row in data.iterrows():
            source = row[self.config['source_col']]
            target = row[self.config['target_col']]

            # Add nodes if they don't exist
            if source not in self.graph:
                self.graph.add_node(
                    source,
                    features=self._get_node_features(row, 'source')
                )
            if target not in self.graph:
                self.graph.add_node(
                    target,
                    features=self._get_node_features(row, 'target')
                )

            # Add edge
            self.graph.add_edge(
                source,
                target,
                features=self._get_edge_features(row)
            )

        # Convert to PyTorch tensors
        edge_index, edge_attr = self._convert_to_tensors()
        return edge_index, edge_attr

    def _get_node_features(
        self,
        row: pd.Series,
        node_type: str
    ) -> np.ndarray:
        """Extract node features"""
        features = []

        # Basic features
        for feat in self.config[f'{node_type}_features']:
            if feat in row:
                features.append(row[feat])

        # Degree features will be added later
        return np.array(features)

    def _get_edge_features(
        self,
        row: pd.Series
    ) -> np.ndarray:
        """Extract edge features"""
        features = []

        # Transaction amount
        features.append(row[self.config['amount_col']])

        # Timestamp
        if self.config['timestamp_col'] in row:
            timestamp = pd.to_datetime(row[self.config['timestamp_col']])
            features.extend([
                timestamp.hour,
                timestamp.day_of_week,
                timestamp.day,
                timestamp.month
            ])

        # Additional edge features
        for feat in self.config['edge_features']:
            if feat in row:
                features.append(row[feat])

        return np.array(features)

    def _convert_to_tensors(self) -> Tuple[torch.Tensor, torch.Tensor]:
        """Convert NetworkX graph to PyTorch tensors"""
        # Get edge indices
        edges = list(self.graph.edges())
        edge_index = torch.tensor(
            [[e[0] for e in edges], [e[1] for e in edges]],
            dtype=torch.long
        )

        # Get edge features
        edge_attr = torch.tensor(
            [self.graph[e[0]][e[1]]['features'] for e in edges],
            dtype=torch.float
        )

        return edge_index, edge_attr

    def compute_graph_features(self) -> Dict[str, np.ndarray]:
        """Compute additional graph features"""
        features = {}

        # Degree centrality
        features['in_degree'] = list(dict(self.graph.in_degree()).values())
        features['out_degree'] = list(dict(self.graph.out_degree()).values())

        # Clustering coefficient
        features['clustering_coef'] = list(
            nx.clustering(self.graph.to_undirected()).values()
        )

        # PageRank
        features['pagerank'] = list(nx.pagerank(self.graph).values())

        return features
