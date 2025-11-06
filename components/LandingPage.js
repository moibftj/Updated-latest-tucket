'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
import { logger } from '@/lib/logger'

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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Organize Every Detail
          </h3>
          <p className="text-gray-100 text-base md:text-lg font-medium mb-4">
            Keep flights, hotels, and experiences in one place.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-200">
              <Plane className="h-5 w-5 text-[#ff34ac] mt-0.5 flex-shrink-0" />
              <span>Track bookings and confirmations</span>
            </li>
            <li className="flex items-start gap-3 text-gray-200">
              <MapPin className="h-5 w-5 text-[#7dbbe5] mt-0.5 flex-shrink-0" />
              <span>Save hidden gems and recommendations</span>
            </li>
            <li className="flex items-start gap-3 text-gray-200">
              <Calendar className="h-5 w-5 text-[#ff34ac] mt-0.5 flex-shrink-0" />
              <span>Build your perfect itinerary</span>
            </li>
          </ul>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format"
            alt="Travel planning and organization"
            width={1200}
            height={384}
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Plan Together, Travel Better
          </h3>
          <p className="text-gray-100 text-base md:text-lg font-medium mb-6">
            Collaborate with friends and inspire fellow travelers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#ff34ac]/20 to-transparent border border-[#ff34ac]/40">
              <Share2 className="h-6 w-6 text-[#ff34ac] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Share Itineraries</p>
                <p className="text-sm text-gray-200">Public or private</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#7dbbe5]/20 to-transparent border border-[#7dbbe5]/40">
              <Users className="h-6 w-6 text-[#7dbbe5] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Real-Time Collab</p>
                <p className="text-sm text-gray-200">Plan with your crew</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#ff34ac]/20 to-transparent border border-[#ff34ac]/40">
              <MessageCircle className="h-6 w-6 text-[#ff34ac] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Built-in Chat</p>
                <p className="text-sm text-gray-200">Stay connected</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#7dbbe5]/20 to-transparent border border-[#7dbbe5]/40">
              <Stars className="h-6 w-6 text-[#7dbbe5] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Inspire Others</p>
                <p className="text-sm text-gray-200">Share your stories</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=800&auto=format"
              alt="Group travel planning"
              width={800}
              height={288}
              className="w-full h-56 md:h-72 object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format"
              alt="Travel collaboration"
              width={800}
              height={288}
              className="w-full h-56 md:h-72 object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Learn & Grow With Every Journey
          </h3>
          <p className="text-gray-100 text-base md:text-lg font-medium mb-6">
            Build your travel expertise. Share what works.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/10 border-2 border-white/20 hover:border-[#ff34ac]/50 transition-colors backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#ff34ac]/70 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Document Insights</h4>
                <p className="text-gray-200 text-sm">What worked, what didn&apos;t—remember it all</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/10 border-2 border-white/20 hover:border-[#7dbbe5]/50 transition-colors backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7dbbe5] to-[#7dbbe5]/70 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🌟</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Discover Gems</h4>
                <p className="text-gray-200 text-sm">Save unexpected finds for next time</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-white/10 border-2 border-white/20 hover:border-[#ff34ac]/50 transition-colors backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#ff34ac]/70 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Learn from Friends</h4>
                <p className="text-gray-200 text-sm">Trust your network, not strangers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format"
            alt="Travel wisdom and insights"
            width={1200}
            height={384}
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
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
            video.play().catch((err) => logger.log('Video autoplay failed:', err))
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

      {/* Hero Section - Optimized Spacing */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
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
                <Image src="https://ugxzjmzrmvbnhfejwjse.supabase.co/storage/v1/object/sign/stoi/FB_IMG_1494034557555-225x300.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYmE5N2E1ZS04YmMzLTQzODQtYWYyZS1kMzg4MDFjNTY2ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9pL0ZCX0lNR18xNDk0MDM0NTU3NTU1LTIyNXgzMDAucG5nIiwiaWF0IjoxNzYyMzgwNjM4LCJleHAiOjE3OTM5MTY2Mzh9.Y9nseDyS5Qxt3kB-6xHiwpgum0e263yj9Z4PJN5rUgw" alt="Tucker Adventure" width={225} height={300} className="w-full h-full object-cover" priority placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" />
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
                <Image src="https://ugxzjmzrmvbnhfejwjse.supabase.co/storage/v1/object/sign/stoi/IMG_20201024_120435-scaled.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYmE5N2E1ZS04YmMzLTQzODQtYWYyZS1kMzg4MDFjNTY2ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9pL0lNR18yMDIwMTAyNF8xMjA0MzUtc2NhbGVkLnBuZyIsImlhdCI6MTc2MjM4MDcxMSwiZXhwIjoxNzkzOTE2NzExfQ.jxCQrVgcEdBS0j9dOr-45ht_-ckxGBOZ4Y364WmH9Zo" alt="Tucker Memory" width={400} height={112} className="w-full h-full object-cover" priority placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" />
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
                <Image src="https://ugxzjmzrmvbnhfejwjse.supabase.co/storage/v1/object/sign/stoi/Me-and-Tucker.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYmE5N2E1ZS04YmMzLTQzODQtYWYyZS1kMzg4MDFjNTY2ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9pL01lLWFuZC1UdWNrZXIucG5nIiwiaWF0IjoxNzYyMzgwNzMxLCJleHAiOjE3OTM5MTY3MzF9.DeiqjCCVAahTZf2BNm0Tg5Feels46CYxqUMGi_DDdt8" alt="Tucker Collaboration" width={400} height={80} className="w-full h-full object-cover" priority placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" />
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
                <Image src="https://ugxzjmzrmvbnhfejwjse.supabase.co/storage/v1/object/sign/stoi/Me-and-Tucker-2-1-264x300.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYmE5N2E1ZS04YmMzLTQzODQtYWYyZS1kMzg4MDFjNTY2ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9pL01lLWFuZC1UdWNrZXItMi0xLTI2NHgzMDAucG5nIiwiaWF0IjoxNzYyMzgwNzg5LCJleHAiOjE3OTM5MTY3ODl9.3tXPSUCCYD9u0jiH7Q7SzgKVy8JjMLRAgCJc5rKr-iA" alt="Tucker Stories" width={264} height={300} className="w-full h-full object-cover" priority placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" />
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
                <Image
                  src="https://tuckertrips.com/wp-content/uploads/2024/05/cropped-Tucker-192x192.png"
                  alt="Tucker Trips Logo"
                  width={192}
                  height={192}
                  className="h-16 sm:h-20 md:h-24 w-auto"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </div>

              {/* Title */}
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight ${visibleElements['hero-center'] ? 'animate-in-up stagger-2' : 'opacity-0'}`}
              >
                Trip planning from<br className="sm:hidden" /> people you actually know
              </h1>

              {/* Subtitle */}
              <p
                className={`text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed ${visibleElements['hero-center'] ? 'animate-in-up stagger-3' : 'opacity-0'}`}
              >
                <span className="bg-gradient-to-r from-[#ff34ac] via-gray-700 to-[#7dbbe5] bg-clip-text text-transparent font-medium">
                  Tucker Trips helps you log real trips and get advice from your circle—friends and family whose experiences you trust.
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
                  Start a Trip
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <button
                  onClick={onShowAuth}
                  className="w-full sm:w-auto rounded-full border-2 border-gray-300 bg-white px-6 sm:px-8 py-3 text-sm sm:text-base text-gray-900 font-semibold hover:border-[#ff34ac]/60 hover:bg-[#ff34ac]/10 transition duration-300"
                >
                  Explore Your Circle
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

      {/* From Your Circle Section */}
      <section
        className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
        id="from-circle-section"
        ref={(el) => {
          if (el) elementsRef.current['from-circle-section'] = el
        }}
      >
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(125,187,229,0.08),_transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,52,172,0.08),_transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Header */}
          <div className={`text-center mb-8 md:mb-12 ${visibleElements['from-circle-section'] ? 'animate-in-up' : 'opacity-0'}`}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#7dbbe5] font-semibold mb-3">YOUR COMMUNITY</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              From your circle
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Trips and tips shared by people you actually know.
            </p>
          </div>

          {/* Circle Examples */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 ${visibleElements['from-circle-section'] ? 'animate-in-up stagger-2' : 'opacity-0'}`}>
            <div className="group bg-gradient-to-br from-[#ff34ac]/10 via-white to-[#7dbbe5]/10 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#7dbbe5] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Jamie's Maui week</h3>
                  <p className="text-sm text-gray-600">Car rental surprise fees</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "Don't book the airport rental—saved $200 using Turo and avoided the hidden resort fees they hit you with at checkout."
              </p>
            </div>

            <div className="group bg-gradient-to-br from-[#7dbbe5]/10 via-white to-[#ff34ac]/10 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7dbbe5] to-[#ff34ac] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AS</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Aunt Sara's Rome with teens</h3>
                  <p className="text-sm text-gray-600">Day-by-day map</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "Skip the morning Colosseum—go at 4pm. Teens actually engaged, no crowds, and perfect lighting for photos."
              </p>
            </div>

            <div className="group bg-gradient-to-br from-[#ff34ac]/10 via-white to-[#7dbbe5]/10 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#7dbbe5] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Usman's Hunza budget breakdown</h3>
                  <p className="text-sm text-gray-600">Where to splurge</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "Budget hotels: $15/night. Splurge on the private driver—worth every rupee for those mountain roads."
              </p>
            </div>
          </div>

          {/* Value Props */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 ${visibleElements['from-circle-section'] ? 'animate-in-up stagger-3' : 'opacity-0'}`}>
            <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#ff34ac]/70 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Real people, not random reviews</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Tips from your circle—reliable, bias-checked by folks you know.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#7dbbe5] to-[#7dbbe5]/70 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Log once, help forever</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Capture routes, budgets, gotchas; future you (and your friends) say thanks.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#ff34ac]/70 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Plan smarter</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Build itineraries faster with trusted recaps and logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Journey - Optimized Spacing */}
      <section
        className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
        id="founder-journey"
        ref={(el) => {
          if (el) elementsRef.current['founder-journey'] = el
        }}
      >
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,52,172,0.08),_transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(125,187,229,0.08),_transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Header - Compact */}
          <div className={`text-center mb-8 md:mb-12 ${visibleElements['founder-journey'] ? 'animate-in-up' : 'opacity-0'}`}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#ff34ac] font-semibold mb-3">FOUNDER'S STORY</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-[#ff34ac] via-gray-900 to-[#7dbbe5] bg-clip-text text-transparent">
                Why I started Tucker Trips
              </span>
            </h2>
          </div>

          {/* Main Content Grid - Reduced Margin */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
            {/* Left: Story & Quote */}
            <div className={`space-y-6 ${visibleElements['founder-journey'] ? 'animate-in-left stagger-2' : 'opacity-0'}`}>
              <div className="bg-gradient-to-br from-[#ff34ac]/10 via-white to-[#7dbbe5]/10 p-6 md:p-8 rounded-2xl border border-gray-200 shadow-xl">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
                  I built Tucker Trips after getting tired of planning vacations off reviews from strangers.
                  I wanted a place where my own circle—family and friends—could swap honest notes, logistics,
                  and "what I'd do differently next time." Now it's yours too: real trips, real people,
                  fewer guesswork headaches.
                </p>
                <footer className="flex items-center gap-3">
                  <Image
                    src="https://tuckertrips.com/wp-content/uploads/2024/09/FB_IMG_1494034557555-225x300.jpg"
                    alt="Kristin Stein"
                    width={225}
                    height={300}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#ff34ac] shadow-md"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  />
                  <div>
                    <cite className="not-italic font-bold text-gray-900">Kristin Stein</cite>
                    <p className="text-sm text-[#ff34ac] font-semibold">Founder</p>
                  </div>
                </footer>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Tucker Trips organizes your travel logistics—log it, share it, love it.
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Capture the route, costs, timing, and "next time do this instead."
                  Your circle learns from your trip; you plan the next one in half the time.
                </p>
              </div>
            </div>

            {/* Right: Photo Collage */}
            <div className={`relative ${visibleElements['founder-journey'] ? 'animate-in-right stagger-3' : 'opacity-0'}`}>
              <div className="grid grid-cols-2 gap-4">
                {/* Large featured image */}
                <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl group">
                  <Image 
                    src="https://tuckertrips.com/wp-content/uploads/2024/09/IMG_20171229_173644-scaled.jpg"
                    alt="Kristin's Travel Adventure"
                    width={2560}
                    height={1920}
                    className="w-full h-80 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-semibold text-lg md:text-xl">Exploring the World</p>
                    <p className="text-white/90 text-sm">One adventure at a time</p>
                  </div>
                </div>

                {/* Mountain adventure */}
                <div className="relative rounded-xl overflow-hidden shadow-xl group">
                  <Image 
                    src="https://tuckertrips.com/wp-content/uploads/2024/05/men-stand-watch-mountains-tropical-forests-with-backpacks-forest-adventure-traveling-climbing-1536x1024.jpg"
                    alt="Mountain Adventure"
                    width={1536}
                    height={1024}
                    className="w-full h-48 md:h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Scenic travel */}
                <div className="relative rounded-xl overflow-hidden shadow-xl group">
                  <Image 
                    src="https://tuckertrips.com/wp-content/uploads/2024/05/young-girl-travels-high-mountain-vang-vieng-laos-scaled.jpg"
                    alt="Scenic Journey"
                    width={2560}
                    height={1707}
                    className="w-full h-48 md:h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-2xl border-4 border-[#ff34ac]/30 animate-float-slow">
                <Image 
                  src="https://tuckertrips.com/wp-content/uploads/2024/05/cropped-Tucker-270x270.png"
                  alt="Tucker Logo"
                  width={270}
                  height={270}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={`text-center ${visibleElements['founder-journey'] ? 'animate-in-up stagger-4' : 'opacity-0'}`}>
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-[#ff34ac]/10 via-white to-[#7dbbe5]/10 px-8 py-6 rounded-2xl border-2 border-gray-200 shadow-xl">
              <p className="text-gray-700 text-lg font-medium">
                Ready to plan with people you actually know?
              </p>
              <Button
                onClick={onShowAuth}
                size="lg"
                className="bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white shadow-lg hover:shadow-xl transition-all"
              >
                Log a Trip
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Optimized Spacing */}
      <section
        className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
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

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 sm:py-8 px-4 text-center text-xs sm:text-sm text-gray-500">
        <div className="max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="https://ugxzjmzrmvbnhfejwjse.supabase.co/storage/v1/object/sign/stoi/cropped-Tucker-180x180.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYmE5N2E1ZS04YmMzLTQzODQtYWYyZS1kMzg4MDFjNTY2ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9pL2Nyb3BwZWQtVHVja2VyLTE4MHgxODAucG5nIiwiaWF0IjoxNzYyMzgwNjEwLCJleHAiOjE3OTM5MTY2MTB9.nN6jPsTnHqoHTrJ5oDlYjrscPdkCW5Jrwjlpy-CUyrM"
              alt="Tucker Trips Logo"
              width={180}
              height={180}
              className="h-12 sm:h-16 w-auto"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          </div>
          <p className="text-gray-600 mb-3">
            &copy; {new Date().getFullYear()} Tucker Trips. Plan smarter. Travel better. Live fully.
          </p>
          <p className="text-[#ff34ac] font-medium mb-4">
            Occasional, useful, zero fluff—trip checklists and 'wish-I-knew' notes.
          </p>
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-[#ff34ac] transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#ff34ac] transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[#ff34ac] transition">Contact Us</Link>
            <Link href="/help" className="hover:text-[#ff34ac] transition">Help Center</Link>
          </div>
        </div>
      </footer>

      {/* Welcome Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border border-gray-200 bg-white text-gray-900 backdrop-blur-xl shadow-xl mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-900">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff34ac]" />
              Your circle is waiting
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-gray-600">
              Log what future-you will forget: links, prices, timings, and those tiny hacks.
              Your circle only. No internet strangers.
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
              Start a Trip
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
