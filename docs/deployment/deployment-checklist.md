# RT-FADS 部署检查清单

## 预部署检查

### 系统要求

- [ ] 检查 Kubernetes 版本 (>= 1.19)
- [ ] 验证 CPU/内存需求
- [ ] 确认 GPU 可用性（如需要）
- [ ] 验证网络带宽

### 配置验证

- [ ] 检查配置文件
- [ ] 验证环境变量
- [ ] 确认密钥和证书
- [ ] 检查存储配置

### 依赖服务

- [ ] 数据库就绪
- [ ] Redis 集群可用
- [ ] Prometheus 监控就绪
- [ ] Secretflow 环境配置完成

## 部署步骤

### 1. 数据库迁移

```bash
# 执行数据库迁移
kubectl apply -f deployment/k8s/jobs/db-migration.yaml
# 验证迁移状态
kubectl logs -f job/db-migration
