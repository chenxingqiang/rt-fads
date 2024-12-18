import React from 'react'
import type { AppProps } from 'next/app'
import { LanguageProvider } from '@/contexts/language-context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  )
}

export default MyApp
