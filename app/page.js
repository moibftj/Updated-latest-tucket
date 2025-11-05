'use client'

import { useState, useEffect } from 'react'
import LandingPage from '@/components/LandingPage'
import AuthModal from '@/components/AuthModal'
import Dashboard from '@/components/Dashboard'
import { authApi } from '@/lib/api'
import { logger } from '@/lib/logger'

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
)

const App = () => {
  const [user, setUser] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    const verifyUser = async () => {
      try {
        const data = await authApi.getMe()
        setUser(data.user)
      } catch (error) {
        logger.error('Auth check failed:', error)
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  if (loading) {
    return <LoadingState />
  }

  if (!user) {
    return (
      <>
        <LandingPage onShowAuth={() => setShowAuthModal(true)} />
        <AuthModal
          open={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      </>
    )
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}

export default App
