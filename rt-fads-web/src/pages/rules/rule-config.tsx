import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Settings, Plus, AlertTriangle, Activity, ArrowUpDown, Edit, Trash2, Save } from 'lucide-react';

const initialRules = [
  {
    id: 1,
    name: "大额交易检测",
    description: "监控超过特定金额的交易",
    conditions: [
      { field: "amount", operator: ">", value: 50000 },
      { field: "user_history_days", operator: "<", value: 30 }
    ],
    risk_level: "HIGH",
    priority: 1,
    enabled: true,
    actions: ["FLAG_FOR_REVIEW", "SEND_ALERT"]
  },
  {
    id: 2,
    name: "频繁小额交易",
    description: "检测短时间内的频繁小额交易",
    conditions: [
      { field: "transaction_count_1h", operator: ">", value: 10 },
      { field: "amount", operator: "<", value: 1000 }
    ],
    risk_level: "MEDIUM",
    priority: 2,
    enabled: true,
    actions: ["INCREASE_RISK_SCORE"]
  },
  {
    id: 3,
    name: "异常地理位置",
    description: "检测不同于常用地理位置的交易",
    conditions: [
      { field: "location_risk_score", operator: ">", value: 0.8 }
    ],
    risk_level: "MEDIUM",
    priority: 3,
    enabled: true,
    actions: ["REQUEST_2FA"]
  }
];

const RuleConfig = () => {
  const [rules, setRules] = useState(initialRules);
  const [editingRule, setEditingRule] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleRule = (ruleId) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
  };

  const handleSaveRule = (rule) => {
    setRules(rules.map(r => r.id === rule.id ? rule : r));
    setEditingRule(null);
  };

  const handleDeleteRule = (ruleId) => {
    if (window.confirm('确定要删除这条规则吗？')) {
      setRules(rules.filter(rule => rule.id !== ruleId));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Rule Configuration</h1>
          <p className="text-gray-600">Manage fraud detection rules and policies</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Rule</span>
        </button>
      </div>

      {/* Rule Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Rules</p>
                <p className="text-2xl font-bold">
                  {rules.filter(r => r.enabled).length}/{rules.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk Rules</p>
                <p className="text-2xl font-bold">
                  {rules.filter(r => r.risk_level === 'HIGH').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Rule Triggers</p>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-green-600">Last 24h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <ArrowUpDown className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">96.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detection Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="p-4 font-medium text-gray-600">Rule</th>
                  <th className="p-4 font-medium text-gray-600">Conditions</th>
                  <th className="p-4 font-medium text-gray-600">Risk Level</th>
                  <th className="p-4 font-medium text-gray-600">Priority</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rules.map((rule) => (
                  <tr key={rule.id}>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{rule.name}</p>
                        <p className="text-sm text-gray-500">{rule.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {rule.conditions.map((condition, idx) => (
                          <div key={idx} className="text-sm">
                            {condition.field} {condition.operator} {condition.value}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        rule.risk_level === 'HIGH' ? 'bg-red-100 text-red-800' :
                        rule.risk_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {rule.risk_level}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-600">{rule.priority}</span>
                    </td>
                    <td className="p-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={rule.enabled}
                          onChange={() => handleToggleRule(rule.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditRule(rule)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Rule Changes */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Recent Changes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                action: "Rule Modified",
                rule: "大额交易检测",
                user: "Admin",
                time: "10 minutes ago",
                changes: "Updated threshold value"
              },
              {
                id: 2,
                action: "Rule Enabled",
                rule: "异常地理位置",
                user: "System",
                time: "1 hour ago",
                changes: "Enabled after validation"
              },
              {
                id: 3,
                action: "Rule Created",
                rule: "新用户高风险交易",
                user: "Admin",
                time: "2 hours ago",
                changes: "New rule added"
              }
            ].map((change) => (
              <div key={change.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <div className="flex items-center space-x-4">
                  <Save className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{change.action}</p>
                      <span className="text-sm text-gray-500">- {change.rule}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {change.changes} - by {change.user}
                    </p>
                    <p className="text-sm text-gray-500">{change.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RuleConfig;