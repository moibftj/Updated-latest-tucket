'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Plane,
  Camera,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
  Globe2,
  HeartPulse,
  Stars,
  Calendar,
  Share2,
  MessageCircle,
  Menu,
  X,
} from 'lucide-react'
import ShinyText from '@/components/ShinyText'
import Stack from '@/components/Stack'
import MagicBento from '@/components/MagicBento'
import { Timeline } from '@/components/ui/timeline'
import { Globe } from '@/components/ui/globe'

const heroImages = [
  { id: 1, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format' },
  { id: 2, img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format' },
  { id: 3, img: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1200&auto=format' },
  { id: 4, img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format' },
  { id: 5, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format' },
]

const partnerLogos = [
  'TripAdvisor',
  'Booking.com',
  'Airbnb',
  'Expedia',
  'Hotels.com',
  'Kayak',
]

const highlightMetrics = [
  {
    icon: Sparkles,
    label: 'Trips Created',
    value: '50K+',
    blurb: 'Travel plans beautifully organized and ready to share.',
  },
  {
    icon: Globe2,
    label: 'Destinations',
    value: '180+',
    blurb: 'Countries explored by our global community of travelers.',
  },
  {
    icon: HeartPulse,
    label: 'Active Users',
    value: '12K+',
    blurb: 'Travel enthusiasts planning their next adventure daily.',
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Digital Nomad & Travel Blogger',
    quote: '"Tucker Trips transformed how I plan my trips. I can organize flights, hotels, and itineraries all in one place. The collaboration features make group trips effortless!"',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format',
  },
  {
    name: 'David Park',
    role: 'Adventure Photographer',
    quote: '"As someone who travels for work constantly, Tucker Trips keeps me organized. I love being able to track all my trip details and share them with clients instantly."',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format',
  },
  {
    name: 'Maria Garcia',
    role: 'Family Travel Coordinator',
    quote: '"Planning family vacations used to be chaos. Now everyone can see the itinerary, add suggestions, and we stay connected through the built-in chat. Game changer!"',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format',
  },
]

const experienceHighlights = [
  {
    title: 'Capture Every Moment',
    subtitle: 'Travel is packed with priceless lessons—document it all here! Your future self (and friends) will thank you.',
    icon: Camera,
  },
  {
    title: 'Master Your Journey',
    subtitle: 'Plan like a pro. Save time, money, and headaches by tapping into your network\'s insider tips—skip the faceless online reviews!',
    icon: Calendar,
  },
  {
    title: 'Build Your Adventure Tribe',
    subtitle: 'Turn connections into a powerhouse of shared experiences. Swap stories, trade tips, and grow your travel community!',
    icon: Users,
  },
]

const features = [
  {
    icon: Plane,
    title: 'Multi-Stop Trip Planning',
    description: 'Plan complex itineraries with multiple destinations, flights, and connections.',
  },
  {
    icon: Camera,
    title: 'Photo & Memory Storage',
    description: 'Upload trip photos, add notes, and create a visual diary of your adventures.',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with travel companions in real-time while planning your next adventure.',
  },
  {
    icon: MapPin,
    title: 'Location Tracking',
    description: 'Keep track of all your destinations, addresses, and points of interest.',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your trip plans publicly or privately with selected friends and family.',
  },
  {
    icon: Stars,
    title: 'Trip Reviews & Ratings',
    description: 'Rate your experiences, review accommodations, and help others plan better trips.',
  },
]

// Particle component for background effects
const Particle = ({ delay = 0 }) => {
  const size = Math.random() * 3 + 1
  const duration = Math.random() * 20 + 15
  const xStart = Math.random() * 100
  const yStart = Math.random() * 100

  return (
    <div
      className="absolute rounded-full bg-gradient-to-r from-[#ff34ac]/40 to-[#7dbbe5]/40 blur-sm"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${xStart}%`,
        top: `${yStart}%`,
        animationName: 'floatParticle',
        animationDuration: `${duration}s`,
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        animationDelay: `${delay}s`,
        opacity: Math.random() * 0.6 + 0.2,
      }}
    />
  )
}

// Scroll animation observer hook
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState({})
  const elementsRef = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }))
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    Object.values(elementsRef.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return { visibleElements, elementsRef }
}

const timelineData = [
  {
    title: "LOG YOUR TRIP",
    content: (
      <div>
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Organize Every Detail
          </h3>
          <p className="text-gray-700 text-base md:text-lg font-medium mb-4">
            Keep flights, hotels, and experiences in one place.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-600">
              <Plane className="h-5 w-5 text-[#ff34ac] mt-0.5 flex-shrink-0" />
              <span>Track bookings and confirmations</span>
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <MapPin className="h-5 w-5 text-[#7dbbe5] mt-0.5 flex-shrink-0" />
              <span>Save hidden gems and recommendations</span>
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <Calendar className="h-5 w-5 text-[#ff34ac] mt-0.5 flex-shrink-0" />
              <span>Build your perfect itinerary</span>
            </li>
          </ul>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format"
            alt="Travel planning and organization"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>
    ),
  },
  {
    title: "SHARE YOUR TRIP",
    content: (
      <div>
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Plan Together, Travel Better
          </h3>
          <p className="text-gray-700 text-base md:text-lg font-medium mb-6">
            Collaborate with friends and inspire fellow travelers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#ff34ac]/10 to-transparent border border-[#ff34ac]/20">
              <Share2 className="h-6 w-6 text-[#ff34ac] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Share Itineraries</p>
                <p className="text-sm text-gray-600">Public or private</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#7dbbe5]/10 to-transparent border border-[#7dbbe5]/20">
              <Users className="h-6 w-6 text-[#7dbbe5] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Real-Time Collab</p>
                <p className="text-sm text-gray-600">Plan with your crew</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#ff34ac]/10 to-transparent border border-[#ff34ac]/20">
              <MessageCircle className="h-6 w-6 text-[#ff34ac] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Built-in Chat</p>
                <p className="text-sm text-gray-600">Stay connected</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#7dbbe5]/10 to-transparent border border-[#7dbbe5]/20">
              <Stars className="h-6 w-6 text-[#7dbbe5] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Inspire Others</p>
                <p className="text-sm text-gray-600">Share your stories</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=800&auto=format"
              alt="Group travel planning"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format"
              alt="Travel collaboration"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "LESSONS LEARNED",
    content: (
      <div>
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Learn & Grow With Every Journey
          </h3>
          <p className="text-gray-700 text-base md:text-lg font-medium mb-6">
            Build your travel expertise. Share what works.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white border-2 border-gray-200 hover:border-[#ff34ac]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#ff34ac]/70 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Document Insights</h4>
                <p className="text-gray-600 text-sm">What worked, what didn&apos;t—remember it all</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white border-2 border-gray-200 hover:border-[#7dbbe5]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7dbbe5] to-[#7dbbe5]/70 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🌟</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Discover Gems</h4>
                <p className="text-gray-600 text-sm">Save unexpected finds for next time</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white border-2 border-gray-200 hover:border-[#ff34ac]/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#ff34ac]/70 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Learn from Friends</h4>
                <p className="text-gray-600 text-sm">Trust your network, not strangers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format"
            alt="Travel wisdom and insights"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>
    ),
  },
];

const LandingPage = ({ onShowAuth }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pulseCta, setPulseCta] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { visibleElements, elementsRef } = useScrollAnimation()

  useEffect(() => {
    const dialogTimer = setTimeout(() => setDialogOpen(true), 3000)
    const ctaTimer = setTimeout(() => setPulseCta(true), 4500)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (entry.isIntersecting) {
            video.play().catch((err) => console.log('Video autoplay failed:', err))
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    const featureVideo = document.getElementById('feature-video')
    if (featureVideo) {
      videoObserver.observe(featureVideo)
    }

    return () => {
      clearTimeout(dialogTimer)
      clearTimeout(ctaTimer)
      window.removeEventListener('scroll', handleScroll)
      if (featureVideo) {
        videoObserver.unobserve(featureVideo)
      }
    }
  }, [])

  const animationStyles = useMemo(
    () => `
      @keyframes floatSlow {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-12px); }
      }

      @keyframes floatParticle {
        0% { transform: translateY(100vh) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
      }

      @keyframes floatCard {
        0%, 100% {
          transform: translateY(0px) translateX(0px);
        }
        25% {
          transform: translateY(-15px) translateX(5px);
        }
        50% {
          transform: translateY(-10px) translateX(-5px);
        }
        75% {
          transform: translateY(-20px) translateX(5px);
        }
      }

      @keyframes inflateFromBottom {
        0% {
          transform: translateY(200px) scale(0.5);
          opacity: 0;
        }
        50% {
          transform: translateY(100px) scale(0.75);
          opacity: 0.3;
        }
        70% {
          transform: translateY(30px) scale(0.95);
          opacity: 0.7;
        }
        85% {
          transform: translateY(-5px) scale(1.02);
          opacity: 1;
        }
        100% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }

      @keyframes shimmerSoft {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }

      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 0 rgba(236, 72, 153, 0.0); }
        50% { box-shadow: 0 0 35px rgba(236, 72, 153, 0.45); }
      }

      @keyframes pulseRing {
        0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.35); }
        70% { box-shadow: 0 0 0 12px rgba(236, 72, 153, 0); }
        100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes fadeInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes textReveal {
        0% { clip-path: inset(0 100% 0 0); }
        100% { clip-path: inset(0 0 0 0); }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-float-slow { animation: floatSlow 9s ease-in-out infinite; }
      .animate-glow { animation: glowPulse 6s ease-in-out infinite; }
      .animate-shimmer { animation: shimmerSoft 14s linear infinite; background-size: 300% 300%; }
      .animate-pulse-ring { animation: pulseRing 3.6s ease-in-out infinite; }
      
      .animate-in-up { animation: fadeInUp 0.8s ease-out forwards; }
      .animate-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
      .animate-in-right { animation: fadeInRight 0.8s ease-out forwards; }
      .animate-text-reveal { animation: textReveal 1s ease-out forwards; }
      .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }

      .stagger-1 { animation-delay: 0.1s; }
      .stagger-2 { animation-delay: 0.2s; }
      .stagger-3 { animation-delay: 0.3s; }
      .stagger-4 { animation-delay: 0.4s; }
      .stagger-5 { animation-delay: 0.5s; }
      .stagger-6 { animation-delay: 0.6s; }
    `,
    []
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900">
      <style>{animationStyles}</style>

      {/* Animated background particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,52,172,0.08),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-1/2 bg-[radial-gradient(circle_at_center,_rgba(125,187,229,0.12),_transparent_65%)] blur-3xl" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Logo Animation Video - No Border */}
              <div className="relative rounded-lg overflow-hidden w-24 h-10 sm:w-32 sm:h-12 md:w-40 md:h-14 flex items-center justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <source src="https://cdn.builder.io/o/assets%2F58d6334510b64a3ba328208823c50014%2F299bc08af4624a44a5e844e58a4ba270?alt=media&token=476c8007-60ef-4821-95d8-cd1b2f918b60&apiKey=58d6334510b64a3ba328208823c50014" type="video/webm" />
                </video>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
              <button className="transition hover:text-gray-900 hover:text-[#ff34ac]">Features</button>
              <button className="transition hover:text-gray-900 hover:text-[#ff34ac]">Community</button>
              <button className="transition hover:text-gray-900 hover:text-[#ff34ac]">About</button>
            </nav>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden sm:flex space-x-2">
                <Button
                  onClick={onShowAuth}
                  variant="ghost"
                  size="sm"
                  className="border border-gray-300 bg-white text-gray-900 shadow-sm transition hover:border-[#ff34ac]/60 hover:bg-[#ff34ac]/10 text-xs sm:text-sm"
                >
                  <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Login
                </Button>
                <Button
                  onClick={onShowAuth}
                  size="sm"
                  className="bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white shadow-lg shadow-[#ff34ac]/40 transition hover:shadow-[#ff34ac]/60 text-xs sm:text-sm"
                >
                  Sign Up
                </Button>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 text-gray-900 hover:text-[#ff34ac] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white/98 backdrop-blur-xl">
            <nav className="flex flex-col space-y-2 p-4">
              <button className="text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                Features
              </button>
              <button className="text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                Community
              </button>
              <button className="text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                About
              </button>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onShowAuth()
                  }}
                  variant="ghost"
                  className="w-full justify-start border border-gray-300 bg-white text-gray-900 hover:border-[#ff34ac]/60 hover:bg-[#ff34ac]/10"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onShowAuth()
                  }}
                  className="w-full bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white"
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - 21st.dev Style */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,52,172,0.08),transparent_50%)]" />
          <div className="animate-shimmer absolute -top-32 left-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-[#ff34ac]/40 via-[#7dbbe5]/30 to-[#ff34ac]/40 blur-3xl" />
          <div className="animate-glow absolute bottom-0 left-0 h-60 w-60 rounded-full bg-[#ff34ac]/30 blur-[90px]" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto">
          {/* Floating Demo Cards - Hidden on mobile */}
          <div className="hidden lg:block absolute inset-0 w-full h-full perspective">
            {/* Top Left Card */}
            <div
              className={`absolute -top-20 -left-12 w-72 h-48 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 p-4 will-change-transform hover:scale-105 transition-transform duration-700 ease-out cursor-pointer group ${visibleElements['hero-card-1'] ? 'opacity-100' : 'opacity-0'}`}
              id="hero-card-1"
              ref={(el) => {
                if (el) elementsRef.current['hero-card-1'] = el
              }}
              style={{
                animation: visibleElements['hero-card-1']
                  ? `inflateFromBottom 3s ease-out 0s forwards, floatCard 8s cubic-bezier(0.4, 0, 0.2, 1) 3s infinite`
                  : 'none'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#7dbbe5] flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Flight Booking</p>
                  <p className="text-xs text-gray-600">Seamless flight planning</p>
                </div>
              </div>
              <div className="w-full h-24 bg-gradient-to-br from-[#ff34ac]/30 to-[#7dbbe5]/30 rounded-lg overflow-hidden group-hover:opacity-80 transition">
                <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&auto=format" alt="Flight" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm">
                <button onClick={onShowAuth} className="px-4 py-2 bg-[#ff34ac] text-white rounded-full text-sm font-semibold hover:bg-[#ff34ac]/90">See live</button>
              </div>
            </div>

            {/* Top Right Card */}
            <div
              className={`absolute -top-32 -right-8 w-80 h-52 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 p-4 will-change-transform hover:scale-105 transition-transform duration-700 ease-out cursor-pointer group ${visibleElements['hero-card-2'] ? 'opacity-100' : 'opacity-0'}`}
              id="hero-card-2"
              ref={(el) => {
                if (el) elementsRef.current['hero-card-2'] = el
              }}
              style={{
                animation: visibleElements['hero-card-2']
                  ? `inflateFromBottom 3s ease-out 0.4s forwards, floatCard 10s cubic-bezier(0.4, 0, 0.2, 1) 3.4s infinite`
                  : 'none'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7dbbe5] to-[#ff34ac] flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Photo Memories</p>
                  <p className="text-xs text-gray-600">Capture every moment</p>
                </div>
              </div>
              <div className="w-full h-28 bg-gradient-to-br from-[#7dbbe5]/30 to-[#ff34ac]/30 rounded-lg overflow-hidden group-hover:opacity-80 transition">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format" alt="Memory" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm">
                <button onClick={onShowAuth} className="px-4 py-2 bg-[#ff34ac] text-white rounded-full text-sm font-semibold hover:bg-[#ff34ac]/90">See live</button>
              </div>
            </div>

            {/* Bottom Left Card */}
            <div
              className={`absolute -bottom-16 -left-16 w-64 h-44 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 p-4 will-change-transform hover:scale-105 transition-transform duration-700 ease-out cursor-pointer group ${visibleElements['hero-card-3'] ? 'opacity-100' : 'opacity-0'}`}
              id="hero-card-3"
              ref={(el) => {
                if (el) elementsRef.current['hero-card-3'] = el
              }}
              style={{
                animation: visibleElements['hero-card-3']
                  ? `inflateFromBottom 3s ease-out 0.8s forwards, floatCard 9s cubic-bezier(0.4, 0, 0.2, 1) 3.8s infinite`
                  : 'none'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#7dbbe5] flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Collaborate</p>
                  <p className="text-xs text-gray-600">Plan together</p>
                </div>
              </div>
              <div className="w-full h-20 bg-gradient-to-br from-[#ff34ac]/30 to-[#7dbbe5]/30 rounded-lg overflow-hidden group-hover:opacity-80 transition">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format" alt="Collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm">
                <button onClick={onShowAuth} className="px-4 py-2 bg-[#ff34ac] text-white rounded-full text-sm font-semibold hover:bg-[#ff34ac]/90">See live</button>
              </div>
            </div>

            {/* Bottom Right Card */}
            <div
              className={`absolute -bottom-20 -right-12 w-72 h-48 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 p-4 will-change-transform hover:scale-105 transition-transform duration-700 ease-out cursor-pointer group ${visibleElements['hero-card-4'] ? 'opacity-100' : 'opacity-0'}`}
              id="hero-card-4"
              ref={(el) => {
                if (el) elementsRef.current['hero-card-4'] = el
              }}
              style={{
                animation: visibleElements['hero-card-4']
                  ? `inflateFromBottom 3s ease-out 1.2s forwards, floatCard 11s cubic-bezier(0.4, 0, 0.2, 1) 4.2s infinite`
                  : 'none'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7dbbe5] to-[#ff34ac] flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Share Stories</p>
                  <p className="text-xs text-gray-600">Document adventures</p>
                </div>
              </div>
              <div className="w-full h-20 bg-gradient-to-br from-[#7dbbe5]/30 to-[#ff34ac]/30 rounded-lg overflow-hidden group-hover:opacity-80 transition">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format" alt="Stories" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm">
                <button onClick={onShowAuth} className="px-4 py-2 bg-[#ff34ac] text-white rounded-full text-sm font-semibold hover:bg-[#ff34ac]/90">See live</button>
              </div>
            </div>
          </div>

          {/* Central Hero Card */}
          <div
            className={`relative z-10 mx-auto max-w-2xl text-center px-4 ${visibleElements['hero-center'] ? 'animate-scale-in' : 'opacity-0'}`}
            id="hero-center"
            ref={(el) => {
              if (el) elementsRef.current['hero-center'] = el
            }}
          >
            <div className="rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-2xl border border-gray-200">
              {/* Tucker Logo */}
              <div className={`flex justify-center mb-4 sm:mb-6 ${visibleElements['hero-center'] ? 'animate-in-up stagger-1' : 'opacity-0'}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F58d6334510b64a3ba328208823c50014%2F1ab2aa9dfe9749deb69cc85a9ee54327?format=webp&width=800"
                  alt="Tucker Trips Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto"
                />
              </div>

              {/* Title */}
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight ${visibleElements['hero-center'] ? 'animate-in-up stagger-2' : 'opacity-0'}`}
              >
                Welcome to<br className="sm:hidden" /> Tucker Trips
              </h1>

              {/* Subtitle */}
              <p
                className={`text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed ${visibleElements['hero-center'] ? 'animate-in-up stagger-3' : 'opacity-0'}`}
              >
                <span className="bg-gradient-to-r from-[#ff34ac] via-gray-700 to-[#7dbbe5] bg-clip-text text-transparent font-medium">
                  Experience the world, one voyage at a time.
                </span>
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center ${visibleElements['hero-center'] ? 'animate-in-up stagger-4' : 'opacity-0'}`}
              >
                <Button
                  onClick={onShowAuth}
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white font-semibold shadow-lg shadow-[#ff34ac]/40 hover:shadow-[#ff34ac]/60 hover:-translate-y-1 transition duration-300 text-sm sm:text-base py-6 sm:py-3 px-6 sm:px-8"
                >
                  <ShinyText text="Start Planning Free" speed={2.2} />
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <button
                  onClick={onShowAuth}
                  className="w-full sm:w-auto rounded-full border-2 border-gray-300 bg-white px-6 sm:px-8 py-3 text-sm sm:text-base text-gray-900 font-semibold hover:border-[#ff34ac]/60 hover:bg-[#ff34ac]/10 transition duration-300"
                >
                  View Demo
                </button>
              </div>

              {/* Metrics */}
              <div
                className={`mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4 ${visibleElements['hero-center'] ? 'animate-in-up stagger-5' : 'opacity-0'}`}
              >
                {highlightMetrics.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 uppercase tracking-wide mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section
        className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
        id="video-section"
        ref={(el) => {
          if (el) elementsRef.current['video-section'] = el
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,52,172,0.08),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className={`text-center mb-8 sm:mb-12 ${visibleElements['video-section'] ? 'animate-in-up' : 'opacity-0'}`}>
            <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#7dbbe5]">Experience</p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 px-4">
              See Tucker Trips in Action
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 px-4 max-w-2xl mx-auto">
              Watch how easy it is to plan your perfect adventure
            </p>
          </div>

          <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#ff34ac]/30 shadow-xl bg-white backdrop-blur-sm transition duration-500 hover:border-[#ff34ac]/60 hover:shadow-2xl cursor-pointer ${visibleElements['video-section'] ? 'animate-scale-in stagger-2' : 'opacity-0'}`}>
            <video
              id="feature-video"
              loop
              muted
              playsInline
              className="w-full aspect-video object-cover"
            >
              <source src="https://cdn.builder.io/o/assets%2F58d6334510b64a3ba328208823c50014%2Fce3f91af23404f229e8d5749e18ce320?alt=media&token=b1fb1eaf-237b-4262-a29e-1f9451b5319c&apiKey=58d6334510b64a3ba328208823c50014" type="video/webm" />
            </video>

            <div className="pointer-events-none absolute -inset-2 bg-gradient-to-r from-[#ff34ac]/20 via-transparent to-[#7dbbe5]/20 blur-xl" />
          </div>
        </div>
      </section>

      {/* Why Choose Tucker Trips Timeline Section */}
      <section className="relative bg-white border-t border-gray-200">
        <Timeline data={timelineData} />
      </section>

      {/* Global Travelers Community Section with Globe */}
      <section
        className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200"
        id="globe-section"
        ref={(el) => {
          if (el) elementsRef.current['globe-section'] = el
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(125,187,229,0.08),_transparent_65%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className={`text-center mb-12 sm:mb-16 ${visibleElements['globe-section'] ? 'animate-in-up' : 'opacity-0'}`}>
            <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#7dbbe5]">Community</p>
            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 px-4">
              <span className="bg-gradient-to-r from-[#ff34ac] via-gray-900 to-[#7dbbe5] bg-clip-text text-transparent">
                Travelers Around the World
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 px-4 max-w-2xl mx-auto">
              Join thousands of adventurers sharing their journeys and planning their next escapes
            </p>
          </div>

          <div className={`mb-16 sm:mb-20 ${visibleElements['globe-section'] ? 'animate-scale-in stagger-2' : 'opacity-0'}`}>
            <Globe className="mx-auto" />
          </div>

          {/* Founder Section - Kristin Stein */}
          <div className={`${visibleElements['globe-section'] ? 'animate-in-up stagger-3' : 'opacity-0'}`}>
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#ff34ac]">Meet the Founder</p>
              <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
                Built by a Traveler, for Travelers
              </h3>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="group relative rounded-2xl bg-white backdrop-blur-md border border-gray-200 p-8 sm:p-10 hover:border-[#ff34ac]/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#ff34ac]/30 group-hover:border-[#ff34ac]/60 transition-all">
                      <img
                        src="https://ugxzjmzrmvbnhfejwjse.supabase.co/storage/v1/object/sign/stoi/Me-and-Tucker-2-1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYmE5N2E1ZS04YmMzLTQzODQtYWYyZS1kMzg4MDFjNTY2ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9pL01lLWFuZC1UdWNrZXItMi0xLmpwZyIsImlhdCI6MTc2MjE5MjYxMiwiZXhwIjoxNzkzNzI4NjEyfQ.NtQT70gQB0V0oFH4n0-Vb96ZACFFXOSSS4rY5hwYtYM"
                        alt="Kristin Stein - Founder"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Kristin Stein</h4>
                  <p className="text-sm text-[#ff34ac] mb-6 uppercase tracking-wider">Founder</p>

                  <div className="text-left max-w-2xl">
                    <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Why I Founded Tucker Trips</h5>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      I started Tucker Trips after becoming frustrated with the endless search for reviews from strangers while trying to plan the perfect family vacation. As someone who loves exploring new places, I believe in the value of being well-informed before setting out on any adventure.
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      With practical information at hand, I can focus on enjoying my time rather than hunting for activities or attractions once I arrive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 sm:py-8 px-4 text-center text-xs sm:text-sm text-gray-500">
        <div className="max-w-7xl mx-auto">
          {/* Logo Animation */}
          <div className="flex justify-center mb-4">
            <img
              src="https://ugxzjmzrmvbnhfejwjse.supabase.co/storage/v1/object/sign/stoi/Untitled%20(Logo).gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYmE5N2E1ZS04YmMzLTQzODQtYWYyZS1kMzg4MDFjNTY2ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9pL1VudGl0bGVkIChMb2dvKS5naWYiLCJpYXQiOjE3NjIxOTIwODMsImV4cCI6MTc5MzcyODA4M30.5N-G57YWF2rv8vjQ9QxjUqZj0dNdDzmOa7tuqJG2ffc"
              alt="Tucker Trips Logo"
              className="h-12 sm:h-16 w-auto"
            />
          </div>
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Tucker Trips. Plan smarter. Travel better. Live fully.
          </p>
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
            <button className="hover:text-[#ff34ac] transition">Privacy Policy</button>
            <button className="hover:text-[#ff34ac] transition">Terms of Service</button>
            <button className="hover:text-[#ff34ac] transition">Contact Us</button>
            <button className="hover:text-[#ff34ac] transition">Help Center</button>
          </div>
        </div>
      </footer>

      {/* Welcome Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border border-gray-200 bg-white text-gray-900 backdrop-blur-xl shadow-xl mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-900">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff34ac]" />
              Welcome to Tucker Trips
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-gray-600">
              Start planning your dream trip today. Create detailed itineraries, collaborate with friends,
              and make every journey unforgettable.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 sm:mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                setDialogOpen(false)
                if (onShowAuth) {
                  onShowAuth()
                }
              }}
              className="flex-1 bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white shadow-lg shadow-[#ff34ac]/30 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Get Started Free
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="flex-1 border border-gray-300 bg-white text-gray-700 transition hover:border-[#7dbbe5]/60 hover:bg-[#7dbbe5]/10 hover:text-gray-900 text-sm sm:text-base"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LandingPage
