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
        <p className="text-[#e5dbf1] text-sm md:text-base font-normal mb-8 leading-relaxed">
          Document every detail of your journey in one beautiful place. From flight bookings and hotel reservations to restaurant recommendations and hidden gems, Tucker Trips helps you organize all the essential information that makes your trip memorable. Never lose track of confirmation numbers, addresses, or those perfect spots you discovered along the way.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format"
            alt="Flight planning"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#ff34ac]/20 border border-white/10"
          />
          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format"
            alt="Hotel booking"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#ff34ac]/20 border border-white/10"
          />
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format"
            alt="Restaurant experiences"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#ff34ac]/20 border border-white/10"
          />
          <img
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800&auto=format"
            alt="Local discoveries"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#ff34ac]/20 border border-white/10"
          />
        </div>
      </div>
    ),
  },
  {
    title: "SHARE YOUR TRIP",
    content: (
      <div>
        <p className="text-[#e5dbf1] text-sm md:text-base font-normal mb-8 leading-relaxed">
          Your adventures deserve an audience! Share your meticulously planned itineraries with friends and family, or make them public to inspire fellow travelers. Collaborate in real-time with your travel companions, exchange tips, and build excitement together. Tucker Trips transforms solo planning into a shared experience, making every journey a collective adventure.
        </p>
        <div className="mb-8">
          <div className="flex gap-2 items-center text-[#e5dbf1] text-sm md:text-base mb-3">
            <Share2 className="h-5 w-5 text-[#ff34ac]" />
            Public or private sharing options
          </div>
          <div className="flex gap-2 items-center text-[#e5dbf1] text-sm md:text-base mb-3">
            <Users className="h-5 w-5 text-[#ff34ac]" />
            Real-time collaboration with travel buddies
          </div>
          <div className="flex gap-2 items-center text-[#e5dbf1] text-sm md:text-base mb-3">
            <MessageCircle className="h-5 w-5 text-[#ff34ac]" />
            Built-in chat for seamless communication
          </div>
          <div className="flex gap-2 items-center text-[#e5dbf1] text-sm md:text-base mb-3">
            <Stars className="h-5 w-5 text-[#ff34ac]" />
            Inspire others with your travel stories
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=800&auto=format"
            alt="Group travel"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#7dbbe5]/20 border border-white/10"
          />
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format"
            alt="Travel community"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#7dbbe5]/20 border border-white/10"
          />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format"
            alt="Collaboration"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#7dbbe5]/20 border border-white/10"
          />
          <img
            src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=800&auto=format"
            alt="Shared experiences"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#7dbbe5]/20 border border-white/10"
          />
        </div>
      </div>
    ),
  },
  {
    title: "LESSONS LEARNED",
    content: (
      <div>
        <p className="text-[#e5dbf1] text-sm md:text-base font-normal mb-8 leading-relaxed">
          Every trip teaches us something new. Capture the wisdom gained from your adventures—what worked brilliantly, what you&apos;d do differently, and the unexpected discoveries that made your journey special. Build your personal travel knowledge base that grows with each adventure. Learn from your network&apos;s experiences and skip the trial-and-error phase. Tucker Trips helps you become a smarter traveler with every voyage.
        </p>
        <div className="mb-8">
          <div className="flex gap-2 items-start text-[#e5dbf1] text-sm md:text-base mb-4">
            <span className="text-[#ff34ac] font-bold">💡</span>
            <div>
              <strong className="text-white">Pro Tips:</strong> Document what worked and what didn&apos;t for future reference
            </div>
          </div>
          <div className="flex gap-2 items-start text-[#e5dbf1] text-sm md:text-base mb-4">
            <span className="text-[#7dbbe5] font-bold">🎯</span>
            <div>
              <strong className="text-white">Smart Planning:</strong> Learn from your network instead of anonymous reviews
            </div>
          </div>
          <div className="flex gap-2 items-start text-[#e5dbf1] text-sm md:text-base mb-4">
            <span className="text-[#ff34ac] font-bold">📈</span>
            <div>
              <strong className="text-white">Continuous Growth:</strong> Build travel expertise with each journey
            </div>
          </div>
          <div className="flex gap-2 items-start text-[#e5dbf1] text-sm md:text-base mb-4">
            <span className="text-[#7dbbe5] font-bold">🌟</span>
            <div>
              <strong className="text-white">Hidden Gems:</strong> Preserve those unexpected discoveries for your next visit
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format"
            alt="Beach reflection"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#ff34ac]/20 border border-white/10"
          />
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format"
            alt="Mountain lessons"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#ff34ac]/20 border border-white/10"
          />
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format"
            alt="Travel wisdom"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#ff34ac]/20 border border-white/10"
          />
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format"
            alt="Journey insights"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-2xl shadow-[#ff34ac]/20 border border-white/10"
          />
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
    <div className="relative min-h-screen overflow-hidden bg-[#343f65] text-white">
      <style>{animationStyles}</style>
      
      {/* Animated background particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,52,172,0.15),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-1/2 bg-[radial-gradient(circle_at_center,_rgba(125,187,229,0.2),_transparent_65%)] blur-3xl" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#343f65]/80 backdrop-blur-xl">
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
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#e5dbf1]">
              <button className="transition hover:text-white hover:text-[#ff34ac]">Features</button>
              <button className="transition hover:text-white hover:text-[#ff34ac]">Community</button>
              <button className="transition hover:text-white hover:text-[#ff34ac]">About</button>
            </nav>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden sm:flex space-x-2">
                <Button
                  onClick={onShowAuth}
                  variant="ghost"
                  size="sm"
                  className="backdrop-blur-md border border-white/10 bg-white/10 text-white shadow-lg shadow-[#7dbbe5]/30 transition hover:border-[#ff34ac]/60 hover:bg-[#ff34ac]/10 text-xs sm:text-sm"
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
                className="sm:hidden p-2 text-white hover:text-[#ff34ac] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 bg-[#343f65]/95 backdrop-blur-xl">
            <nav className="flex flex-col space-y-2 p-4">
              <button className="text-left px-4 py-3 text-[#e5dbf1] hover:text-white hover:bg-white/5 rounded-lg transition">
                Features
              </button>
              <button className="text-left px-4 py-3 text-[#e5dbf1] hover:text-white hover:bg-white/5 rounded-lg transition">
                Community
              </button>
              <button className="text-left px-4 py-3 text-[#e5dbf1] hover:text-white hover:bg-white/5 rounded-lg transition">
                About
              </button>
              <div className="flex flex-col space-y-2 pt-2 border-t border-white/10">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onShowAuth()
                  }}
                  variant="ghost"
                  className="w-full justify-start border border-white/10 bg-white/10 text-white hover:border-[#ff34ac]/60 hover:bg-[#ff34ac]/10"
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
      <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#343f65]/50 to-[#343f65]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,52,172,0.08),transparent_50%)]" />
          <div className="animate-shimmer absolute -top-32 left-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-[#ff34ac]/40 via-[#7dbbe5]/30 to-[#ff34ac]/40 blur-3xl" />
          <div className="animate-glow absolute bottom-0 left-0 h-60 w-60 rounded-full bg-[#ff34ac]/30 blur-[90px]" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto">
          {/* Floating Demo Cards */}
          <div className="absolute inset-0 w-full h-full perspective">
            {/* Top Left Card */}
            <div
              className={`absolute -top-20 -left-12 w-72 h-48 rounded-2xl bg-white/5 backdrop-blur-md p-4 transform hover:scale-105 transition duration-500 cursor-pointer group ${visibleElements['hero-card-1'] ? 'animate-float-slow' : ''}`}
              id="hero-card-1"
              ref={(el) => {
                if (el) elementsRef.current['hero-card-1'] = el
              }}
              style={{ animation: `floatParticle 8s ease-in-out infinite`, animationDelay: '0s' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#7dbbe5] flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Flight Booking</p>
                  <p className="text-xs text-[#e5dbf1]">Seamless flight planning</p>
                </div>
              </div>
              <div className="w-full h-24 bg-gradient-to-br from-[#ff34ac]/30 to-[#7dbbe5]/30 rounded-lg overflow-hidden group-hover:opacity-80 transition">
                <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&auto=format" alt="Flight" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm">
                <button className="px-4 py-2 bg-[#ff34ac] text-white rounded-full text-sm font-semibold hover:bg-[#ff34ac]/90">See live</button>
              </div>
            </div>

            {/* Top Right Card */}
            <div
              className={`absolute -top-32 -right-8 w-80 h-52 rounded-2xl bg-white/5 backdrop-blur-md p-4 will-change-transform hover:scale-105 transition-transform duration-700 ease-out cursor-pointer group ${visibleElements['hero-card-2'] ? 'animate-float-slow' : ''}`}
              id="hero-card-2"
              ref={(el) => {
                if (el) elementsRef.current['hero-card-2'] = el
              }}
              style={{ animation: `floatCard 10s cubic-bezier(0.4, 0, 0.2, 1) infinite`, animationDelay: '1s' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7dbbe5] to-[#ff34ac] flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Photo Memories</p>
                  <p className="text-xs text-[#e5dbf1]">Capture every moment</p>
                </div>
              </div>
              <div className="w-full h-28 bg-gradient-to-br from-[#7dbbe5]/30 to-[#ff34ac]/30 rounded-lg overflow-hidden group-hover:opacity-80 transition">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format" alt="Memory" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm">
                <button className="px-4 py-2 bg-[#ff34ac] text-white rounded-full text-sm font-semibold hover:bg-[#ff34ac]/90">See live</button>
              </div>
            </div>

            {/* Bottom Left Card */}
            <div
              className={`absolute -bottom-16 -left-16 w-64 h-44 rounded-2xl bg-white/5 backdrop-blur-md p-4 transform hover:scale-105 transition duration-500 cursor-pointer group ${visibleElements['hero-card-3'] ? 'animate-float-slow' : ''}`}
              id="hero-card-3"
              ref={(el) => {
                if (el) elementsRef.current['hero-card-3'] = el
              }}
              style={{ animation: `floatParticle 9s ease-in-out infinite`, animationDelay: '2s' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#7dbbe5] flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Collaborate</p>
                  <p className="text-xs text-[#e5dbf1]">Plan together</p>
                </div>
              </div>
              <div className="w-full h-20 bg-gradient-to-br from-[#ff34ac]/30 to-[#7dbbe5]/30 rounded-lg overflow-hidden group-hover:opacity-80 transition">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format" alt="Collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm">
                <button className="px-4 py-2 bg-[#ff34ac] text-white rounded-full text-sm font-semibold hover:bg-[#ff34ac]/90">See live</button>
              </div>
            </div>

            {/* Bottom Right Card */}
            <div
              className={`absolute -bottom-20 -right-12 w-72 h-48 rounded-2xl bg-white/5 backdrop-blur-md p-4 transform hover:scale-105 transition duration-500 cursor-pointer group ${visibleElements['hero-card-4'] ? 'animate-float-slow' : ''}`}
              id="hero-card-4"
              ref={(el) => {
                if (el) elementsRef.current['hero-card-4'] = el
              }}
              style={{ animation: `floatParticle 11s ease-in-out infinite`, animationDelay: '0.5s' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7dbbe5] to-[#ff34ac] flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Share Stories</p>
                  <p className="text-xs text-[#e5dbf1]">Document adventures</p>
                </div>
              </div>
              <div className="w-full h-20 bg-gradient-to-br from-[#7dbbe5]/30 to-[#ff34ac]/30 rounded-lg overflow-hidden group-hover:opacity-80 transition">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format" alt="Stories" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm">
                <button className="px-4 py-2 bg-[#ff34ac] text-white rounded-full text-sm font-semibold hover:bg-[#ff34ac]/90">See live</button>
              </div>
            </div>
          </div>

          {/* Central Hero Card */}
          <div
            className={`relative z-10 mx-auto max-w-2xl text-center ${visibleElements['hero-center'] ? 'animate-scale-in' : 'opacity-0'}`}
            id="hero-center"
            ref={(el) => {
              if (el) elementsRef.current['hero-center'] = el
            }}
          >
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-8 sm:p-12 shadow-2xl shadow-[#ff34ac]/20">
              {/* Tucker Logo */}
              <div className={`flex justify-center mb-6 ${visibleElements['hero-center'] ? 'animate-in-up stagger-1' : 'opacity-0'}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F58d6334510b64a3ba328208823c50014%2F1ab2aa9dfe9749deb69cc85a9ee54327?format=webp&width=800"
                  alt="Tucker Trips Logo"
                  className="h-24 w-auto"
                />
              </div>

              {/* Title */}
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 ${visibleElements['hero-center'] ? 'animate-in-up stagger-2' : 'opacity-0'}`}
              >
                Welcome to Tucker Trips
              </h1>

              {/* Subtitle */}
              <p
                className={`text-base sm:text-lg text-[#e5dbf1] mb-8 max-w-xl mx-auto ${visibleElements['hero-center'] ? 'animate-in-up stagger-3' : 'opacity-0'}`}
              >
                <span className="bg-gradient-to-r from-[#ff34ac] via-[#e5dbf1] to-[#7dbbe5] bg-clip-text text-transparent">
                  Experience the world, one voyage at a time.
                </span>
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center ${visibleElements['hero-center'] ? 'animate-in-up stagger-4' : 'opacity-0'}`}
              >
                <Button
                  onClick={onShowAuth}
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white font-semibold shadow-lg shadow-[#ff34ac]/40 hover:shadow-[#ff34ac]/60 hover:-translate-y-1 transition duration-300 text-base"
                >
                  <ShinyText text="Start Planning Free" speed={2.2} />
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <button
                  onClick={onShowAuth}
                  className="rounded-full border-2 border-white/20 bg-white/5 px-8 py-3 text-white font-semibold hover:border-[#ff34ac]/60 hover:bg-[#ff34ac]/10 transition duration-300"
                >
                  View Demo
                </button>
              </div>

              {/* Metrics */}
              <div
                className={`mt-12 grid grid-cols-3 gap-4 ${visibleElements['hero-center'] ? 'animate-in-up stagger-5' : 'opacity-0'}`}
              >
                {highlightMetrics.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
                    <p className="text-xs sm:text-sm text-[#e5dbf1] uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section 
        className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#343f65] to-[#343f65]/95"
        id="video-section"
        ref={(el) => {
          if (el) elementsRef.current['video-section'] = el
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,52,172,0.15),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className={`text-center mb-8 sm:mb-12 ${visibleElements['video-section'] ? 'animate-in-up' : 'opacity-0'}`}>
            <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#7dbbe5]">Experience</p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white px-4">
              See Tucker Trips in Action
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#e5dbf1] px-4 max-w-2xl mx-auto">
              Watch how easy it is to plan your perfect adventure
            </p>
          </div>
          
          <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#ff34ac]/30 shadow-[0_20px_60px_rgba(255,52,172,0.3)] bg-[#343f65]/50 backdrop-blur-sm transition duration-500 hover:border-[#ff34ac]/60 hover:shadow-[0_20px_80px_rgba(255,52,172,0.5)] cursor-pointer ${visibleElements['video-section'] ? 'animate-scale-in stagger-2' : 'opacity-0'}`}>
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
      <section className="relative bg-[#343f65]">
        <Timeline data={timelineData} />
      </section>

      {/* Global Travelers Community Section with Globe */}
      <section 
        className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#343f65] to-[#2a3454]"
        id="globe-section"
        ref={(el) => {
          if (el) elementsRef.current['globe-section'] = el
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(125,187,229,0.15),_transparent_65%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className={`text-center mb-12 sm:mb-16 ${visibleElements['globe-section'] ? 'animate-in-up' : 'opacity-0'}`}>
            <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#7dbbe5]">Community</p>
            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white px-4">
              <span className="bg-gradient-to-r from-[#ff34ac] via-white to-[#7dbbe5] bg-clip-text text-transparent">
                Travelers Around the World
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#e5dbf1] px-4 max-w-2xl mx-auto">
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
              <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                Built by a Traveler, for Travelers
              </h3>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="group relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 hover:border-[#ff34ac]/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,52,172,0.3)]">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#ff34ac]/30 group-hover:border-[#ff34ac]/60 transition-all">
                      <img
                        src="https://ugxzjmzrmvbnhfejwjse.supabase.co/storage/v1/object/sign/stoi/Me-and-Tucker-2-1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYmE5N2E1ZS04YmMzLTQzODQtYWYyZS1kMzg4MDFjNTY2ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9pL01lLWFuZC1UdWNrZXItMi0xLmpwZyIsImlhdCI6MTc2MjE5MjYxMiwiZXhwIjoxNzkzNzI4NjEyfQ.NtQT70gQB0V0oFH4n0-Vb96ZACFFXOSSS4rY5hwYtYM"
                        alt="Kristin Stein - Founder"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2">Kristin Stein</h4>
                  <p className="text-sm text-[#ff34ac] mb-6 uppercase tracking-wider">Founder</p>
                  
                  <div className="text-left max-w-2xl">
                    <h5 className="text-lg sm:text-xl font-semibold text-white mb-4">Why I Founded Tucker Trips</h5>
                    <p className="text-sm sm:text-base text-[#e5dbf1] leading-relaxed mb-4">
                      I started Tucker Trips after becoming frustrated with the endless search for reviews from strangers while trying to plan the perfect family vacation. As someone who loves exploring new places, I believe in the value of being well-informed before setting out on any adventure.
                    </p>
                    <p className="text-sm sm:text-base text-[#e5dbf1] leading-relaxed">
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
      <footer className="border-t border-white/10 bg-[#343f65]/95 py-6 sm:py-8 px-4 text-center text-xs sm:text-sm text-white/60">
        <div className="max-w-7xl mx-auto">
          {/* Logo Animation */}
          <div className="flex justify-center mb-4">
            <img
              src="https://ugxzjmzrmvbnhfejwjse.supabase.co/storage/v1/object/sign/stoi/Untitled%20(Logo).gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYmE5N2E1ZS04YmMzLTQzODQtYWYyZS1kMzg4MDFjNTY2ZTQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9pL1VudGl0bGVkIChMb2dvKS5naWYiLCJpYXQiOjE3NjIxOTIwODMsImV4cCI6MTc5MzcyODA4M30.5N-G57YWF2rv8vjQ9QxjUqZj0dNdDzmOa7tuqJG2ffc"
              alt="Tucker Trips Logo"
              className="h-12 sm:h-16 w-auto"
            />
          </div>
          <p>
            &copy; {new Date().getFullYear()} Tucker Trips. Plan smarter. Travel better. Live fully.
          </p>
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/50">
            <button className="hover:text-[#ff34ac] transition">Privacy Policy</button>
            <button className="hover:text-[#ff34ac] transition">Terms of Service</button>
            <button className="hover:text-[#ff34ac] transition">Contact Us</button>
            <button className="hover:text-[#ff34ac] transition">Help Center</button>
          </div>
        </div>
      </footer>

      {/* Welcome Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border border-[#ff34ac]/30 bg-[#343f65]/95 text-white backdrop-blur-xl mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-white">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff34ac]" />
              Welcome to Tucker Trips
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[#e5dbf1]">
              Start planning your dream trip today. Create detailed itineraries, collaborate with friends,
              and make every journey unforgettable.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 sm:mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                setDialogOpen(false)
                onShowAuth?.()
              }}
              className="flex-1 bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white shadow-lg shadow-[#ff34ac]/30 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Get Started Free
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="flex-1 border border-white/10 bg-white/5 text-white/80 transition hover:border-[#7dbbe5]/60 hover:bg-[#7dbbe5]/10 hover:text-white text-sm sm:text-base"
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
