import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CircuitBoard, HardDrive, Activity, Network, Timer, AlertTriangle, Server } from 'lucide-react';

// 模拟系统性能数据
const performanceData = [
  { time: '00:00', cpu: 45, memory: 62, network: 30, latency: 48 },
  { time: '04:00', cpu: 55, memory: 65, network: 45, latency: 52 },
  { time: '08:00', cpu: 75, memory: 70, network: 60, latency: 58 },
  { time: '12:00', cpu: 85, memory: 75, network: 75, latency: 62 },
  { time: '16:00', cpu: 70, memory: 68, network: 55, latency: 54 },
  { time: '20:00', cpu: 50, memory: 63, network: 40, latency: 50 }
];

// 模拟服务健康状态数据
const serviceHealthData = [
  { service: 'API Gateway', uptime: 99.99, status: 'Healthy', responseTime: 45 },
  { service: 'Auth Service', uptime: 99.95, status: 'Healthy', responseTime: 38 },
  { service: 'Model Service', uptime: 99.98, status: 'Healthy', responseTime: 120 },
  { service: 'Database', uptime: 99.99, status: 'Healthy', responseTime: 15 },
  { service: 'Cache Service', uptime: 99.90, status: 'Warning', responseTime: 5 },
  { service: 'Queue Service', uptime: 99.95, status: 'Healthy', responseTime: 8 }
];

const SystemMonitor = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">System Monitoring</h1>
        <p className="text-gray-600">RT-FADS Infrastructure Status & Performance</p>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <CircuitBoard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">CPU Load</p>
                <p className="text-2xl font-bold">75%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <HardDrive className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                <p className="text-2xl font-bold">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Network className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Network I/O</p>
                <p className="text-2xl font-bold">2.4 GB/s</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Timer className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold">99.99%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cpu" name="CPU %" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="memory" name="Memory %" stroke="#10b981" />
                  <Line type="monotone" dataKey="network" name="Network %" stroke="#8b5cf6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Response Times (ms)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceHealthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="responseTime" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Health Status */}
      <Card>
        <CardHeader>
          <CardTitle>Service Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="p-4 font-medium text-gray-600">Service</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Uptime</th>
                  <th className="p-4 font-medium text-gray-600">Response Time</th>
                  <th className="p-4 font-medium text-gray-600">Last Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {serviceHealthData.map((service) => (
                  <tr key={service.service}>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Server className="h-4 w-4 text-gray-400" />
                        <span>{service.service}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        service.status === 'Healthy' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="p-4">{service.uptime}%</td>
                    <td className="p-4">{service.responseTime}ms</td>
                    <td className="p-4 text-gray-500">2 min ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Recent System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  type: 'Warning',
                  message: 'High CPU usage detected on API server',
                  time: '10 minutes ago',
                  status: 'Active'
                },
                {
                  id: 2,
                  type: 'Info',
                  message: 'Cache service auto-scaling triggered',
                  time: '25 minutes ago',
                  status: 'Resolved'
                },
                {
                  id: 3,
                  type: 'Warning',
                  message: 'Elevated memory usage in database cluster',
                  time: '1 hour ago',
                  status: 'Resolved'
                }
              ].map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div className="flex items-center space-x-4">
                    <Activity className={`h-5 w-5 ${
                      alert.type === 'Warning' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    alert.status === 'Active' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {alert.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemMonitor;