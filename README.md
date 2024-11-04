# RT-FADS: Real-time Financial Anti-fraud Detection System

A secure, real-time financial anti-fraud detection system based on Secretflow ecosystem.

## Features

- Multi-scenario Temporal HGNN model
- Privacy-preserving computation
- Real-time detection
- Secure multi-party computation

## Installation

```bash
pip install -r requirements.txt
```

## Quick Start

```python
from rt_fads.models import MTHGNN
from rt_fads.privacy import SecureComputation

# Initialize model
model = MTHGNN(input_dim=128, hidden_dim=256, output_dim=2)

# Setup secure computation
secure_comp = SecureComputation()

# Train model
secure_comp.secure_model_training(features, labels)
```

##

## License

MIT

## Author

Chen Xingqiang (<chen.xingqiang@iechor.com>)



