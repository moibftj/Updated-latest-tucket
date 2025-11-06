'use client'

import { useEffect } from 'react'
import { logSupabaseError } from '@/lib/supabase-errors'

/**
 * Client-side error handler component
 * Provides global error handling for uncaught errors
 * Prepares for React 19's onUncaughtError and onCaughtError handlers
 * 
 * This component should be placed in the root layout to catch
 * errors that escape error boundaries and component-level handlers
 */
export default function ClientErrorHandler() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Global unhandled error handler
    const handleError = (event) => {
      console.error('Unhandled error:', event.error)
      
      // Log to error monitoring service
      if (event.error) {
        logSupabaseError(event.error)
      }

      // TODO: Send to error monitoring service (e.g., Sentry)
      // if (window.Sentry) {
      //   window.Sentry.captureException(event.error)
      // }
      
      // Prevent default browser error handling
      // event.preventDefault()
    }

    // Global unhandled promise rejection handler
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      
      // Log to error monitoring service
      if (event.reason) {
        logSupabaseError(event.reason)
      }

      // TODO: Send to error monitoring service
      // if (window.Sentry) {
      //   window.Sentry.captureException(event.reason)
      // }
    }

    // React 19 feature: onUncaughtError
    // This will be available when React 19 is adopted
    // For now, we prepare the structure
    if (typeof window !== 'undefined') {
      // Check if React 19's error handling is available
      if ('onUncaughtError' in window) {
        window.onUncaughtError = (error, errorInfo) => {
          console.error('React uncaught error:', error, errorInfo)
          
          // Log to error monitoring
          logSupabaseError(error)
          
          // Send to monitoring service
          // if (window.Sentry) {
          //   window.Sentry.captureException(error, {
          //     extra: errorInfo,
          //     tags: { error_type: 'react_uncaught' }
          //   })
          // }
        }
      }

      // React 19 feature: onCaughtError
      // Provides additional context for errors caught by error boundaries
      if ('onCaughtError' in window) {
        window.onCaughtError = (error, errorInfo) => {
          console.log('React caught error (error boundary):', error, errorInfo)
          
          // Optional: send boundary-caught errors to monitoring
          // This gives visibility into all errors, even those handled by boundaries
          // if (window.Sentry) {
          //   window.Sentry.captureException(error, {
          //     extra: errorInfo,
          //     tags: { error_type: 'react_caught' },
          //     level: 'info' // Lower severity since it's caught
          //   })
          // }
        }
      }
    }

    // Add standard browser error listeners
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      
      // Clean up React 19 handlers
      if (typeof window !== 'undefined') {
        if ('onUncaughtError' in window) {
          window.onUncaughtError = null
        }
        if ('onCaughtError' in window) {
          window.onCaughtError = null
        }
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}
