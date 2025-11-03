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
} from 'lucide-react'
import ShinyText from '@/components/ShinyText'
import Stack from '@/components/Stack'
import MagicBento from '@/components/MagicBento'

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

const LandingPage = ({ onShowAuth }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pulseCta, setPulseCta] = useState(false)
  const [scrollY, setScrollY] = useState(0)
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
              <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#ff34ac] via-[#7dbbe5] to-[#e5dbf1] p-0.5 shadow-lg hover:shadow-[0_0_30px_rgba(255,52,172,0.5)] transition-shadow duration-500">
                <div className="rounded-md overflow-hidden bg-[#343f65] w-32 h-12 sm:w-40 sm:h-14 flex items-center justify-center">
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
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#e5dbf1]">
              <button className="transition hover:text-white hover:text-[#ff34ac]">Features</button>
              <button className="transition hover:text-white hover:text-[#ff34ac]">Community</button>
              <button className="transition hover:text-white hover:text-[#ff34ac]">About</button>
            </nav>
            <div className="flex space-x-2 sm:space-x-3">
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
          </div>
        </div>
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
              className={`absolute -top-20 -left-12 w-72 h-48 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 transform hover:scale-105 transition duration-500 cursor-pointer group ${visibleElements['hero-card-1'] ? 'animate-float-slow' : ''}`}
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
              className={`absolute -top-32 -right-8 w-80 h-52 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 transform hover:scale-105 transition duration-500 cursor-pointer group ${visibleElements['hero-card-2'] ? 'animate-float-slow' : ''}`}
              id="hero-card-2"
              ref={(el) => {
                if (el) elementsRef.current['hero-card-2'] = el
              }}
              style={{ animation: `floatParticle 10s ease-in-out infinite`, animationDelay: '1s' }}
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
              className={`absolute -bottom-16 -left-16 w-64 h-44 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 transform hover:scale-105 transition duration-500 cursor-pointer group ${visibleElements['hero-card-3'] ? 'animate-float-slow' : ''}`}
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
              className={`absolute -bottom-20 -right-12 w-72 h-48 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 transform hover:scale-105 transition duration-500 cursor-pointer group ${visibleElements['hero-card-4'] ? 'animate-float-slow' : ''}`}
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
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-12 shadow-2xl shadow-[#ff34ac]/20">
              {/* Center Icon */}
              <div className={`flex justify-center mb-6 ${visibleElements['hero-center'] ? 'animate-in-up stagger-1' : 'opacity-0'}`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff34ac] to-[#7dbbe5] flex items-center justify-center shadow-lg shadow-[#ff34ac]/40">
                  <Globe2 className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Title */}
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 ${visibleElements['hero-center'] ? 'animate-in-up stagger-2' : 'opacity-0'}`}
              >
                Plan Your Dream Trip.
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#ff34ac] via-[#e5dbf1] to-[#7dbbe5] bg-clip-text text-transparent">
                  Share Every Moment.
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className={`text-base sm:text-lg text-[#e5dbf1] mb-8 max-w-xl mx-auto ${visibleElements['hero-center'] ? 'animate-in-up stagger-3' : 'opacity-0'}`}
              >
                The ultimate travel planning platform for modern adventurers. Create detailed itineraries, collaborate with friends, and turn every trip into an unforgettable story.
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

      {/* Partner Grid */}
      <section 
        className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#343f65] to-[#343f65]/95"
        id="partners-section"
        ref={(el) => {
          if (el) elementsRef.current['partners-section'] = el
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(125,187,229,0.12),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <div className={`${visibleElements['partners-section'] ? 'animate-in-up' : 'opacity-0'}`}>
            <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#7dbbe5]">Integrations</p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white px-4">
              Seamlessly connect with your favorite travel platforms
            </h2>
          </div>
          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
            {partnerLogos.map((name, idx) => (
              <div
                key={name}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-6 sm:px-6 sm:py-8 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/70 transition duration-300 hover:-translate-y-1 hover:border-[#ff34ac]/60 hover:text-white cursor-pointer ${visibleElements['partners-section'] ? 'animate-in-up' : 'opacity-0'}`}
                style={{
                  animation: visibleElements['partners-section'] ? `fadeInUp 0.8s ease-out ${0.05 + idx * 0.08}s forwards` : 'none',
                }}
              >
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-[#ff34ac]/30 via-transparent to-[#7dbbe5]/30" />
                </div>
                <span className="relative">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section 
        className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#343f65]"
        id="experience-section"
        ref={(el) => {
          if (el) elementsRef.current['experience-section'] = el
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e5dbf1]/5 to-transparent opacity-30" />
        <div className={`relative mx-auto flex max-w-6xl flex-col gap-6 sm:gap-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 ${visibleElements['experience-section'] ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="flex flex-col gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#7dbbe5]">Features</p>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                Everything you need for the perfect trip
              </h2>
            </div>
            <Button
              variant="ghost"
              onClick={onShowAuth}
              className="rounded-full border border-white/20 bg-white/5 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white/80 transition hover:border-[#ff34ac]/60 hover:bg-[#ff34ac]/10 hover:text-white"
            >
              Explore Dashboard
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            {experienceHighlights.map(({ title, subtitle, icon: Icon }, idx) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#343f65]/70 backdrop-blur-sm p-5 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ff34ac]/60 cursor-pointer ${visibleElements['experience-section'] ? 'animate-in-up' : 'opacity-0'}`}
                style={{
                  animation: visibleElements['experience-section'] ? `fadeInUp 0.8s ease-out ${0.1 + idx * 0.12}s forwards` : 'none',
                }}
              >
                <div className="mb-4 sm:mb-5 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff34ac]/30 to-[#7dbbe5]/20 text-[#e5dbf1] group-hover:scale-110 transition duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-[#e5dbf1]">{subtitle}</p>
                <div className="pointer-events-none absolute -bottom-10 right-0 h-28 w-28 rounded-full bg-[#ff34ac]/20 blur-3xl transition duration-500 group-hover:bottom-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section 
        className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#343f65] to-[#343f65]/90"
        id="features-section"
        ref={(el) => {
          if (el) elementsRef.current['features-section'] = el
        }}
      >
        <div className="relative mx-auto max-w-6xl">
          <div className={`text-center mb-8 sm:mb-12 ${visibleElements['features-section'] ? 'animate-in-up' : 'opacity-0'}`}>
            <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#7dbbe5]">Powerful Tools</p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Built for every type of traveler
            </h2>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, idx) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ff34ac]/50 hover:bg-[#ff34ac]/10 cursor-pointer ${visibleElements['features-section'] ? 'animate-in-up' : 'opacity-0'}`}
                style={{
                  animation: visibleElements['features-section'] ? `fadeInUp 0.8s ease-out ${0.1 + idx * 0.08}s forwards` : 'none',
                }}
              >
                <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#ff34ac]/20 text-[#e5dbf1] group-hover:scale-110 transition duration-300">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-[#e5dbf1]">{description}</p>
                <span className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-[#7dbbe5]/20 blur-3xl group-hover:right-0 transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magic Bento Section */}
      <section 
        className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#343f65]/90 to-[#343f65]"
        id="bento-section"
        ref={(el) => {
          if (el) elementsRef.current['bento-section'] = el
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent via-[#7dbbe5]/20 to-[#ff34ac]/30" />
        <div className="relative mx-auto max-w-7xl text-center">
          <div className={`${visibleElements['bento-section'] ? 'animate-in-up' : 'opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white px-4">
              Interactive trip planning dashboard
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#e5dbf1] px-4">
              Organize your entire trip visually. Drag, drop, and arrange every detail with our intuitive interface.
            </p>
          </div>
          <div className={`mt-8 sm:mt-12 flex justify-center overflow-hidden ${visibleElements['bento-section'] ? 'animate-scale-in stagger-2' : 'opacity-0'}`}>
            <div className="scale-75 sm:scale-90 md:scale-100">
              <MagicBento glowColor="255, 52, 172" enableTilt particleCount={16} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#343f65]"
        id="testimonials-section"
        ref={(el) => {
          if (el) elementsRef.current['testimonials-section'] = el
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(125,187,229,0.3),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <div className={`${visibleElements['testimonials-section'] ? 'animate-in-up' : 'opacity-0'}`}>
            <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#7dbbe5]">Testimonials</p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white px-4">
              Loved by travelers worldwide
            </h2>
          </div>
          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
            {testimonials.map(({ name, role, quote, avatar }, idx) => (
              <div
                key={name}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-[#ff34ac]/60 cursor-pointer group ${visibleElements['testimonials-section'] ? 'animate-in-up' : 'opacity-0'}`}
                style={{
                  animation: visibleElements['testimonials-section'] ? `fadeInUp 0.8s ease-out ${0.1 + idx * 0.12}s forwards` : 'none',
                }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={avatar}
                    alt={name}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[#7dbbe5]/30 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#7dbbe5]">{role}</p>
                  </div>
                </div>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-[#e5dbf1]">{quote}</p>
                <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-gradient-to-br from-[#ff34ac]/30 to-[#7dbbe5]/20 blur-3xl transition duration-500 group-hover:right-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="relative py-16 sm:py-20 md:py-24 px-4 text-center bg-gradient-to-b from-[#343f65] to-[#343f65]/80"
        id="cta-section"
        ref={(el) => {
          if (el) elementsRef.current['cta-section'] = el
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#7dbbe5]/30 via-[#ff34ac]/20 to-transparent" />
        <div className={`relative mx-auto max-w-3xl space-y-5 sm:space-y-6 ${visibleElements['cta-section'] ? 'animate-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white px-4">
            Ready to plan your next adventure?
          </h2>
          <p className="text-base sm:text-lg text-[#e5dbf1] px-4">
            Join thousands of travelers using Tucker Trips to create unforgettable journeys.
            Start planning for free today.
          </p>
          <div className={`flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row px-4 ${visibleElements['cta-section'] ? 'animate-in-up stagger-2' : 'opacity-0'}`}>
            <Button
              onClick={onShowAuth}
              size="lg"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold text-white shadow-[0_22px_50px_rgba(255,52,172,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_25px_60px_rgba(255,52,172,0.5)]"
            >
              <ShinyText text="Create Free Account" speed={2.4} />
            </Button>
            <Button
              variant="ghost"
              onClick={onShowAuth}
              className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 sm:px-8 py-4 text-sm sm:text-base text-white/80 transition hover:border-[#7dbbe5]/60 hover:bg-[#7dbbe5]/10 hover:text-white hover:scale-105 duration-300"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#343f65]/95 py-6 sm:py-8 px-4 text-center text-xs sm:text-sm text-white/60">
        <div className="max-w-7xl mx-auto">
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
