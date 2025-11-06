'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

/**
 * Global error boundary for root layout errors
 * This catches errors in the root layout itself
 * Required for Next.js app directory
 */
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto mb-6 p-4 bg-red-100 rounded-full w-fit">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Critical Error
            </h1>
            
            <p className="text-gray-600 mb-6">
              A critical error occurred. Please refresh the page to continue.
            </p>

            <Button
              onClick={reset}
              className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
