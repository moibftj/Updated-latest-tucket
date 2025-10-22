'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plane, MapPin, Calendar, Users } from 'lucide-react'
import LandingPage from '@/components/LandingPage'
import AuthModal from '@/components/AuthModal'
import Dashboard from '@/components/Dashboard'

const App = () => {
  const [user, setUser] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          localStorage.removeItem('token')
          setLoading(false)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <LandingPage onShowAuth={() => setShowAuthModal(true)} />
        <AuthModal 
          open={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onSuccess={(userData) => {
            setUser(userData)
            setShowAuthModal(false)
          }}
        />
      </>
    )
  }

  return <Dashboard user={user} onLogout={() => { localStorage.removeItem('token'); setUser(null) }} />
}

export default App
