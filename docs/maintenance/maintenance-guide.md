# 系统维护手册

## 日常维护

### 1. 日常检查

```bash
# 检查服务状态
kubectl get pods -n fraud-detection
# 检查日志
kubectl logs deployment/rt-fads -n fraud-detection
# 检查监控指标
curl -X GET http://localhost:9090/metrics
