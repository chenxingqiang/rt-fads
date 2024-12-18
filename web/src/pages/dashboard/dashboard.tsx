'use client'

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CircuitBoard, HardDrive, Activity, Network, Timer, AlertTriangle, Server, Database, Cpu, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/contexts/language-context'

const perfData = [
  { time: '00:00', latency: 45, throughput: 980, errorRate: 0.2 },
  { time: '04:00', latency: 48, throughput: 1200, errorRate: 0.3 },
  { time: '08:00', latency: 52, throughput: 1400, errorRate: 0.1 },
  { time: '12:00', latency: 47, throughput: 1100, errorRate: 0.4 },
  { time: '16:00', latency: 51, throughput: 1300, errorRate: 0.2 },
  { time: '20:00', latency: 46, throughput: 1000, errorRate: 0.3 },
];

const Dashboard = () => {
  const { t } = useLanguage()

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('dashboard.title')}</h1>
        <p className="text-gray-600">Real-time Financial Anti-fraud Detection System</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">99.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Cpu className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Latency</p>
                <p className="text-2xl font-bold">48ms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Database className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Processed</p>
                <p className="text-2xl font-bold">1.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Fraud Detected</p>
                <p className="text-2xl font-bold">842</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={perfData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="latency" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="throughput" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className="text-sm font-medium">98.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-blue-600 h-2 rounded" style={{width: '98.5%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Precision</span>
                  <span className="text-sm font-medium">96.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-green-600 h-2 rounded" style={{width: '96.2%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Recall</span>
                  <span className="text-sm font-medium">94.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-purple-600 h-2 rounded" style={{width: '94.8%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                severity: 'High',
                message: 'Suspicious transaction pattern detected',
                time: '5 minutes ago',
                status: 'Investigating'
              },
              {
                id: 2,
                severity: 'Medium',
                message: 'Unusual login location',
                time: '15 minutes ago',
                status: 'Resolved'
              },
              {
                id: 3,
                severity: 'Low',
                message: 'Multiple small transactions detected',
                time: '1 hour ago',
                status: 'Resolved'
              }
            ].map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === 'High' ? 'bg-red-500' :
                    alert.severity === 'Medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-gray-500">{alert.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  alert.status === 'Investigating' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;