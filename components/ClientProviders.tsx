"use client"

import React, { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import analytics from '../lib/analytics'

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const path = usePathname()

  useEffect(() => {
    analytics.initialize()
    analytics.trackPageView(path)
  }, [path])

  return (
    <>{children}</>
  )
} 