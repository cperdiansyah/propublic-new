import type { Middleware } from '@reduxjs/toolkit'

// Custom logger middleware for development
export const loggerMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    if (process.env.NODE_ENV === 'development') {
      const result = next(action)
      console.group(`Action: ${action.type}`)
      console.log('Previous State:', store.getState())
      console.log('Action:', action)

      console.log('Next State:', store.getState())
      console.groupEnd()

      return result
    }

    return next(action)
  }

// Performance monitoring middleware
export const performanceMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    const start = performance.now()
    const result = next(action)
    const end = performance.now()

    if (end - start > 10) {
      // Log slow actions (>10ms)
      console.warn(
        `Slow action detected: ${action?.type} took ${end - start}ms`,
      )
    }

    return result
  }
