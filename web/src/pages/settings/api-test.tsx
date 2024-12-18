'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { Server, Send, CheckCircle, XCircle } from 'lucide-react'

interface TestResult {
  endpoint: string
  status: 'success' | 'error'
  responseTime: number
  timestamp: string
}

const ApiTestPage = () => {
  const { t } = useLanguage()
  const [testResults, setTestResults] = useState<TestResult[]>([])

  const endpoints = [
    { path: '/api/fraud-detection', label: t('api.endpoints.fraudDetection') },
    { path: '/api/model-training', label: t('api.endpoints.modelTraining') },
    { path: '/api/user-management', label: t('api.endpoints.userManagement') },
    { path: '/api/alerts', label: t('api.endpoints.alerts') },
    { path: '/api/reports', label: t('api.endpoints.reports') }
  ]

  const runTest = async (endpoint: string) => {
    const startTime = Date.now()
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const endTime = Date.now()
      const result: TestResult = {
        endpoint,
        status: Math.random() > 0.2 ? 'success' : 'error',
        responseTime: endTime - startTime,
        timestamp: new Date().toISOString()
      }
      
      setTestResults((prev: TestResult[]) => [result, ...prev].slice(0, 10))
    } catch (error) {
      console.error(`Error testing ${endpoint}:`, error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('settings.integration.api.test')}</h1>
        <button
          onClick={() => endpoints.forEach(e => runTest(e.path))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {t('settings.integration.api.testAll')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.integration.api.endpoints')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {endpoints.map((endpoint) => (
                <button
                  key={endpoint.path}
                  onClick={() => runTest(endpoint.path)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Server className="h-5 w-5" />
                    <span>{endpoint.label}</span>
                  </div>
                  <Send className="h-5 w-5" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.integration.api.results')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result: TestResult, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    {result.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <div className="font-medium">{result.endpoint}</div>
                      <div className="text-sm text-gray-500">
                        {result.responseTime}ms - {new Date(result.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ApiTestPage