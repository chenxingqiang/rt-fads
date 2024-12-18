import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, Bell, Filter, CheckCircle, XCircle, Clock, AlertOctagon, History } from 'lucide-react';

// 模拟告警数据
const alerts = [
  {
    id: "ALT24032101",
    title: "大额交易异常",
    description: "检测到可疑大额交易模式，建议立即审查",
    type: "transaction",
    severity: "high",
    status: "open",
    timestamp: "2024-03-21 15:45:23",
    source: "交易监控系统",
    assignee: "李四",
    related_tx: "TX24032115",
    details: {
      amount: 258000,
      location: "境外",
      risk_score: 0.92
    }
  },
  {
    id: "ALT24032102",
    title: "模型性能下降",
    description: "欺诈检测模型性能出现显著下降",
    type: "model",
    severity: "medium",
    status: "investigating",
    timestamp: "2024-03-21 14:30:15",
    source: "模型监控",
    assignee: "张三",
    details: {
      accuracy_drop: "5.2%",
      false_positives: "增加8.3%"
    }
  },
  {
    id: "ALT24032103",
    title: "系统负载过高",
    description: "API服务器CPU使用率超过阈值",
    type: "system",
    severity: "medium",
    status: "resolved",
    timestamp: "2024-03-21 13:15:42",
    source: "系统监控",
    assignee: "王五",
    details: {
      cpu_usage: "92%",
      memory_usage: "85%"
    }
  }
];

const AlertManagement = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Alert Management</h1>
            <p className="text-gray-600">Monitor and manage system alerts</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded hover:bg-gray-50">
            <Bell className="h-4 w-4" />
            <span>配置告警规则</span>
          </button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Open Alerts</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-red-600">8 high severity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Investigating</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-yellow-600">Under review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-green-600">Last 24h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <History className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold">15m</p>
                <p className="text-sm text-purple-600">Response time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Alert List</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="space-x-2">
                  <span className="text-sm text-gray-500">Status:</span>
                  {['all', 'open', 'investigating', 'resolved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filterStatus === status
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="space-x-2">
                  <span className="text-sm text-gray-500">Severity:</span>
                  {['all', 'high', 'medium', 'low'].map((severity) => (
                    <button
                      key={severity}
                      onClick={() => setFilterSeverity(severity)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filterSeverity === severity
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alert Items */}
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        alert.severity === 'high' ? 'bg-red-100' :
                        alert.severity === 'medium' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <AlertOctagon className={`h-5 w-5 ${
                          alert.severity === 'high' ? 'text-red-600' :
                          alert.severity === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{alert.title}</p>
                          <span className={`text-sm px-2 py-0.5 rounded-full ${
                            alert.status === 'open' ? 'bg-red-100 text-red-800' :
                            alert.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {alert.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {alert.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {alert.timestamp} | {alert.source}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Alert Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAlert ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Alert Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Alert ID</p>
                        <p className="font-medium">{selectedAlert.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="font-medium">{selectedAlert.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Source</p>
                        <p className="font-medium">{selectedAlert.source}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Assignee</p>
                        <p className="font-medium">{selectedAlert.assignee}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Alert Details</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {Object.entries(selectedAlert.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Actions</h3>
                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Investigate</span>
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Resolve</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Select an alert to view details
                </div>
              )}
            </CardContent>
          </Card>

          {/* Alert Timeline */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Alert Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedAlert && [
                  {
                    action: "Alert Created",
                    time: selectedAlert.timestamp,
                    user: "System"
                  },
                  {
                    action: "Assigned to " + selectedAlert.assignee,
                    time: "5 minutes later",
                    user: "Auto-assign"
                  },
                  {
                    action: "Investigation Started",
                    time: "10 minutes later",
                    user: selectedAlert.assignee
                  }
                ].map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{event.action}</p>
                      <p className="text-sm text-gray-500">
                        {event.time} by {event.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlertManagement;