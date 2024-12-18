'use client'

import React from 'react'
import { MermaidDiagram } from './mermaid-diagram'
import { useLanguage } from '@/contexts/language-context'

const ModelEncryptionDiagram: React.FC = () => {
  const { language } = useLanguage()

  const labels = {
    en: {
      title: 'Model Encryption Process',
      rawModel: 'Raw Model',
      preprocess: 'Preprocessing',
      encrypt: 'Encryption',
      verify: 'Verification',
      deploy: 'Deployment',
      store: 'Storage',
      key: 'Key Management',
      params: 'Parameters',
      weights: 'Weights',
      structure: 'Structure',
      validate: 'Validation',
      backup: 'Backup',
      monitor: 'Monitoring',
      auth: 'Authentication',
      access: 'Access Control',
      audit: 'Audit Log',
      integrity: 'Integrity Check',
      version: 'Version Control',
      recovery: 'Disaster Recovery',
      keyGen: 'Key Generation',
      keyDist: 'Key Distribution',
      keyRotate: 'Key Rotation',
      compress: 'Compression',
      decouple: 'Decoupling',
      hash: 'Hash Check'
    },
    zh: {
      title: '模型加密流程',
      rawModel: '原始模型',
      preprocess: '预处理阶段',
      encrypt: '加密阶段',
      verify: '验证阶段',
      deploy: '部署阶段',
      store: '安全存储',
      key: '密钥管理',
      params: '参数处理',
      weights: '权重处理',
      structure: '结构处理',
      validate: '有效性验证',
      backup: '备份保护',
      monitor: '监控审计',
      auth: '身份认证',
      access: '访问控制',
      audit: '审计日志',
      integrity: '完整性校验',
      version: '版本管理',
      recovery: '灾难恢复',
      keyGen: '密钥生成',
      keyDist: '密钥分发',
      keyRotate: '密钥轮换',
      compress: '压缩处理',
      decouple: '解耦分离',
      hash: '哈希校验'
    }
  } as const

  const l = labels[language as keyof typeof labels]

  const diagram = `
    graph TB
      %% 预处理阶段
      subgraph ${l.preprocess}
        Raw[${l.rawModel}] --> Auth[${l.auth}]
        Raw --> Compress[${l.compress}]
        Raw --> Decouple[${l.decouple}]
        Decouple --> Params[${l.params}]
        Decouple --> Weights[${l.weights}]
        Decouple --> Structure[${l.structure}]
        Auth --> Version[${l.version}]
      end

      %% 密钥管理
      subgraph ${l.key}
        KeyGen[${l.keyGen}]
        KeyDist[${l.keyDist}]
        KeyRotate[${l.keyRotate}]
        KeyGen --> KeyDist
        KeyDist --> KeyRotate
      end

      %% 加密阶段
      subgraph ${l.encrypt}
        Params --> |SHA-256| Hash[${l.hash}]
        Params --> |AES-256-GCM| EncParams[参数加密]
        Weights --> |Paillier| EncWeights[同态加密]
        Structure --> |ChaCha20| EncStructure[结构混淆]
        Version --> |Ed25519| EncVersion[版本签名]
        
        KeyDist --> EncParams
        KeyDist --> EncWeights
        KeyDist --> EncStructure
        KeyRotate --> EncVersion
      end

      %% 验证阶段
      subgraph ${l.verify}
        EncParams --> |HMAC| Integrity[${l.integrity}]
        EncWeights --> |ZKP| Integrity
        EncStructure --> |Merkle Tree| Integrity
        EncVersion --> |Digital Signature| Integrity
        Hash --> Integrity
        
        Integrity --> Validate[${l.validate}]
      end

      %% 部署阶段
      subgraph ${l.deploy}
        Validate --> Store[${l.store}]
        Store --> |RBAC| Access[${l.access}]
        Access --> |Mirror| Backup[${l.backup}]
        Access --> |Prometheus| Monitor[${l.monitor}]
        Monitor --> |ELK| Audit[${l.audit}]
        Monitor --> |Snapshot| Recovery[${l.recovery}]
      end

      %% 样式定义
      classDef preprocess fill:#ffebe6,stroke:#ff6b6b,stroke-width:2px
      classDef key fill:#fff5e6,stroke:#ffa726,stroke-width:2px
      classDef encrypt fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px
      classDef verify fill:#e8f5e9,stroke:#43a047,stroke-width:2px
      classDef deploy fill:#f3e5f5,stroke:#8e24aa,stroke-width:2px

      %% 应用样式
      class Raw,Auth,Params,Weights,Structure,Version,Compress,Decouple preprocess
      class KeyGen,KeyDist,KeyRotate key
      class EncParams,EncWeights,EncStructure,EncVersion,Hash encrypt
      class Integrity,Validate verify
      class Store,Access,Backup,Monitor,Audit,Recovery deploy
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

export default ModelEncryptionDiagram