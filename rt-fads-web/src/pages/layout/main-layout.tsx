import React, { useState } from 'react';
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
  MenuSquare,
  LogOut,
  ChevronDown,
  Search,
  Moon,
  Sun
} from 'lucide-react';

const MainLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      title: "仪表盘",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard",
      badge: null
    },
    {
      title: "模型监控",
      icon: <MonitorUp className="h-5 w-5" />,
      path: "/model-monitor",
      badge: null
    },
    {
      title: "系统监控",
      icon: <ActivitySquare className="h-5 w-5" />,
      path: "/system-monitor",
      badge: null
    },
    {
      title: "交易监控",
      icon: <Footprints className="h-5 w-5" />,
      path: "/transaction-monitor",
      badge: "24"
    },
    {
      title: "告警管理",
      icon: <Bell className="h-5 w-5" />,
      path: "/alert-management",
      badge: "8"
    },
    {
      title: "规则配置",
      icon: <Shield className="h-5 w-5" />,
      path: "/rule-config",
      badge: null
    },
    {
      title: "用户管理",
      icon: <Users className="h-5 w-5" />,
      path: "/user-management",
      badge: null
    },
    {
      title: "报告分析",
      icon: <ScrollText className="h-5 w-5" />,
      path: "/reports-analytics",
      badge: null
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {/* Top Navigation */}
      <header className={`fixed top-0 left-0 right-0 h-16 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b shadow-sm z-50`}>
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MenuSquare className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">RT-FADS</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                         dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <img
                  src="/api/placeholder/32/32"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="hidden md:inline-block">管理员</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 bottom-0 w-64 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-r transform transition-transform duration-200 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <nav className="h-full py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="absolute bottom-4 left-0 right-0 px-6">
            <button className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              <LogOut className="h-5 w-5" />
              <span>退出登录</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 md:pl-64 min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}>
        {/* Page Content */}
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className={`md:pl-64 ${
        isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'
      } border-t`}>
        <div className="container mx-auto py-4 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm">
              © 2024 RT-FADS. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="hover:text-blue-600">关于我们</a>
              <a href="#" className="hover:text-blue-600">帮助文档</a>
              <a href="#" className="hover:text-blue-600">联系支持</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// 示例页面内容
const HomePage = () => {
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
};

export default HomePage;