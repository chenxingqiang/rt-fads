import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { AlertCircle, TrendingUp, DollarSign, Target, AlertTriangle } from 'lucide-react';

// 欺诈趋势数据
const fraudTrendData = [
  { date: '2024-01', total: 12450, fraudulent: 156, amount: 258900 },
  { date: '2024-02', total: 13200, fraudulent: 178, amount: 312400 },
  { date: '2024-03', total: 14100, fraudulent: 195, amount: 342800 },
  { date: '2024-04', total: 13800, fraudulent: 168, amount: 298600 },
  { date: '2024-05', total: 14500, fraudulent: 182, amount: 328900 }
];

// 欺诈类型分布
const fraudTypeData = [
  { name: '账户盗用', value: 35 },
  { name: '虚假交易', value: 25 },
  { name: '洗钱', value: 20 },
  { name: '身份盗窃', value: 15 },
  { name: '其他', value: 5 }
];

// 高风险场景分析
const riskScenarioData = [
  { scenario: '跨境交易', riskScore: 85, incidents: 45 },
  { scenario: '大额转账', riskScore: 78, incidents: 38 },
  { scenario: '频繁小额', riskScore: 72, incidents: 56 },
  { scenario: '新用户交易', riskScore: 68, incidents: 32 },
  { scenario: '异常时段', riskScore: 65, incidents: 28 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const FraudAnalysis = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fraud Analysis</h1>
        <p className="text-gray-600">Detailed fraud detection analysis and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fraud</p>
                <p className="text-2xl font-bold">842</p>
                <p className="text-sm text-red-600">+12% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Detection Rate</p>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-sm text-green-600">+2.3% accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Prevented Loss</p>
                <p className="text-2xl font-bold">¥1.2M</p>
                <p className="text-sm text-green-600">prevented this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">False Positives</p>
                <p className="text-2xl font-bold">1.5%</p>
                <p className="text-sm text-blue-600">-0.3% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Fraud Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fraudTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="fraudulent" name="欺诈数量" stroke="#ef4444" />
                  <Line yAxisId="right" type="monotone" dataKey="amount" name="涉及金额" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fraud Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fraudTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {fraudTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {fraudTypeData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {entry.name}: {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Scenario Analysis */}
      <div className="grid grid-cols-1 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>High Risk Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskScenarioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scenario" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="riskScore" name="风险分数" fill="#3b82f6" />
                  <Bar dataKey="incidents" name="事件数量" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Fraud Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Recent Fraud Cases</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: 'Account Takeover',
                amount: '¥25,800',
                time: '15 minutes ago',
                risk_score: 92,
                status: 'Blocked'
              },
              {
                id: 2,
                type: 'Suspicious Transfer',
                amount: '¥158,400',
                time: '45 minutes ago',
                risk_score: 88,
                status: 'Under Review'
              },
              {
                id: 3,
                type: 'Identity Theft',
                amount: '¥42,600',
                time: '2 hours ago',
                risk_score: 95,
                status: 'Confirmed'
              }
            ].map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <div className="flex items-center space-x-4">
                  <AlertCircle className={`h-5 w-5 ${
                    case_.risk_score > 90 ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium">{case_.type}</p>
                    <p className="text-sm text-gray-500">
                      Amount: {case_.amount} | Risk Score: {case_.risk_score}
                    </p>
                    <p className="text-sm text-gray-500">{case_.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  case_.status === 'Blocked' ? 'bg-red-100 text-red-800' :
                  case_.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {case_.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudAnalysis;