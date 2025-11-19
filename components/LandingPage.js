'use client'

import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui-new/toaster'
import AuthModal from '@/components/AuthModal'
import Dashboard from '@/components/Dashboard'
import { authApi } from '@/lib/api'
import { logger } from '@/lib/logger'

// Import new landing page components
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import CommunitySection from '@/components/CommunitySection'
import WhoWeAreSection from '@/components/WhoWeAreSection'
import FeaturesSection from '@/components/FeaturesSection'
import FounderSection from '@/components/FounderSection'
import ContactSection from '@/components/ContactSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3a4d6f] to-[#2a3a5a]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ec4899] mx-auto"></div>
      <p className="mt-4 text-white">Loading...</p>
    </div>
  </div>
)

const NewLandingPage = ({ onShowAuth }) => {
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleAuthSuccess = (userData) => {
    setShowAuthModal(false)
    // Will redirect to dashboard
    window.location.reload()
  }

  return (
    <div className="min-h-screen">
      <Header onShowAuth={onShowAuth} />
      <main>
        <HeroSection onShowAuth={onShowAuth} />
        <FounderSection />
        <CommunitySection />
        <WhoWeAreSection />
        <FeaturesSection />
        <ContactSection />
        <CTASection onShowAuth={onShowAuth} />
      </main>
      <Footer />
      <Toaster />

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}

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

  const handleShowAuth = () => {
    setShowAuthModal(true)
  }

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
    return <NewLandingPage onShowAuth={handleShowAuth} />
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}

export default App