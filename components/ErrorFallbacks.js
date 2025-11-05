'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const DashboardErrorFallback = ({ error, reset }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-red-100 rounded-full">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard Error
        </h2>
        
        <p className="text-gray-600 mb-6">
          We couldn&apos;t load your dashboard. This might be a temporary issue.
        </p>

        <Button
          onClick={reset}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reload Dashboard
        </Button>
      </div>
    </div>
  </div>
)

export const ChatPanelErrorFallback = ({ reset }) => (
  <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg border border-red-200">
    <div className="text-center">
      <p className="text-sm text-red-800 mb-3">
        Chat is temporarily unavailable
      </p>
      <Button
        onClick={reset}
        size="sm"
        variant="outline"
        className="text-red-700 border-red-300 hover:bg-red-100"
      >
        <RefreshCw className="w-3 h-3 mr-2" />
        Retry
      </Button>
    </div>
  </div>
)

export const TripsSectionErrorFallback = ({ reset }) => (
  <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
    <div className="text-center max-w-md">
      <div className="mb-4 p-3 bg-red-100 rounded-full w-fit mx-auto">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Failed to Load Trips
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        We encountered an error while loading your trips. Please try again.
      </p>
      <Button
        onClick={reset}
        className="bg-purple-600 hover:bg-purple-700"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Reload Trips
      </Button>
    </div>
  </div>
)
