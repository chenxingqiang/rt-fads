from typing import Dict, List, Optional
from ..utils.logger import setup_logger
import json
import requests
from typing import Dict, Any
from rt_fads.utils.logger import setup_logger

logger = setup_logger()


class AlertManager:
    """Alert management system"""

    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.webhook_url = config.get('webhook_url')
        self.alert_thresholds = config.get('alert_thresholds', {})

    async def check_metrics(self, metrics: Dict[str, float]):
        """Check metrics against thresholds"""
        alerts = []

        for metric_name, value in metrics.items():
            if metric_name in self.alert_thresholds:
                threshold = self.alert_thresholds[metric_name]
                if value > threshold:
                    alert = self._create_alert(metric_name, value, threshold)
                    alerts.append(alert)

        if alerts:
            await self._send_alerts(alerts)

    def _create_alert(self, metric_name: str, value: float, threshold: float):
        return {
            'metric': metric_name,
            'value': value,
            'threshold': threshold,
            'severity': self._determine_severity(value, threshold)
        }

    def _determine_severity(self, value: float, threshold: float):
        ratio = value / threshold
        if ratio > 2.0:
            return 'critical'
        elif ratio > 1.5:
            return 'high'
        else:
            return 'warning'

    async def _send_alerts(self, alerts: list):
        """Send alerts to configured channels"""
        if self.webhook_url:
            try:
                response = requests.post(
                    self.webhook_url,
                    json={'alerts': alerts}
                )
                response.raise_for_status()
            except Exception as e:
                logger.error(f"Failed to send alerts: {str(e)}")


logger = setup_logger(__name__)


class AlertManager:
    """Alert management system"""

    def __init__(self, config: Dict):
        self.config = config
        self.alert_thresholds = config.get('alert_thresholds', {})
        self.alert_channels = config.get('alert_channels', [])

    def check_metrics(
        self,
        metrics: Dict[str, float]
    ) -> List[Dict]:
        """Check metrics against thresholds and generate alerts"""
        alerts = []

        # Check each metric against its threshold
        for metric_name, value in metrics.items():
            if metric_name in self.alert_thresholds:
                threshold = self.alert_thresholds[metric_name]
                if self._should_alert(metric_name, value, threshold):
                    alert = self._create_alert(metric_name, value, threshold)
                    alerts.append(alert)
                    self._send_alert(alert)

        return alerts

    def _should_alert(
        self,
        metric_name: str,
        value: float,
        threshold: Dict
    ) -> bool:
        """Determine if metric should trigger alert"""
        if 'min' in threshold and value < threshold['min']:
            return True
        if 'max' in threshold and value > threshold['max']:
            return True
        return False

    def _create_alert(
        self,
        metric_name: str,
        value: float,
        threshold: Dict
    ) -> Dict:
        """Create alert payload"""
        severity = self._determine_severity(value, threshold)
        return {
            'metric': metric_name,
            'value': value,
            'threshold': threshold,
            'severity': severity,
            'message': f"Alert: {metric_name} = {value} exceeded threshold"
        }

    def _determine_severity(
        self,
        value: float,
        threshold: Dict
    ) -> str:
        """Determine alert severity"""
        if 'critical_threshold' in threshold:
            if value > threshold['critical_threshold']:
                return 'critical'
        if 'warning_threshold' in threshold:
            if value > threshold['warning_threshold']:
                return 'warning'
        return 'info'

    def _send_alert(self, alert: Dict):
        """Send alert through configured channels"""
        for channel in self.alert_channels:
            try:
                if channel['type'] == 'slack':
                    self._send_slack_alert(alert, channel['webhook_url'])
                elif channel['type'] == 'email':
                    self._send_email_alert(alert, channel['config'])
                elif channel['type'] == 'http':
                    self._send_http_alert(alert, channel['url'])
            except Exception as e:
                logger.error(f"Failed to send alert through {
                             channel['type']}: {str(e)}")

    def _send_slack_alert(
        self,
        alert: Dict,
        webhook_url: str
    ):
        """Send alert to Slack"""
        payload = {
            'text': alert['message'],
            'attachments': [{
                'color': self._get_alert_color(alert['severity']),
                'fields': [
                    {
                        'title': 'Metric',
                        'value': alert['metric'],
                        'short': True
                    },
                    {
                        'title': 'Value',
                        'value': str(alert['value']),
                        'short': True
                    },
                    {
                        'title': 'Severity',
                        'value': alert['severity'],
                        'short': True
                    }
                ]
            }]
        }

        response = requests.post(
            webhook_url,
            json=payload,
            timeout=5
        )
        response.raise_for_status()

    def _get_alert_color(self, severity: str) -> str:
        """Get color for alert severity"""
        return {
            'critical': '#FF0000',
            'warning': '#FFA500',
            'info': '#0000FF'
        }.get(severity, '#808080')
