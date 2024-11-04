import asyncio
import aiohttp
import time
import numpy as np
from typing import Dict, List
import pandas as pd
from ..utils.logger import setup_logger

logger = setup_logger(__name__)


class LoadTester:
    """Load testing for RT-FADS API"""

    def __init__(self, config: Dict):
        self.config = config
        self.base_url = config['base_url']
        self.results = []

    async def run_load_test(
        self,
        num_requests: int,
        concurrency: int
    ) -> Dict:
        """Run load test with specified parameters"""
        start_time = time.time()

        # Create semaphore for concurrency control
        semaphore = asyncio.Semaphore(concurrency)

        # Create tasks
        tasks = [
            self._make_request(semaphore)
            for _ in range(num_requests)
        ]

        # Run requests
        responses = await asyncio.gather(*tasks)

        # Calculate metrics
        end_time = time.time()
        duration = end_time - start_time

        metrics = self._calculate_metrics(responses, duration)
        self._save_results(metrics)

        return metrics

    async def _make_request(
        self,
        semaphore: asyncio.Semaphore
    ) -> Dict:
        """Make single request with timing"""
        async with semaphore:
            start_time = time.time()

            try:
                async with aiohttp.ClientSession() as session:
                    async with session.post(
                        f"{self.base_url}/predict",
                        json=self._generate_test_data()
                    ) as response:
                        await response.json()
                        status = response.status

            except Exception as e:
                logger.error(f"Request error: {str(e)}")
                status = 500

            end_time = time.time()

            return {
                'duration': end_time - start_time,
                'status': status
            }

    def _generate_test_data(self) -> Dict:
        """Generate test transaction data"""
        return {
            'transaction_id': f"test_{time.time()}",
            'features': {
                'amount': np.random.uniform(10, 1000),
                'merchant_id': np.random.randint(1, 1000),
                'customer_id': np.random.randint(1, 5000)
            },
            'scene_info': {
                'location': np.random.randint(1, 100),
                'device_type': np.random.randint(1, 5)
            },
            'temporal_info': {
                'hour': np.random.randint(0, 24),
                'day_of_week': np.random.randint(0, 7)
            }
        }

    def _calculate_metrics(
        self,
        responses: List[Dict],
        total_duration: float
    ) -> Dict:
        """Calculate performance metrics"""
        durations = [r['duration'] for r in responses]
        statuses = [r['status'] for r in responses]

        metrics = {
            'total_requests': len(responses),
            'total_duration': total_duration,
            'requests_per_second': len(responses) / total_duration,
            'avg_response_time': np.mean(durations),
            'p50_response_time': np.percentile(durations, 50),
            'p95_response_time': np.percentile(durations, 95),
            'p99_response_time': np.percentile(durations, 99),
            'success_rate': sum(s == 200 for s in statuses) / len(statuses) * 100,
            'error_rate': sum(s != 200 for s in statuses) / len(statuses) * 100
        }

        return metrics

    def _save_results(self, metrics: Dict):
        """Save test results"""
        self.results.append({
            'timestamp': time.time(),
            **metrics
        })

    def generate_report(self) -> pd.DataFrame:
        """Generate load test report"""
        df = pd.DataFrame(self.results)

        # Add timestamp as index
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')
        df.set_index('timestamp', inplace=True)

        return df

    def plot_results(self):
        """Plot load test results"""
        import matplotlib.pyplot as plt

        df = self.generate_report()

        fig, axes = plt.subplots(2, 2, figsize=(15, 10))

        # Response time plot
        df[['avg_response_time', 'p95_response_time', 'p99_response_time']].plot(
            ax=axes[0, 0]
        )
        axes[0, 0].set_title('Response Time')
        axes[0, 0].set_ylabel('Seconds')

        # Requests per second
        df['requests_per_second'].plot(ax=axes[0, 1])
        axes[0, 1].set_title('Throughput')
        axes[0, 1].set_ylabel('Requests/s')

        # Success rate
        df['success_rate'].plot(ax=axes[1, 0])
        axes[1, 0].set_title('Success Rate')
        axes[1, 0].set_ylabel('Percentage')

        # Error rate
        df['error_rate'].plot(ax=axes[1, 1])
        axes[1, 1].set_title('Error Rate')
        axes[1, 1].set_ylabel('Percentage')

        plt.tight_layout()
        return fig
