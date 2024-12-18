'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { LanguageProvider } from '@/contexts/language-context';
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
  Sun,
  Folder,
  FileText,
  Cog
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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
      path: "/model",
      badge: null
    },
    {
      title: "系统监控",
      icon: <ActivitySquare className="h-5 w-5" />,
      path: "/system",
      badge: null
    },
    {
      title: "交易监控",
      icon: <Footprints className="h-5 w-5" />,
      path: "/transaction",
      badge: "24"
    },
    {
      title: "告警管理",
      icon: <Bell className="h-5 w-5" />,
      path: "/alerts",
      badge: "8"
    },
    {
      title: "项目管理",
      icon: <Folder className="h-5 w-5" />,
      path: "/project",
      badge: null
    },
    {
      title: "规则配置",
      icon: <Settings className="h-5 w-5" />,
      path: "/rules",
      badge: null
    },
    {
      title: "报告分析",
      icon: <FileText className="h-5 w-5" />,
      path: "/reports",
      badge: null
    },
    {
      title: "用户管理",
      icon: <Users className="h-5 w-5" />,
      path: "/user",
      badge: null
    },
    {
      title: "设置",
      icon: <Cog className="h-5 w-5" />,
      path: "/settings",
      badge: null
    }
  ];

  return (
    <LanguageProvider>
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
                title="Toggle Menu"
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
                title="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <div className="relative">
                <button 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="User Menu"
                >
                  <Image
                    src="/api/placeholder/32/32"
                    alt="User avatar"
                    width={32}
                    height={32}
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
                2024 RT-FADS. All rights reserved.
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
    </LanguageProvider>
  );
};

export default MainLayout; 