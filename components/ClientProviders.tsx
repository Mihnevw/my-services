"use client"

import React, { ReactNode, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18n'
import { usePathname } from 'next/navigation'
import analytics from '../lib/analytics'

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [ready, setReady] = useState(false)
  const path = usePathname()

  useEffect(() => {
    let iteration = 0
    const maxIterations = 20
    const interval = setInterval(() => {
      iteration++
      console.log(`Keeping component from rendering if no languages or namespaces are loaded. Iteration: ${iteration}`)
      if (i18n.isInitialized || iteration >= maxIterations) {
        if (!i18n.isInitialized) {
          console.warn('i18n did not initialize in time, proceeding anyway')
        }
        setReady(true)
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    analytics.initialize()
    analytics.trackPageView(path)
  }, [path])

  if (!ready) return null

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
} 