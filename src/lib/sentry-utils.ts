import * as Sentry from '@sentry/nextjs'

/**
 * Safe wrapper for Sentry metrics that handles cases where metrics API is not available
 */
export const sentryMetrics = {
  increment: (name: string, value: number = 1, options?: { tags?: Record<string, string> }) => {
    try {
      if (Sentry.metrics && typeof Sentry.metrics.increment === 'function') {
        Sentry.metrics.increment(name, value, options)
      }
    } catch (error) {
      // Silently fail if metrics not available
      console.debug(`Sentry metric not recorded: ${name}`)
    }
  },

  gauge: (name: string, value: number, options?: { tags?: Record<string, string> }) => {
    try {
      if (Sentry.metrics && typeof Sentry.metrics.gauge === 'function') {
        Sentry.metrics.gauge(name, value, options)
      }
    } catch (error) {
      console.debug(`Sentry gauge not recorded: ${name}`)
    }
  },

  distribution: (name: string, value: number, options?: { tags?: Record<string, string> }) => {
    try {
      if (Sentry.metrics && typeof Sentry.metrics.distribution === 'function') {
        Sentry.metrics.distribution(name, value, options)
      }
    } catch (error) {
      console.debug(`Sentry distribution not recorded: ${name}`)
    }
  }
}
