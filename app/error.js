'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'

/**
 * Root-level error boundary for Next.js app directory
 * Catches both server and client errors uniformly
 * Provides fallback UI with recovery options
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to console and error monitoring service
    console.error('Application error:', error)
    
    // TODO: Send to error monitoring service (e.g., Sentry)
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error)
    // }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto mb-6 p-4 bg-red-100 rounded-full w-fit">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. Don&apos;t worry, this has been logged and we&apos;ll look into it.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-xs font-mono text-gray-800 break-all">
              {error?.message || 'Unknown error'}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          If this problem persists, please contact support.
        </p>
      </div>
    </div>
  )
}
