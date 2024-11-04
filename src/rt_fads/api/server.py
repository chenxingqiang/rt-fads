from ..utils.logger import setup_logger
from ..monitoring import MetricsCollector
from ..models import MTHGNN
import time
import torch
from typing import Dict, List, Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

from rt_fads.models import MTHGNN
from rt_fads.privacy import SecureComputation
from rt_fads.utils.logger import setup_logger

logger = setup_logger()
app = FastAPI(title="RT-FADS API")


class TransactionData(BaseModel):
    """Transaction data model"""
    transaction_id: str
    amount: float
    timestamp: str
    source_account: str
    target_account: str
    scene_type: str
    features: dict


@app.post("/predict")
async def predict_fraud(data: TransactionData):
    try:
        result = await process_transaction(data)
        return {
            "transaction_id": data.transaction_id,
            "fraud_probability": float(result["probability"]),
            "risk_level": result["risk_level"],
            "explanation": result["explanation"]
        }
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


async def process_transaction(data: TransactionData):
    # Secure processing using Secretflow
    pass


logger = setup_logger(__name__)

app = FastAPI(
    title="RT-FADS API",
    description="Real-time Financial Anti-fraud Detection System API",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize global components
model = None
metrics_collector = MetricsCollector()


class PredictionRequest(BaseModel):
    """Prediction request model"""
    transaction_id: str
    features: Dict[str, float]
    scene_info: Dict[str, float]
    temporal_info: Dict[str, float]
    edge_info: Optional[Dict[str, List[float]]] = None


class PredictionResponse(BaseModel):
    """Prediction response model"""
    transaction_id: str
    fraud_probability: float
    risk_level: str
    explanation: Dict[str, float]
    processing_time: float


@app.post("/predict", response_model=PredictionResponse)
async def predict(
    request: PredictionRequest,
    background_tasks: BackgroundTasks
):
    """Make fraud prediction for a transaction"""
    start_time = time.time()

    try:
        # Convert input to tensors
        features = torch.tensor([list(request.features.values())])
        scene_info = torch.tensor([list(request.scene_info.values())])
        temporal_info = torch.tensor([list(request.temporal_info.values())])

        # Make prediction
        with torch.no_grad():
            prediction = model(
                features,
                scene_info=scene_info,
                temporal_info=temporal_info
            )

        # Process prediction
        fraud_prob = torch.sigmoid(prediction).item()
        risk_level = _determine_risk_level(fraud_prob)

        # Generate explanation
        explanation = model.explain_prediction(
            features,
            scene_info,
            temporal_info
        )

        # Calculate processing time
        processing_time = time.time() - start_time

        # Record metrics in background
        background_tasks.add_task(
            metrics_collector.record_prediction,
            start_time,
            fraud_prob > 0.5,
            processing_time
        )

        return PredictionResponse(
            transaction_id=request.transaction_id,
            fraud_probability=fraud_prob,
            risk_level=risk_level,
            explanation=explanation,
            processing_time=processing_time
        )

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/metrics")
async def get_metrics():
    """Get current system metrics"""
    return metrics_collector.get_current_metrics()


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


def _determine_risk_level(probability: float) -> str:
    """Determine risk level based on probability"""
    if probability > 0.8:
        return "HIGH"
    elif probability > 0.5:
        return "MEDIUM"
    return "LOW"

# Model initialization

def init_model(model_path: str):
    """Initialize model from checkpoint"""
    global model
    model = MTHGNN.load_from_checkpoint(model_path)
    model.eval()
    logger.info("Model initialized successfully")
