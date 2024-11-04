from abc import ABC, abstractmethod
import torch
import torch.nn as nn


class BaseModel(nn.Module, ABC):
    """Base model class for all models"""

    def __init__(self, config: dict):
        super().__init__()
        self.config = config
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

    @abstractmethod
    def forward(self, *args, **kwargs):
        pass

    def save(self, path: str):
        """Save model state"""
        torch.save({
            'model_state_dict': self.state_dict(),
            'config': self.config
        }, path)

    def load(self, path: str):
        """Load model state"""
        checkpoint = torch.load(path, map_location=self.device)
        self.load_state_dict(checkpoint['model_state_dict'])
