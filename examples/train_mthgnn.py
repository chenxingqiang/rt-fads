import torch
from rt_fads.models import MTHGNN
from rt_fads.training import MTHGNNTrainer
from rt_fads.data import GraphDataset
from rt_fads.optimization import ModelOptimizer
from rt_fads.interpretability import MTHGNNExplainer


def main():
    # Load configuration
    config = {
        'input_dim': 64,
        'hidden_dim': 128,
        'output_dim': 2,
        'num_heads': 4,
        'num_layers': 3,
        'optimizer': {
            'type': 'adam',
            'learning_rate': 0.001,
            'weight_decay': 0.0001
        }
    }

    # Initialize model
    model = MTHGNN(config)

    # Initialize trainer
    trainer = MTHGNNTrainer(model, config)

    # Load dataset
    dataset = GraphDataset(
        data_path='path/to/data',
        transform=None
    )
    train_loader = DataLoader(dataset, batch_size=32)
    val_loader = DataLoader(dataset, batch_size=32)

    # Train model
    history = trainer.train(
        train_loader,
        val_loader,
        num_epochs=100
    )

    # Optimize model
    optimizer = ModelOptimizer(model)
    optimizer.optimize_memory()
    optimizer.prune_model(amount=0.3)

    # Explain predictions
    explainer = MTHGNNExplainer(model)
    sample_data = next(iter(val_loader))
    explanation = explainer.explain_prediction(
        x=sample_data['features'],
        edge_index=sample_data['edge_index'],
        edge_attr=sample_data['edge_attr'],
        scene_info=sample_data['scene_info'],
        temporal_info=sample_data['temporal_info'],
        target_idx=0
    )

    print(explainer.generate_explanation_summary(explanation))


if __name__ == '__main__':
    main()
