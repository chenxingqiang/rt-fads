import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Play, Code, CircleDot, Clock, ArrowRight } from 'lucide-react';

const ApiTest = () => {
  const [requestBody, setRequestBody] = useState(`{
  "transaction_id": "test_123",
  "amount": 1000.00,
  "timestamp": "2024-03-20T10:30:00Z",
  "source_account": "ACC001",
  "target_account": "ACC002",
  "features": {
    "location": "Shanghai",
    "device_id": "DEV123",
    "transaction_type": "online_payment"
  }
}`);
  
  const [response, setResponse] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [testHistory, setTestHistory] = useState([]);

  const handleTest = async () => {
    const startTime = performance.now();
    // 模拟API调用
    setTimeout(() => {
      const mockResponse = {
        transaction_id: "test_123",
        fraud_probability: 0.15,
        risk_level: "LOW",
        explanation: {
          top_features: [
            { feature: "amount", importance: 0.3 },
            { feature: "location", importance: 0.2 },
            { feature: "device_id", importance: 0.15 }
          ]
        },
        processing_time: 45
      };
      
      const endTime = performance.now();
      setResponse(mockResponse);
      setResponseTime(Math.round(endTime - startTime));
      
      setTestHistory(prev => [{
        timestamp: new Date().toISOString(),
        request: JSON.parse(requestBody),
        response: mockResponse,
        responseTime: Math.round(endTime - startTime)
      }, ...prev].slice(0, 5));
    }, 800);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">API Test Console</h1>
        <p className="text-gray-600">Test and debug fraud detection API endpoints</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>Request</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endpoint
                </label>
                <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                  <span className="text-gray-500">POST</span>
                  <span>/api/v1/predict</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Body
                </label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full h-64 p-3 font-mono text-sm bg-gray-100 rounded"
                />
              </div>

              <button
                onClick={handleTest}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Play className="h-4 w-4" />
                <span>Send Request</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Response Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRight className="h-5 w-5" />
              <span>Response</span>
              {responseTime && (
                <span className="ml-2 text-sm text-gray-500">
                  ({responseTime}ms)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded h-[450px] overflow-auto">
              {response ? JSON.stringify(response, null, 2) : 'No response yet'}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Test History */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Test History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testHistory.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <div className="flex items-center space-x-4">
                  <CircleDot className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">
                        Transaction ID: {test.request.transaction_id}
                      </p>
                      <span className="text-sm text-gray-500">
                        ({test.responseTime}ms)
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(test.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  test.response.risk_level === 'LOW' 
                    ? 'bg-green-100 text-green-800'
                    : test.response.risk_level === 'MEDIUM'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {test.response.risk_level}
                </span>
              </div>
            ))}

            {testHistory.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No test history yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Request Format</h3>
              <pre className="bg-gray-100 p-4 rounded">
{`POST /api/v1/predict
Content-Type: application/json

{
  "transaction_id": string,
  "amount": number,
  "timestamp": string (ISO 8601),
  "source_account": string,
  "target_account": string,
  "features": {
    "location": string,
    "device_id": string,
    "transaction_type": string
  }
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium mb-2">Response Format</h3>
              <pre className="bg-gray-100 p-4 rounded">
{`{
  "transaction_id": string,
  "fraud_probability": number,
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "explanation": {
    "top_features": [
      {
        "feature": string,
        "importance": number
      }
    ]
  },
  "processing_time": number
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiTest;