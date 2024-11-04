API Reference
============

REST API
--------

Endpoints
^^^^^^^^

POST /predict
~~~~~~~~~~~~

Predict fraud probability for a transaction.

Request Schema::

    {
        "transaction_id": string,
        "features": {
            "amount": float,
            "merchant_id": int,
            "customer_id": int,
            ...
        },
        "scene_info": {
            "location": int,
            "device_type": int,
            ...
        },
        "temporal_info": {
            "hour": int,
            "day_of_week": int,
            ...
        }
    }

Response Schema::

    {
        "transaction_id": string,
        "fraud_probability": float,
        "risk_level": string,
        "explanation": object,
        "processing_time": float
    }

Python API
---------

Models
^^^^^^

.. autoclass:: rt_fads.models.MTHGNN
   :members:
   :undoc-members:
   :show-inheritance:

Training
^^^^^^^

.. autoclass:: rt_fads.training.MTHGNNTrainer
   :members:
   :undoc-members:
   :show-inheritance: