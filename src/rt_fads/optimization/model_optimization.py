import torch
import torch.nn as nn
from typing import Dict, Optional
import numpy as np
from torch.quantization import quantize_dynamic
from torch.nn.utils import prune


class ModelOptimizer:
    """Model optimization techniques"""

    def __init__(self, model: nn.Module):
        self.model = model

    def quantize_model(
        self,
        dtype: Optional[torch.dtype] = torch.qint8
    ) -> nn.Module:
        """Quantize model to reduce memory usage"""
        return quantize_dynamic(
            self.model,
            {nn.Linear, nn.Conv1d},
            dtype=dtype
        )

    def prune_model(
        self,
        amount: float = 0.3,
        method: str = 'l1_unstructured'
    ):
        """Prune model weights"""
        for name, module in self.model.named_modules():
            if isinstance(module, nn.Linear):
                prune.l1_unstructured(
                    module,
                    name='weight',
                    amount=amount
                )

    def optimize_memory(self):
        """Optimize model memory usage"""
        # Convert model to half precision
        self.model.half()

        # Enable gradient checkpointing
        if hasattr(self.model, 'gradient_checkpointing_enable'):
            self.model.gradient_checkpointing_enable()

    def profile_model(
        self,
        sample_input: Dict[str, torch.Tensor]
    ) -> Dict[str, float]:
        """Profile model performance"""
        with torch.profiler.profile(
            activities=[
                torch.profiler.ProfilerActivity.CPU,
                torch.profiler.ProfilerActivity.CUDA
            ]
        ) as prof:
            # Warmup
            for _ in range(3):
                _ = self.model(**sample_input)

            # Profile
            for _ in range(5):
                _ = self.model(**sample_input)

        profile_results = {
            'cpu_time': prof.key_averages().table(
                sort_by="cpu_time_total"
            ),
            'cuda_time': prof.key_averages().table(
                sort_by="cuda_time_total"
            ),
            'memory_usage': torch.cuda.max_memory_allocated()
        }

        return profile_results

    @staticmethod
    def optimize_training(
        trainer_config: Dict
    ) -> Dict:
        """Optimize training configuration"""
        optimized_config = trainer_config.copy()

        # Adjust batch size based on available memory
        if torch.cuda.is_available():
            gpu_mem = torch.cuda.get_device_properties(0).total_memory
            optimized_config['batch_size'] = min(
                trainer_config['batch_size'],
                int(gpu_mem * 0.3 / (1024 ** 3))  # 30% of GPU memory
            )

        # Optimize learning rate
        optimized_config['learning_rate'] = trainer_config['learning_rate'] * \
            (optimized_config['batch_size'] /
             trainer_config['batch_size']) ** 0.5

        return optimized_config
