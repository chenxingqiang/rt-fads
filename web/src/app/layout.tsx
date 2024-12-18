import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MainLayout from '@/components/layout/MainLayout'
import { LanguageProvider } from '@/contexts/language-context'
import dynamic from 'next/dynamic'

const ClientLayout = dynamic<{ children: React.ReactNode }>(() => import('@/components/layout/ClientLayout').then(mod => mod.default), {
  ssr: false
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RT-FADS - Real-Time Financial Anti-fraud Detection System',
  description: 'Real-Time Financial Anti-fraud Detection System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        <LanguageProvider>
          <ClientLayout>
            <MainLayout>{children}</MainLayout>
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
