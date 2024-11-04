Detailed API Documentation
========================

REST API Endpoints
----------------

Authentication
^^^^^^^^^^^^^

POST /auth/token
~~~~~~~~~~~~~~~

Obtain authentication token.

Request::

    POST /auth/token
    Content-Type: application/json
    
    {
        "username": string,
        "password": string
    }

Response::

    {
        "access_token": string,
        "token_type": "bearer",
        "expires_in": 3600
    }

Fraud Detection
^^^^^^^^^^^^^

POST /predict
~~~~~~~~~~~

Make fraud prediction.

Request::

    POST /predict
    Authorization: Bearer <token>
    Content-Type: application/json
    
    {
        "transaction_id": string,
        "features": object,
        "scene_info": object,
        "temporal_info": object
    }

Response::

    {
        "transaction_id": string,
        "fraud_probability": float,
        "risk_level": string,
        "explanation": object,
        "processing_time": float
    }

Model Management
^^^^^^^^^^^^^^

GET /model/status
~~~~~~~~~~~~~~~

Get model status and metrics.

Response::

    {
        "model_version": string,
        "last_updated": datetime,
        "performance_metrics": {
            "accuracy": float,
            "precision": float,
            "recall": float,
            "f1_score": float
        }
    }