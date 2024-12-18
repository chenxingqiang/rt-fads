'use client'

import React from 'react'
import { Activity, AlertCircle, CircuitBoard, Network, Shield, Settings } from 'lucide-react'
import ArchitectureDiagram from '@/components/architecture-diagram'
import ModelEncryptionDiagram from '@/components/model-encryption-diagram'
import { useLanguage } from '@/contexts/language-context'

const LandingPage = () => {
  const { t, language, setLanguage } = useLanguage()

  const getEncryptionSequence = () => `
  sequenceDiagram
    participant Client
    participant API
    participant Auth
    participant Model
    participant Privacy

    Note over Client,Privacy: ${t('landing.sequence.title')}
    
    Client->>API: ${t('landing.sequence.step1')}
    API->>Auth: ${t('landing.sequence.step2')}
    Auth-->>API: ${t('landing.sequence.step3')}
    
    API->>Privacy: ${t('landing.sequence.step4')}
    Privacy->>Privacy: ${t('landing.sequence.step5')}
    
    Privacy->>Model: ${t('landing.sequence.step6')}
    Model-->>Privacy: ${t('landing.sequence.step7')}
    
    Privacy->>Privacy: ${t('landing.sequence.step8')}
    Privacy-->>API: ${t('landing.sequence.step9')}
    
    API-->>Client: ${t('landing.sequence.step10')}
  `

  const encryptionTranslations = {
    en: {
      'landing.sequence.title': 'Secure Data Flow with Homomorphic Encryption',
      'landing.sequence.step1': 'Send encrypted transaction data',
      'landing.sequence.step2': 'Verify request signature',
      'landing.sequence.step3': 'Return auth token',
      'landing.sequence.step4': 'Forward encrypted data',
      'landing.sequence.step5': 'Apply homomorphic encryption',
      'landing.sequence.step6': 'Send encrypted features',
      'landing.sequence.step7': 'Return encrypted prediction',
      'landing.sequence.step8': 'Decrypt result',
      'landing.sequence.step9': 'Return processed result',
      'landing.sequence.step10': 'Receive detection result'
    },
    zh: {
      'landing.sequence.title': '同态加密安全数据流',
      'landing.sequence.step1': '发送加密交易数据',
      'landing.sequence.step2': '验证请求签名',
      'landing.sequence.step3': '返回认证令牌',
      'landing.sequence.step4': '转发加密数据',
      'landing.sequence.step5': '应用同态加密',
      'landing.sequence.step6': '发送加密特征',
      'landing.sequence.step7': '返回加密预测',
      'landing.sequence.step8': '解密结果',
      'landing.sequence.step9': '返回处理结果',
      'landing.sequence.step10': '接收检测结果'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('landing.hero.title1')}
              <span className="text-blue-500"> {t('landing.hero.highlight')} </span>
              {t('landing.hero.title2')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="px-8 py-3 rounded-md bg-blue-600 hover:bg-blue-700">
                {t('common.getStarted')}
              </button>
              <a 
                href="https://github.com/chenxingqiang/rt-fads.git" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-3 rounded-md border border-gray-700 hover:border-gray-600"
              >
                {t('common.viewGithub')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: t('landing.stats.transactions'), value: "10M+" },
              { label: t('landing.stats.accuracy'), value: "99.8%" },
              { label: t('landing.stats.response'), value: "<100ms" },
              { label: t('landing.stats.saved'), value: "$100M+" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('landing.tech.title')}</h2>
            <p className="text-gray-400">{t('landing.tech.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "MT-HGNN Model",
              "PyTorch Framework",
              "SecretFlow",
              "FastAPI",
              "React",
              "PostgreSQL",
              "Redis",
              "Kubernetes"
            ].map((tech, index) => (
              <div key={index} className="p-4 text-center border border-gray-800 rounded-lg">
                <span className="text-gray-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('arch.title')}</h2>
            <p className="text-gray-400">{t('arch.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend Layer */}
            <div className="p-6 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-500">{t('arch.frontend')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Next.js Framework</li>
                <li>• React Components</li>
                <li>• TailwindCSS Styling</li>
                <li>• Real-time Data Visualization</li>
              </ul>
            </div>

            {/* Backend Layer */}
            <div className="p-6 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-500">{t('arch.backend')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Microservices Architecture</li>
                <li>• FastAPI REST Interface</li>
                <li>• gRPC Communication</li>
                <li>• JWT Authentication</li>
              </ul>
            </div>

            {/* Model Layer */}
            <div className="p-6 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-500">{t('arch.model')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• MT-HGNN Graph Neural Network</li>
                <li>• PyTorch Deep Learning</li>
                <li>• Real-time Feature Updates</li>
                <li>• Model Monitoring</li>
              </ul>
            </div>

            {/* Infrastructure Layer */}
            <div className="p-6 border border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-yellow-500">{t('arch.infra')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Kubernetes Orchestration</li>
                <li>• PostgreSQL Storage</li>
                <li>• Redis Cache System</li>
                <li>• Prometheus Monitoring</li>
              </ul>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="mt-12 p-6 border border-gray-800 rounded-lg">
            <div className="bg-gray-900 rounded-lg p-4">
              <ArchitectureDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Model Training Flow Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {t('model.encryption.title')}
            </h2>
            <p className="text-gray-400">
              {t('model.encryption.subtitle')}
            </p>
          </div>
          
          <div className="p-6 border border-gray-800 rounded-lg">
            <div className="bg-gray-900 rounded-lg p-4">
              <ModelEncryptionDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('landing.cta.title')}</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('landing.cta.subtitle')}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button className="px-8 py-3 rounded-md bg-blue-600 hover:bg-blue-700">
              {t('landing.cta.trial')}
            </button>
            <button className="px-8 py-3 rounded-md border border-gray-700 hover:border-gray-600">
              {t('landing.cta.contact')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-500" />
                <span className="font-bold">RT-FADS</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('landing.footer.description')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage