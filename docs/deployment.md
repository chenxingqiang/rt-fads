# RT-FADS Deployment Guide

## Prerequisites

- Python 3.8+
- Docker & Docker Compose
- NVIDIA GPU (optional)
- 8GB+ RAM
- SSD Storage

## Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/chenxingqiang/rt-fads.git
cd rt-fads
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure environment variables:

```bash
cp .env.example .env
# Edit .env with your settings
```

4. Start the services:

```bash
docker-compose up -d
```

## Configuration

### Secretflow Configuration

Configure the Secretflow environment in `config/secretflow_config.yaml`:

```yaml
secretflow:
  psi_protocol: ECDH
  device_id: alice
  dp_epsilon: 0.1
```

### Model Configuration

Adjust model parameters in `config/model_config.yaml`:

```yaml
model:
  batch_size: 64
  learning_rate: 0.001
  hidden_dim: 256
```

## Monitoring

1. Access Prometheus metrics:
   - URL: <http://localhost:9090>
   - Default metrics: CPU, memory, request rate

2. View Grafana dashboards:
   - URL: <http://localhost:3000>
   - Default credentials: admin/admin

## Troubleshooting

Common issues and solutions:

1. Memory issues: Adjust batch size
2. Slow processing: Check GPU utilization
3. Connection errors: Verify network settings


### 19. 日志配置

**src/rt_fads/utils/logger.py**:
```python
import logging
import sys
from logging.handlers import RotatingFileHandler

def setup_logger(name='rt_fads'):
    """Setup logger with both file and console handlers"""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    # Create handlers
    console_handler = logging.StreamHandler(sys.stdout)
    file_handler = RotatingFileHandler(
        'logs/rt_fads.log',
        maxBytes=10485760,  # 10MB
        backupCount=5
    )

    # Create formatters
    console_formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    file_formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s - %(pathname)s:%(lineno)d'
    )

    # Set formatters
    console_handler.setFormatter(console_formatter)
    file_handler.setFormatter(file_formatter)

    # Add handlers
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger
```

