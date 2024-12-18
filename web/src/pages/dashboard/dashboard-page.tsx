'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react'

const DashboardPage = () => {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.metrics.processed')}
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">
              +20.1% {t('dashboard.metrics.fromLastHour')}
            </p>
          </CardContent>
        </Card>
        {/* Add other metric cards */}
      </div>

      {/* Add other dashboard components */}
    </div>
  )
}

export default DashboardPage 