import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { History, Brain, Zap, AlertTriangle } from 'lucide-react';

// 模拟训练历史数据
const trainingHistory = [
  { epoch: 1, accuracy: 0.82, loss: 0.42, valAccuracy: 0.80, valLoss: 0.45 },
  { epoch: 2, accuracy: 0.88, loss: 0.35, valAccuracy: 0.85, valLoss: 0.38 },
  { epoch: 3, accuracy: 0.91, loss: 0.28, valAccuracy: 0.88, valLoss: 0.32 },
  { epoch: 4, accuracy: 0.94, loss: 0.22, valAccuracy: 0.90, valLoss: 0.28 },
  { epoch: 5, accuracy: 0.96, loss: 0.18, valAccuracy: 0.92, valLoss: 0.25 },
  { epoch: 6, accuracy: 0.97, loss: 0.15, valAccuracy: 0.93, valLoss: 0.23 },
  { epoch: 7, accuracy: 0.985, loss: 0.12, valAccuracy: 0.94, valLoss: 0.21 }
];

// 模拟预测分布数据
const predictionData = [
  { name: 'True Negative', value: 8560 },
  { name: 'True Positive', value: 842 },
  { name: 'False Positive', value: 124 },
  { name: 'False Negative', value: 78 }
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const ModelMonitor = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Model Monitoring</h1>
        <p className="text-gray-600">MT-HGNN Model Performance & Statistics</p>
      </div>

      {/* Model Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Model Version</p>
                <p className="text-2xl font-bold">v2.3.1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Inference Time</p>
                <p className="text-2xl font-bold">48ms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <History className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-2xl font-bold">2h ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Drift Score</p>
                <p className="text-2xl font-bold">0.023</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training History & Prediction Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Training History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="accuracy" name="Train Accuracy" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="valAccuracy" name="Val Accuracy" stroke="#10b981" />
                  <Line type="monotone" dataKey="loss" name="Train Loss" stroke="#f59e0b" />
                  <Line type="monotone" dataKey="valLoss" name="Val Loss" stroke="#ef4444" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediction Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={predictionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {predictionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {predictionData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Model Metrics Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                label: "Model Architecture",
                details: [
                  { name: "Type", value: "MT-HGNN" },
                  { name: "Layers", value: "12" },
                  { name: "Parameters", value: "124M" },
                  { name: "Input Dimension", value: "256" }
                ]
              },
              {
                label: "Performance Metrics",
                details: [
                  { name: "Accuracy", value: "98.5%" },
                  { name: "Precision", value: "96.2%" },
                  { name: "Recall", value: "94.8%" },
                  { name: "F1 Score", value: "95.5%" }
                ]
              },
              {
                label: "Resource Usage",
                details: [
                  { name: "GPU Memory", value: "8.4 GB" },
                  { name: "Batch Size", value: "256" },
                  { name: "QPS", value: "1,200" },
                  { name: "Average Load", value: "76%" }
                ]
              }
            ].map((section) => (
              <div key={section.label} className="space-y-4">
                <h3 className="font-semibold text-gray-700">{section.label}</h3>
                <div className="space-y-2">
                  {section.details.map((detail) => (
                    <div key={detail.name} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{detail.name}</span>
                      <span className="text-sm font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelMonitor;