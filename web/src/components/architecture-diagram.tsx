'use client'

import React from 'react'
import { MermaidDiagram } from './mermaid-diagram'
import { useLanguage } from '@/contexts/language-context'

type Labels = {
  en: {
    title: string
    ui: string
    auth: string
    monitor: string
    api: string
    ml: string
    db: string
    encrypt: string
    fraud: string
    frontend: string
    backend: string
    security: string
  }
  zh: {
    title: string
    ui: string
    auth: string
    monitor: string
    api: string
    ml: string
    db: string
    encrypt: string
    fraud: string
    frontend: string
    backend: string
    security: string
  }
}

const ArchitectureDiagram: React.FC = () => {
  const { language } = useLanguage()

  const labels: Labels = {
    en: {
      title: 'System Architecture',
      ui: 'User Interface',
      auth: 'Authentication',
      monitor: 'Monitoring',
      api: 'API Service',
      ml: 'ML Engine',
      db: 'Database',
      encrypt: 'Encryption',
      fraud: 'Fraud Detection',
      frontend: 'Frontend',
      backend: 'Backend',
      security: 'Security'
    },
    zh: {
      title: '系统架构图',
      ui: '用户界面',
      auth: '认证模块',
      monitor: '监控面板',
      api: 'API服务',
      ml: '机器学习引擎',
      db: '数据库',
      encrypt: '加密模块',
      fraud: '欺诈检测',
      frontend: '前端层',
      backend: '后端层',
      security: '安全层'
    }
  } as const

  const l = labels[language as keyof typeof labels]

  const diagram = `
    graph TB
      subgraph ${l.frontend}
        UI[${l.ui}]
        Auth[${l.auth}]
        Monitor[${l.monitor}]
      end

      subgraph ${l.backend}
        API[${l.api}]
        ML[${l.ml}]
        DB[(${l.db})]
      end

      subgraph ${l.security}
        Encrypt[${l.encrypt}]
        FraudDetect[${l.fraud}]
      end

      UI --> |请求认证| Auth
      Auth --> |验证身份| API
      API --> |数据分析| ML
      ML --> |存储结果| DB
      API --> |数据加密| Encrypt
      ML --> |风险评估| FraudDetect
      FraudDetect --> |记录风险| DB
      Monitor --> |监控数据| API

      classDef frontend fill:#d0e1f9,stroke:#4a6fa5,stroke-width:2px
      classDef backend fill:#e1f7d5,stroke:#71b55c,stroke-width:2px
      classDef security fill:#ffe6e6,stroke:#ff8080,stroke-width:2px

      class UI,Auth,Monitor frontend
      class API,ML,DB backend
      class Encrypt,FraudDetect security
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

export default ArchitectureDiagram 