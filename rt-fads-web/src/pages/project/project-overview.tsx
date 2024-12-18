import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Milestone, GitBranch, Users, Clock, CheckCircle, XCircle, AlertCircle, Activity } from 'lucide-react';

// 项目里程碑数据
const milestoneData = [
  { phase: '需求分析', progress: 100, startDate: '2024-01-01', endDate: '2024-01-15', status: 'completed' },
  { phase: '架构设计', progress: 100, startDate: '2024-01-16', endDate: '2024-01-31', status: 'completed' },
  { phase: '核心开发', progress: 85, startDate: '2024-02-01', endDate: '2024-03-15', status: 'in-progress' },
  { phase: '测试集成', progress: 40, startDate: '2024-03-16', endDate: '2024-04-15', status: 'in-progress' },
  { phase: '部署上线', progress: 0, startDate: '2024-04-16', endDate: '2024-04-30', status: 'pending' }
];

// 团队成员分配
const teamAllocation = [
  { role: '模型研发', allocated: 5, required: 6 },
  { role: '后端开发', allocated: 4, required: 4 },
  { role: '前端开发', allocated: 3, required: 3 },
  { role: '测试', allocated: 2, required: 3 },
  { role: '运维', allocated: 2, required: 2 }
];

const ProjectOverview = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Overview</h1>
        <p className="text-gray-600">RT-FADS Project Status & Progress</p>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Milestone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold">65%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <GitBranch className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Code Coverage</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Team Size</p>
                <p className="text-2xl font-bold">16/18</p>
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
                <p className="text-sm font-medium text-gray-600">Time Remaining</p>
                <p className="text-2xl font-bold">45 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Timeline & Resource Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestoneData.map((milestone) => (
                <div key={milestone.phase} className="relative">
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-green-100' :
                      milestone.status === 'in-progress' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : milestone.status === 'in-progress' ? (
                        <Activity className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{milestone.phase}</h3>
                        <span className="text-sm text-gray-500">
                          {milestone.progress}%
                        </span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-gray-300'
                          }`}
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {milestone.startDate} - {milestone.endDate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamAllocation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="allocated" name="已分配" fill="#3b82f6" />
                  <Bar dataKey="required" name="需求" fill="#e5e7eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk & Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Risk & Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: 'High',
                title: '模型性能优化',
                description: '需要进一步优化模型推理性能以满足实时处理需求',
                owner: '张三',
                status: 'In Progress'
              },
              {
                id: 2,
                type: 'Medium',
                title: '测试资源不足',
                description: '当前测试团队人手不足，可能影响测试进度',
                owner: '李四',
                status: 'Open'
              },
              {
                id: 3,
                type: 'Low',
                title: '文档更新',
                description: 'API文档需要更新以反映最新的接口变更',
                owner: '王五',
                status: 'Resolved'
              }
            ].map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    issue.type === 'High' ? 'bg-red-500' :
                    issue.type === 'Medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div>
                    <h3 className="font-medium">{issue.title}</h3>
                    <p className="text-sm text-gray-500">{issue.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Owner: {issue.owner}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  issue.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {issue.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectOverview;