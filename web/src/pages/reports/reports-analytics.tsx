import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { FileText, TrendingUp, DollarSign, AlertCircle, Download, Calendar, Filter } from 'lucide-react';

// 趋势数据
const trendData = [
  { date: '2024-01', transactions: 12450, frauds: 156, amount: 258900 },
  { date: '2024-02', transactions: 13200, frauds: 178, amount: 312400 },
  { date: '2024-03', transactions: 14100, frauds: 195, amount: 342800 },
  { date: '2024-04', transactions: 13800, frauds: 168, amount: 298600 },
  { date: '2024-05', transactions: 14500, frauds: 182, amount: 328900 }
];

// 欺诈类型分布
const fraudTypes = [
  { name: '信用卡欺诈', value: 35, amount: 456000 },
  { name: '身份盗窃', value: 25, amount: 325000 },
  { name: '账户接管', value: 20, amount: 260000 },
  { name: '虚假商户', value: 15, amount: 195000 },
  { name: '其他', value: 5, amount: 65000 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const ReportsAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive fraud detection analysis and reports</p>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border rounded hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold">68,050</p>
                <p className="text-sm text-green-600">+12.5% vs last month</p>
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
                <p className="text-sm font-medium text-gray-600">Fraud Cases</p>
                <p className="text-2xl font-bold">879</p>
                <p className="text-sm text-red-600">+5.2% vs last month</p>
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
                <p className="text-sm font-medium text-gray-600">Loss Prevention</p>
                <p className="text-2xl font-bold">¥1.3M</p>
                <p className="text-sm text-green-600">Saved this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Fraud Rate</p>
                <p className="text-2xl font-bold">1.29%</p>
                <p className="text-sm text-blue-600">-0.3% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Fraud Trends</span>
              <div className="flex space-x-2 text-sm">
                {['week', 'month', 'quarter', 'year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded ${
                      timeRange === range 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="frauds" name="欺诈数量" stroke="#ef4444" />
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
                    data={fraudTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {fraudTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {fraudTypes.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <div className="text-sm">
                      <span className="text-gray-600">{entry.name}</span>
                      <span className="text-gray-500 ml-1">({entry.value}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "月度风险分析报告",
                  description: "详细分析本月欺诈案件和风险趋势",
                  date: "2024-03-01",
                  type: "PDF",
                  size: "2.8 MB"
                },
                {
                  title: "高风险商户报告",
                  description: "识别和分析高风险商户行为",
                  date: "2024-03-15",
                  type: "Excel",
                  size: "1.5 MB"
                },
                {
                  title: "规则效果评估",
                  description: "评估当前欺诈检测规则的效果",
                  date: "2024-03-20",
                  type: "PDF",
                  size: "3.2 MB"
                }
              ].map((report) => (
                <div key={report.title} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium mb-1">{report.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{report.date}</span>
                        </span>
                        <span>{report.type}</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                    <button 
                      className="p-2 text-blue-600 hover:text-blue-800"
                      aria-label="Download report"
                      title="Download report"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "高风险时段分析",
                  insight: "凌晨2-4点的欺诈率显著高于其他时段，建议加强监控",
                  trend: "上升",
                  impact: "高"
                },
                {
                  title: "地域风险分布",
                  insight: "境外交易欺诈率是境内的3.5倍，主要集中在东南亚地区",
                  trend: "稳定",
                  impact: "中"
                },
                {
                  title: "设备指纹分析",
                  insight: "45%的欺诈案件来自多账户共用设备",
                  trend: "下降",
                  impact: "高"
                },
                {
                  title: "行为模式分析",
                  insight: "连续小额交易后的大额交易风险显著增加",
                  trend: "上升",
                  impact: "中"
                }
              ].map((insight) => (
                <div key={insight.title} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{insight.insight}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded-full ${
                      insight.trend === '上升' ? 'bg-red-100 text-red-800' :
                      insight.trend === '下降' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      趋势: {insight.trend}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      insight.impact === '高' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      影响: {insight.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsAnalytics;