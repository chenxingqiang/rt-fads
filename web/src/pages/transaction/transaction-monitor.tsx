import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, AlertCircle, Filter, Eye, XCircle, CheckCircle, Clock, ArrowRight, Search } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  time: string;
  source: string;
  target: string;
  risk_score: number;
  status: 'pending' | 'blocked' | 'approved';
  type: string;
  location: string;
  device_id: string;
  risk_factors: string[];
}

// 模拟交易数据
const transactions: Transaction[] = [
  {
    id: "TX24032115",
    amount: 25800.00,
    time: "2024-03-21 15:45:23",
    source: "13812345678",
    target: "98765432100",
    risk_score: 0.85,
    status: "pending",
    type: "online_payment",
    location: "Shanghai",
    device_id: "D789012",
    risk_factors: ["异常时段", "大额交易", "新设备"]
  },
  {
    id: "TX24032114",
    amount: 1580.00,
    time: "2024-03-21 15:42:18",
    source: "13987654321",
    target: "12345678900",
    risk_score: 0.92,
    status: "blocked",
    type: "transfer",
    location: "Overseas",
    device_id: "D789013",
    risk_factors: ["境外交易", "异常IP", "多账户关联"]
  },
  {
    id: "TX24032113",
    amount: 5680.00,
    time: "2024-03-21 15:38:45",
    source: "13666666666",
    target: "45678901234",
    risk_score: 0.75,
    status: "approved",
    type: "qr_payment",
    location: "Beijing",
    device_id: "D789014",
    risk_factors: ["地理位置异常", "设备更换"]
  }
];

const TransactionMonitor = () => {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Transaction Monitor</h1>
            <p className="text-gray-600">Real-time transaction monitoring and review</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-gray-500">Last 24h</p>
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
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-yellow-600">Needs review</p>
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
                <p className="text-sm font-medium text-gray-600">Blocked</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-red-600">High risk</p>
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
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold">2,667</p>
                <p className="text-sm text-green-600">Clean</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                {['all', 'pending', 'blocked', 'approved'].map((status) => (
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

              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedTx(tx)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        tx.status === 'pending' ? 'bg-yellow-500' :
                        tx.status === 'blocked' ? 'bg-red-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{tx.id}</p>
                          <span className={`text-sm px-2 py-0.5 rounded-full ${
                            tx.risk_score > 0.8 ? 'bg-red-100 text-red-800' :
                            tx.risk_score > 0.6 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Risk: {Math.round(tx.risk_score * 100)}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          ¥{tx.amount.toLocaleString()} | {tx.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTx ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Transaction ID</p>
                        <p className="font-medium">{selectedTx.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="font-medium">¥{selectedTx.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="font-medium">{selectedTx.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time</p>
                        <p className="font-medium">{selectedTx.time}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Risk Assessment</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Risk Score</span>
                          <span className="text-sm font-medium">
                            {Math.round(selectedTx.risk_score * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              selectedTx.risk_score > 0.8 ? 'bg-red-500' :
                              selectedTx.risk_score > 0.6 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${selectedTx.risk_score * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Risk Factors</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedTx.risk_factors.map((factor, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-50 text-red-600 rounded text-sm"
                            >
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Action Required</h3>
                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center space-x-2">
                        <XCircle className="h-4 w-4" />
                        <span>Block</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Select a transaction to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionMonitor;