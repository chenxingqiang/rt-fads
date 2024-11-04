import pytest
import pandas as pd
import numpy as np
from rt_fads.data import FeatureProcessor, GraphBuilder


class TestDataProcessing:
    def test_feature_processing(self):
        """Test feature processing pipeline"""
        # Create sample data
        data = pd.DataFrame({
            'amount': np.random.randn(100),
            'time': pd.date_range(start='2024-01-01', periods=100),
            'category': np.random.choice(['A', 'B', 'C'], 100)
        })

        # Process features
        processor = FeatureProcessor({
            'numerical_features': ['amount'],
            'categorical_features': ['category'],
            'timestamp_col': 'time'
        })

        features, meta = processor.fit_transform(data)

        # Verify output
        assert isinstance(features, torch.Tensor)
        assert features.shape[1] == len(meta['feature_names'])
        assert not torch.isnan(features).any()

    def test_graph_building(self):
        """Test graph construction"""
        # Create sample data
        data = pd.DataFrame({
            'source': np.random.randint(0, 10, 100),
            'target': np.random.randint(0, 10, 100),
            'amount': np.random.randn(100)
        })

        # Build graph
        builder = GraphBuilder({
            'source_col': 'source',
            'target_col': 'target',
            'amount_col': 'amount'
        })

        edge_index, edge_attr = builder.build_graph(data)

        # Verify graph structure
        assert isinstance(edge_index, torch.Tensor)
        assert isinstance(edge_attr, torch.Tensor)
        assert edge_index.shape[0] == 2
        assert edge_index.shape[1] == edge_attr.shape[0]
