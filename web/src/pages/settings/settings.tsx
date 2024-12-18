'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import {
  Settings as SettingsIcon,
  Lock,
  Bell,
  Link as LinkIcon,
  Database,
  Globe,
  Clock,
  Palette,
  DollarSign,
  Key,
  Users,
  Shield,
  Mail,
  MessageSquare,
  Server,
  HardDrive
} from 'lucide-react'

const SettingsPage = () => {
  const { t } = useLanguage()

  const settingSections = [
    {
      title: t('settings.general'),
      items: [
        { icon: <Globe className="h-5 w-5" />, label: t('settings.general.language') },
        { icon: <Clock className="h-5 w-5" />, label: t('settings.general.timezone') },
        { icon: <Palette className="h-5 w-5" />, label: t('settings.general.theme') },
        { icon: <DollarSign className="h-5 w-5" />, label: t('settings.general.currency') }
      ]
    },
    {
      title: t('settings.security'),
      items: [
        { icon: <Key className="h-5 w-5" />, label: t('settings.security.password') },
        { icon: <Users className="h-5 w-5" />, label: t('settings.security.session') },
        { icon: <Shield className="h-5 w-5" />, label: t('settings.security.2fa') },
        { icon: <Lock className="h-5 w-5" />, label: t('settings.security.audit') }
      ]
    },
    {
      title: t('settings.notification'),
      items: [
        { icon: <Mail className="h-5 w-5" />, label: t('settings.notification.email') },
        { icon: <MessageSquare className="h-5 w-5" />, label: t('settings.notification.sms') },
        { icon: <Bell className="h-5 w-5" />, label: t('settings.notification.webhook') }
      ]
    },
    {
      title: t('settings.integration'),
      items: [
        { icon: <Server className="h-5 w-5" />, label: t('settings.integration.api') },
        { icon: <LinkIcon className="h-5 w-5" />, label: t('settings.integration.webhook') },
        { icon: <Users className="h-5 w-5" />, label: t('settings.integration.sso') }
      ]
    },
    {
      title: t('settings.backup'),
      items: [
        { icon: <Database className="h-5 w-5" />, label: t('settings.backup.auto') },
        { icon: <HardDrive className="h-5 w-5" />, label: t('settings.backup.storage') }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SettingsPage 