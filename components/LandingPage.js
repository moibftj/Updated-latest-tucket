'use client'

import { Button } from '@/components/ui/button'
import { Plane, Camera, MapPin, Users, ArrowRight } from 'lucide-react'
import ShinyText from '@/components/ShinyText'
import Stack from '@/components/Stack'
import MagicBento from '@/components/MagicBento'

const heroImages = [
  { id: 1, img: 'https://images.unsplash.com/photo-1568005885177-4645086c3e01?q=80&w=1200&auto=format' },
  { id: 2, img: 'https://images.unsplash.com/photo-1614088459293-5669fadc3448?q=80&w=1200&auto=format' },
  { id: 3, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format' },
  { id: 4, img: 'https://images.unsplash.com/photo-1489396160836-2c99c977e970?q=80&w=1200&auto=format' },
  { id: 5, img: 'https://images.unsplash.com/photo-1682687982183-c2937a74257c?q=80&w=1200&auto=format' },
]

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
              <Button onClick={onShowAuth} className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 font-semibold backdrop-blur-sm shadow-lg">
                <Users className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button onClick={onShowAuth} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg hover:shadow-pink-500/50 transition-all">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                WELCOME TO<br />
                <span className="text-pink-300">TUCKER TRIPS</span>
              </h1>
              <p className="text-2xl md:text-3xl text-purple-200 mb-8 font-light">Experience The World, One Voyage At A Time.</p>
              <p className="text-lg text-purple-100 max-w-2xl mx-auto lg:mx-0 mb-10">Travel is packed with priceless lessons—document it all here! Your future self (and friends) will thank you.</p>
              <div className="flex justify-center lg:justify-start">
                <Button onClick={onShowAuth} size="lg" className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-pink-500/50 transition-all glow-purple-pink">
                  <ShinyText text="Get Started" speed={3} />
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Stack cardsData={heroImages} cardDimensions={{ width: 300, height: 360 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Magic Bento Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Everything you need to plan and remember remarkable trips</h2>
          <p className="text-purple-200 mt-2">We can swap the card copy with your custom labels and descriptions anytime.</p>
        </div>
        <div className="flex justify-center">
          <MagicBento />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-purple-900 to-purple-800 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
        <Button onClick={onShowAuth} size="lg" className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-pink-500/50 transition-all glow-purple-pink">
          <ShinyText text="Sign Up For Tucker Trips Today" speed={3} />
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
