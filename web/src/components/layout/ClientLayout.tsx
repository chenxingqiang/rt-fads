'use client'

import React from 'react'

type ClientLayoutProps = {
  children: React.ReactNode
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default ClientLayout 