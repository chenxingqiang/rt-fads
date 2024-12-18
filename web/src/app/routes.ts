import type { ComponentType } from 'react'
import {
  LayoutDashboard,
  Activity,
  Shield,
  Bell,
  Settings,
  FileText,
  Users,
  LineChart
} from 'lucide-react'

export interface Route {
  path: string
  name: string
  icon: ComponentType<any>
  description?: string
}

export const routes: Route[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    description: 'System overview and key metrics'
  },
  {
    path: '/model',
    name: 'Model Monitor',
    icon: Activity,
    description: 'Monitor model performance and training'
  },
  {
    path: '/system',
    name: 'System Monitor',
    icon: Shield,
    description: 'System monitoring and health'
  },
  {
    path: '/alerts',
    name: 'Alert Management',
    icon: Bell,
    description: 'Alert management and history'
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: LineChart,
    description: 'Analytics and reporting'
  },
  {
    path: '/user',
    name: 'User Management',
    icon: Users,
    description: 'User management'
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: Settings,
    description: 'System settings'
  }
] 