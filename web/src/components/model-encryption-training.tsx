'use client'

import React from 'react'
import { MermaidDiagram } from './mermaid-diagram'
import { useLanguage } from '@/contexts/language-context'

type Labels = {
  en: {
    title: string
    data: string
    preprocess: string
    encrypt: string
    train: string
    eval: string
    deploy: string
    dataClean: string
    dataNorm: string
    dataAug: string
    homoEnc: string
    secureAgg: string
    federated: string
    metrics: string
    validate: string
    monitor: string
    privacy: string
    security: string
    backup: string
    distribute: string
    dataCheck: string
    dataFilter: string
    dataBalance: string
    dataLabel: string
    dataEncode: string
    dataEncrypt: string
    modelInit: string
    modelTrain: string
    modelOpt: string
    modelEval: string
    modelTest: string
    modelDeploy: string
  }
  zh: {
    title: string
    data: string
    preprocess: string
    encrypt: string
    train: string
    eval: string
    deploy: string
    dataClean: string
    dataNorm: string
    dataAug: string
    homoEnc: string
    secureAgg: string
    federated: string
    metrics: string
    validate: string
    monitor: string
    privacy: string
    security: string
    backup: string
    distribute: string
    dataCheck: string
    dataFilter: string
    dataBalance: string
    dataLabel: string
    dataEncode: string
    dataEncrypt: string
    modelInit: string
    modelTrain: string
    modelOpt: string
    modelEval: string
    modelTest: string
    modelDeploy: string
  }
}

const ModelEncryptionTraining: React.FC = () => {
  const { language } = useLanguage()

  const labels: Labels = {
    en: {
      title: 'Model Encryption Training Process',
      data: 'Training Data',
      preprocess: 'Data Preprocessing',
      encrypt: 'Encryption',
      train: 'Training',
      eval: 'Evaluation',
      deploy: 'Deployment',
      dataClean: 'Data Cleaning',
      dataNorm: 'Data Normalization',
      dataAug: 'Data Augmentation',
      homoEnc: 'Homomorphic Encryption',
      secureAgg: 'Secure Aggregation',
      federated: 'Federated Learning',
      metrics: 'Performance Metrics',
      validate: 'Model Validation',
      monitor: 'Training Monitor',
      privacy: 'Privacy Check',
      security: 'Security Check',
      backup: 'Model Backup',
      distribute: 'Model Distribution',
      dataCheck: 'Data Quality Check',
      dataFilter: 'Data Filtering',
      dataBalance: 'Data Balancing',
      dataLabel: 'Data Labeling',
      dataEncode: 'Data Encoding',
      dataEncrypt: 'Data Encryption',
      modelInit: 'Model Initialization',
      modelTrain: 'Model Training',
      modelOpt: 'Model Optimization',
      modelEval: 'Model Evaluation',
      modelTest: 'Model Testing',
      modelDeploy: 'Model Deployment'
    },
    zh: {
      title: '模型加密训练流程',
      data: '训练数据',
      preprocess: '数据预处理',
      encrypt: '加密处理',
      train: '训练过程',
      eval: '评估验证',
      deploy: '部署分发',
      dataClean: '数据清洗',
      dataNorm: '数据标准化',
      dataAug: '数据增强',
      homoEnc: '同态加密',
      secureAgg: '安全聚合',
      federated: '联邦学习',
      metrics: '性能指标',
      validate: '模型验证',
      monitor: '训练监控',
      privacy: '隐私检查',
      security: '安全检查',
      backup: '模型备份',
      distribute: '模型分发',
      dataCheck: '数据质量检查',
      dataFilter: '数据过滤',
      dataBalance: '数据平衡',
      dataLabel: '数据标注',
      dataEncode: '数据编码',
      dataEncrypt: '数据加密',
      modelInit: '模型初始化',
      modelTrain: '模型训练',
      modelOpt: '模型优化',
      modelEval: '模型评估',
      modelTest: '模型测试',
      modelDeploy: '模型部署'
    }
  } as const

  const l = labels[language as keyof typeof labels]

  const diagram = `
    graph TB
      %% 数据预处理阶段
      subgraph ${l.preprocess}
        Data[${l.data}] --> Check[${l.dataCheck}]
        Check --> Filter[${l.dataFilter}]
        Filter --> Balance[${l.dataBalance}]
        Balance --> Label[${l.dataLabel}]
        Label --> Clean[${l.dataClean}]
        Clean --> Norm[${l.dataNorm}]
        Clean --> Aug[${l.dataAug}]
        Norm --> Encode[${l.dataEncode}]
        Aug --> Encode
      end

      %% 加密处理阶段
      subgraph ${l.encrypt}
        Encode --> |SHA3-256| Hash[数据哈希]
        Encode --> |AES-GCM| DataEnc[${l.dataEncrypt}]
        DataEnc --> |CKKS| HomoEnc[${l.homoEnc}]
        DataEnc --> |SMPC| SecureAgg[${l.secureAgg}]
        HomoEnc --> |ZKP| Fed[${l.federated}]
        SecureAgg --> |MPC| Fed
      end

      %% 训练过程阶段
      subgraph ${l.train}
        Fed --> Init[${l.modelInit}]
        Init --> |加密梯度| Train[${l.modelTrain}]
        Train --> |差分隐私| Opt[${l.modelOpt}]
        Train --> Monitor[${l.monitor}]
        Monitor --> |ε-DP| Privacy[${l.privacy}]
        Monitor --> |边界检查| Security[${l.security}]
      end

      %% 评估验证阶段
      subgraph ${l.eval}
        Opt --> ModelEval[${l.modelEval}]
        Privacy --> ModelEval
        Security --> ModelEval
        ModelEval --> |性能指标| Metrics[${l.metrics}]
        ModelEval --> |安全指标| Test[${l.modelTest}]
        Metrics --> |加密验证| Validate[${l.validate}]
        Test --> Validate
      end

      %% 部署分发阶段
      subgraph ${l.deploy}
        Validate --> |版本管理| Backup[${l.backup}]
        Backup --> |容器化| Deploy[${l.modelDeploy}]
        Deploy --> |安全传输| Distribute[${l.distribute}]
      end

      %% 样式定义
      classDef preprocess fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
      classDef encrypt fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
      classDef train fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
      classDef eval fill:#fff3e0,stroke:#e65100,stroke-width:2px
      classDef deploy fill:#fce4ec,stroke:#880e4f,stroke-width:2px

      %% 应用样式
      class Data,Check,Filter,Balance,Label,Clean,Norm,Aug,Encode preprocess
      class Hash,DataEnc,HomoEnc,SecureAgg,Fed encrypt
      class Init,Train,Opt,Monitor,Privacy,Security train
      class ModelEval,Metrics,Test,Validate eval
      class Backup,Deploy,Distribute deploy
  `

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">{l.title}</h2>
      <MermaidDiagram 
        definition={diagram}
        className="bg-white rounded-lg shadow-lg p-6"
      />
    </div>
  )
}

export default ModelEncryptionTraining 