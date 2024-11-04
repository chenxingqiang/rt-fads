import time
import asyncio
import aiohttp
import numpy as np
from concurrent.futures import ThreadPoolExecutor


class PerformanceTester:
    """System performance tester"""

    def __init__(self, base_url, concurrency=100):
        self.base_url = base_url
        self.concurrency = concurrency
        self.results = []

    async def run_load_test(self, num_requests=1000):
        """Run load test"""
        start_time = time.time()

        async with aiohttp.ClientSession() as session:
            tasks = []
            for _ in range(num_requests):
                task = asyncio.create_task(
                    self.make_request(session)
                )
                tasks.append(task)

            responses = await asyncio.gather(*tasks)
            self.results.extend(responses)

        end_time = time.time()
        self.analyze_results(end_time - start_time)

    async def make_request(self, session):
        """Make single request"""
        start_time = time.time()

        try:
            async with session.post(
                f"{self.base_url}/predict",
                json=self.generate_test_data()
            ) as response:
                status = response.status
                response_time = time.time() - start_time
                return {
                    'status': status,
                    'response_time': response_time
                }
        except Exception as e:
            return {
                'status': 500,
                'error': str(e),
                'response_time': time.time() - start_time
            }

    def analyze_results(self, total_time):
        """Analyze test results"""
        response_times = [r['response_time'] for r in self.results]

        metrics = {
            'total_requests': len(self.results),
            'successful_requests': sum(1 for r in self.results if r['status'] == 200),
            'failed_requests': sum(1 for r in self.results if r['status'] != 200),
            'avg_response_time': np.mean(response_times),
            'p95_response_time': np.percentile(response_times, 95),
            'p99_response_time': np.percentile(response_times, 99),
            'requests_per_second': len(self.results) / total_time
        }

        return metrics
