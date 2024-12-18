// src/components/layout/main-layout.tsx
import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Shield, 
  Bell, 
  Settings,
  Menu,
  Sun,
  Moon
} from 'lucide-react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { title: "仪表盘", icon: <LayoutDashboard />, path: "/dashboard" },
    { title: "模型监控", icon: <Activity />, path: "/model" },
    { title: "系统监控", icon: <Activity />, path: "/system" },
    { title: "规则配置", icon: <Shield />, path: "/rules" },
    { title: "告警管理", icon: <Bell />, path: "/alerts" },
    { title: "系统设置", icon: <Settings />, path: "/settings" },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">RT-FADS</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <nav className="h-full py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              
                key={item.path}
                href={item.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 ${isSidebarOpen ? 'md:pl-64' : ''} min-h-screen bg-gray-50 dark:bg-gray-900`}>
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;