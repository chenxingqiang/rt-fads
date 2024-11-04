import pytest
import requests
import jwt
import json
from datetime import datetime, timedelta
from typing import Dict
from rt_fads.security import SecurityManager
from rt_fads.api.server import app
from fastapi.testclient import TestClient


class TestSecurity:
    @pytest.fixture
    def security_manager(self):
        """Initialize security manager"""
        config = {
            'secret_key': 'test_secret_key',
            'token_expire_minutes': 30,
            'allowed_origins': ['*'],
            'rate_limit': {
                'requests_per_minute': 60
            }
        }
        return SecurityManager(config)

    @pytest.fixture
    def test_client(self):
        """Initialize test client"""
        return TestClient(app)

    def test_jwt_token(self, security_manager):
        """Test JWT token generation and validation"""
        # Generate token
        user_data = {'user_id': 'test_user', 'role': 'admin'}
        token = security_manager.create_token(user_data)

        # Validate token
        decoded = security_manager.verify_token(token)
        assert decoded['user_id'] == user_data['user_id']
        assert decoded['role'] == user_data['role']

    def test_rate_limiting(self, test_client):
        """Test API rate limiting"""
        # Send multiple requests
        responses = []
        for _ in range(70):  # Exceed rate limit
            response = test_client.post(
                "/predict",
                json={
                    "transaction_id": "test",
                    "features": {}
                }
            )
            responses.append(response.status_code)

        # Check rate limiting
        assert 429 in responses  # Too Many Requests

    def test_input_validation(self, test_client):
        """Test input validation and sanitization"""
        # Test SQL injection attempt
        malicious_input = {
            "transaction_id": "1; DROP TABLE users;",
            "features": {"amount": "' OR '1'='1"}
        }

        response = test_client.post("/predict", json=malicious_input)
        assert response.status_code == 400  # Bad Request

    def test_data_encryption(self, security_manager):
        """Test data encryption/decryption"""
        sensitive_data = "sensitive_information"

        # Encrypt data
        encrypted = security_manager.encrypt_data(
            sensitive_data.encode()
        )

        # Decrypt data
        decrypted = security_manager.decrypt_data(encrypted)
        decrypted_text = decrypted.decode()

        assert decrypted_text == sensitive_data

    @pytest.mark.dependency(depends=["test_jwt_token"])
    def test_unauthorized_access(self, test_client):
        """Test unauthorized access prevention"""
        # Attempt access without token
        response = test_client.get("/secure_endpoint")
        assert response.status_code == 401  # Unauthorized

        # Attempt access with invalid token
        invalid_token = "invalid_token"
        response = test_client.get(
            "/secure_endpoint",
            headers={"Authorization": f"Bearer {invalid_token}"}
        )
        assert response.status_code == 401
