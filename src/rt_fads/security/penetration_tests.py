import requests
import asyncio
from typing import Dict, List
import aiohttp
import ssl
from ..utils.logger import setup_logger

logger = setup_logger(__name__)


class SecurityTester:
    """Security testing suite"""

    def __init__(self, base_url: str, config: Dict):
        self.base_url = base_url
        self.config = config

    async def run_security_tests(self) -> Dict[str, List[Dict]]:
        """Run all security tests"""
        vulnerabilities = []

        # Run tests concurrently
        tasks = [
            self.test_sql_injection(),
            self.test_xss_vulnerabilities(),
            self.test_csrf_protection(),
            self.test_ssl_configuration(),
            self.test_authentication(),
            self.test_rate_limiting()
        ]

        results = await asyncio.gather(*tasks)

        # Aggregate results
        for result in results:
            vulnerabilities.extend(result)

        return {
            'vulnerabilities': vulnerabilities,
            'total_issues': len(vulnerabilities),
            'critical_issues': len([v for v in vulnerabilities if v['severity'] == 'critical'])
        }

    async def test_sql_injection(self) -> List[Dict]:
        """Test SQL injection vulnerabilities"""
        vulnerabilities = []

        # SQL injection payloads
        payloads = [
            "' OR '1'='1",
            "1; DROP TABLE users;",
            "1 UNION SELECT * FROM users",
            "' OR 1=1 --"
        ]

        async with aiohttp.ClientSession() as session:
            for payload in payloads:
                try:
                    # Test endpoint with payload
                    data = {
                        "transaction_id": payload,
                        "features": {"amount": payload}
                    }

                    async with session.post(
                        f"{self.base_url}/predict",
                        json=data
                    ) as response:
                        if response.status == 200:
                            vulnerabilities.append({
                                'type': 'sql_injection',
                                'payload': payload,
                                'severity': 'critical',
                                'endpoint': '/predict'
                            })
                except Exception as e:
                    logger.error(f"Error testing SQL injection: {str(e)}")

        return vulnerabilities

    async def test_xss_vulnerabilities(self) -> List[Dict]:
        """Test XSS vulnerabilities"""
        vulnerabilities = []

        # XSS payloads
        payloads = [
            "<script>alert('xss')</script>",
            "<img src='x' onerror='alert(1)'>",
            "javascript:alert(1)"
        ]

        async with aiohttp.ClientSession() as session:
            for payload in payloads:
                try:
                    data = {"input": payload}
                    async with session.post(
                        f"{self.base_url}/api",
                        json=data
                    ) as response:
                        if response.status == 200:
                            content = await response.text()
                            if payload in content:
                                vulnerabilities.append({
                                    'type': 'xss',
                                    'payload': payload,
                                    'severity': 'critical',
                                    'endpoint': '/api'
                                })
                except Exception as e:
                    logger.error(f"Error testing XSS: {str(e)}")

        return vulnerabilities

    async def test_ssl_configuration(self) -> List[Dict]:
        """Test SSL/TLS configuration"""
        vulnerabilities = []

        try:
            # Check SSL version and cipher suites
            context = ssl.create_default_context()

            async with aiohttp.ClientSession() as session:
                async with session.get(self.base_url) as response:
                    # Check SSL/TLS version
                    ssl_version = response.connection.transport.get_extra_info(
                        'ssl_object').version()
                    if 'TLSv1.2' not in ssl_version and 'TLSv1.3' not in ssl_version:
                        vulnerabilities.append({
                            'type': 'weak_ssl',
                            'details': f'Weak SSL version: {ssl_version}',
                            'severity': 'high'
                        })

        except Exception as e:
            logger.error(f"Error testing SSL configuration: {str(e)}")

        return vulnerabilities

    async def test_authentication(self) -> List[Dict]:
        """Test authentication mechanisms"""
        vulnerabilities = []

        try:
            # Test weak passwords
            weak_passwords = ['password', '123456', 'admin']

            async with aiohttp.ClientSession() as session:
                for password in weak_passwords:
                    data = {
                        'username': 'admin',
                        'password': password
                    }

                    async with session.post(
                        f"{self.base_url}/login",
                        json=data
                    ) as response:
                        if response.status == 200:
                            vulnerabilities.append({
                                'type': 'weak_password',
                                'details': f'Weak password accepted: {password}',
                                'severity': 'high'
                            })

        except Exception as e:
            logger.error(f"Error testing authentication: {str(e)}")

        return vulnerabilities
