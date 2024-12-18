from typing import Dict, List
from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    """
    Prediction request model
    """
    transaction_id: str = Field(
        ...,
        description="Unique identifier for the transaction"
    )
    amount: float = Field(
        ...,
        description="Transaction amount",
        gt=0
    )
    timestamp: str = Field(
        ...,
        description="Transaction timestamp in ISO format"
    )
    source_account: str = Field(
        ...,
        description="Source account identifier"
    )
    target_account: str = Field(
        ...,
        description="Target account identifier"
    )
    features: Dict[str, float] = Field(
        ...,
        description="Additional transaction features"
    )


class PredictionResponse(BaseModel):
    """
    Prediction response model
    """
    transaction_id: str
    fraud_probability: float = Field(
        ...,
        description="Probability of fraud",
        ge=0,
        le=1
    )
    risk_level: str = Field(
        ...,
        description="Risk level (LOW, MEDIUM, HIGH)"
    )
    explanation: List[Dict[str, float]] = Field(
        ...,
        description="Feature importance for explanation"
    )
