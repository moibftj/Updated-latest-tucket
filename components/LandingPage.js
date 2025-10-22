'use client'

import { Button } from '@/components/ui/button'
import { Plane, Camera, MapPin, Users, ArrowRight } from 'lucide-react'

const LandingPage = ({ onShowAuth }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-purple-900/80 backdrop-blur-sm border-b border-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-pink-500 rounded-lg">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Tucker Trips</h1>
            </div>
            <div className="flex space-x-3">
              <Button onClick={onShowAuth} className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 font-semibold">
                <Users className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button onClick={onShowAuth} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            WELCOME TO<br />
            <span className="text-pink-300">TUCKER TRIPS</span>
          </h1>
          <p className="text-2xl md:text-3xl text-purple-200 mb-8 font-light">
            Experience The World, One Voyage At A Time.
          </p>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-10">
            Travel is packed with priceless lessons—document it all here! Your future self (and friends) will thank you.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={onShowAuth} size="lg" className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Subtitle Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Tucker Trips Organizes Your Travel Logistics - Log It, Share It, Love It!
          </h2>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="p-6 bg-pink-500 rounded-full">
                <Camera className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Capture Every Moment!</h3>
            <p className="text-purple-200 text-lg">
              Travel is packed with priceless lessons—document it all here! Your future self (and friends) will thank you.
            </p>
            <div className="mt-4 text-pink-400">
              <ArrowRight className="w-6 h-6 mx-auto" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="p-6 bg-pink-500 rounded-full">
                <MapPin className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Master Your Journey!</h3>
            <p className="text-purple-200 text-lg">
              Plan like a pro! Save time, money, and headaches by tapping into your network's insider tips—skip the faceless online reviews!
            </p>
            <div className="mt-4 text-pink-400">
              <ArrowRight className="w-6 h-6 mx-auto" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="p-6 bg-pink-500 rounded-full">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Build Your Adventure Tribe!</h3>
            <p className="text-purple-200 text-lg">
              Turn connections into a powerhouse of shared experiences. Swap stories, trade tips, and grow your travel community!
            </p>
            <div className="mt-4 text-pink-400">
              <ArrowRight className="w-6 h-6 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-purple-900 to-purple-800 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
        <Button onClick={onShowAuth} size="lg" className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6">
          Sign Up For Tucker Trips Today
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-purple-950 text-center text-purple-300">
        <p>&copy; 2025 Tucker Trips. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
