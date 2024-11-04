from typing import Dict, Any
import jwt
from datetime import datetime, timedelta
from cryptography.fernet import Fernet


class SecurityConfig:
    """Security configuration management"""

    def __init__(self, config: Dict[str, Any]):
        self.secret_key = config['secret_key']
        self.token_expire_minutes = config.get('token_expire_minutes', 30)
        self.encryption_key = Fernet.generate_key()
        self.cipher_suite = Fernet(self.encryption_key)

    def create_access_token(self, data: dict):
        """Create JWT token"""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=self.token_expire_minutes)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, self.secret_key, algorithm="HS256")

    def verify_token(self, token: str):
        """Verify JWT token"""
        try:
            decoded_token = jwt.decode(
                token,
                self.secret_key,
                algorithms=["HS256"]
            )
            return decoded_token
        except jwt.PyJWTError:
            return None

    def encrypt_data(self, data: bytes):
        """Encrypt sensitive data"""
        return self.cipher_suite.encrypt(data)

    def decrypt_data(self, encrypted_data: bytes):
        """Decrypt sensitive data"""
        return self.cipher_suite.decrypt(encrypted_data)
