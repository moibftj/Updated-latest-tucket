'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ErrorBoundary from '@/components/ErrorBoundary'
import { DashboardErrorFallback, ChatPanelErrorFallback, TripsSectionErrorFallback } from '@/components/ErrorFallbacks'

// Component that throws an error when triggered
const ErrorThrowingComponent = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error: This is a simulated error for testing error boundaries')
  }
  return <div className="p-4 bg-green-100 text-green-800 rounded">No errors - Everything is working fine!</div>
}

// Test different error boundary fallbacks
const ErrorBoundaryTest = () => {
  const [throwDefaultError, setThrowDefaultError] = useState(false)
  const [throwDashboardError, setThrowDashboardError] = useState(false)
  const [throwChatError, setThrowChatError] = useState(false)
  const [throwTripsError, setThrowTripsError] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Error Boundary Test Page</h1>
          <p className="text-gray-600 mb-4">
            Click the buttons below to test different error boundaries and their fallback UIs.
          </p>
        </div>

        {/* Default Error Boundary Test */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Default Error Boundary</h2>
          <ErrorBoundary>
            <ErrorThrowingComponent shouldThrow={throwDefaultError} />
            <Button 
              onClick={() => setThrowDefaultError(true)}
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Trigger Default Error
            </Button>
          </ErrorBoundary>
        </div>

        {/* Dashboard Error Boundary Test */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Error Boundary</h2>
          <ErrorBoundary fallback={DashboardErrorFallback}>
            <ErrorThrowingComponent shouldThrow={throwDashboardError} />
            <Button 
              onClick={() => setThrowDashboardError(true)}
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Trigger Dashboard Error
            </Button>
          </ErrorBoundary>
        </div>

        {/* ChatPanel Error Boundary Test */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">ChatPanel Error Boundary</h2>
          <ErrorBoundary fallback={ChatPanelErrorFallback}>
            <ErrorThrowingComponent shouldThrow={throwChatError} />
            <Button 
              onClick={() => setThrowChatError(true)}
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Trigger ChatPanel Error
            </Button>
          </ErrorBoundary>
        </div>

        {/* TripsSection Error Boundary Test */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">TripsSection Error Boundary</h2>
          <ErrorBoundary fallback={TripsSectionErrorFallback}>
            <ErrorThrowingComponent shouldThrow={throwTripsError} />
            <Button 
              onClick={() => setThrowTripsError(true)}
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Trigger TripsSection Error
            </Button>
          </ErrorBoundary>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> After triggering an error, you can click the &quot;Try Again&quot; or &quot;Retry&quot; 
            button in the error fallback UI to reset the error boundary and restore the component.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundaryTest
