'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { sentryMetrics } from '@/lib/sentry-utils'

const Desktop = dynamic(
  () => import('@/components/desktop/Desktop').then(mod => mod.Desktop),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-[#0f0c14] flex items-center justify-center">
        <div className="text-[#7553ff] text-xl animate-pulse">Loading SentryOS...</div>
      </div>
    )
  }
)

export default function Home() {
  useEffect(() => {
    // Log page load
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: 'SentryOS Desktop loaded',
      level: 'info'
    })

    // Track page load metric
    sentryMetrics.increment('page.loaded', 1, {
      tags: { page: 'desktop' }
    })

    // Track page load time
    const loadTime = performance.now()
    sentryMetrics.distribution('page.load_time', loadTime, {
      tags: { page: 'desktop' }
    })
  }, [])

  return <Desktop />
}
