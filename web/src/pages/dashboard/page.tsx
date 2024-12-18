'use client'

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  LayoutDashboard,
  ActivitySquare,
  MonitorUp,
  ScrollText,
  Shield,
  Settings,
  Users,
  Footprints,
  Bell,
} from 'lucide-react';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "仪表盘",
            icon: <LayoutDashboard className="h-12 w-12 text-blue-600" />,
            description: "系统整体运行状态和关键指标监控",
            path: "/dashboard"
          },
          {
            title: "模型监控",
            icon: <MonitorUp className="h-12 w-12 text-green-600" />,
            description: "实时监控模型性能和预测效果",
            path: "/model-monitor"
          },
          {
            title: "交易监控",
            icon: <Footprints className="h-12 w-12 text-purple-600" />,
            description: "实时监控和分析可疑交易",
            path: "/transaction-monitor",
            badge: "24 pending"
          },
          {
            title: "告警管理",
            icon: <Bell className="h-12 w-12 text-red-600" />,
            description: "管理和处理系统产生的各类告警",
            path: "/alert-management",
            badge: "8 new"
          },
          {
            title: "规则配置",
            icon: <Shield className="h-12 w-12 text-yellow-600" />,
            description: "配置和管理欺诈检测规则",
            path: "/rule-config"
          },
          {
            title: "用户管理",
            icon: <Users className="h-12 w-12 text-indigo-600" />,
            description: "管理系统用户和权限配置",
            path: "/user-management"
          },
          {
            title: "系统监控",
            icon: <ActivitySquare className="h-12 w-12 text-cyan-600" />,
            description: "监控系统性能和资源使用情况",
            path: "/system-monitor"
          },
          {
            title: "报告分析",
            icon: <ScrollText className="h-12 w-12 text-pink-600" />,
            description: "生成分析报告和数据统计",
            path: "/reports-analytics"
          },
          {
            title: "系统设置",
            icon: <Settings className="h-12 w-12 text-gray-600" />,
            description: "系统参数和功能配置",
            path: "/settings"
          }
        ].map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {item.description}
                </p>
                {item.badge && (
                  <span className="inline-block px-2 py-1 text-sm rounded-full bg-red-100 text-red-600">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </MainLayout>
  );
} 