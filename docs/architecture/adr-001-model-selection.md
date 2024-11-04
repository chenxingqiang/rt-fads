# ADR 001: Model Architecture Selection

## Status

Accepted

## Context

需要选择一个适合实时金融欺诈检测的深度学习模型架构。主要考虑因素包括：

- 处理异构图数据的能力
- 实时处理性能
- 可解释性
- 隐私保护需求

## Decision

选择基于图神经网络的MT-HGNN架构，原因如下：

1. 能够有效处理异构图数据
2. 支持动态特征更新
3. 具有场景感知能力
4. 可以集成隐私计算框架

## Consequences

Positive:

- 更好的特征表达能力
- 更高的检测准确率
- 更好的可解释性

Negative:

- 需要更多计算资源
- 训练时间较长
- 需要更复杂的部署架构
