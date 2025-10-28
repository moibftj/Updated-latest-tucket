'use client'

import { useEffect, useMemo, useState } from 'react'
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
    title: 'Smart Itinerary Builder',
    subtitle: 'Organize flights, accommodations, and activities with our intuitive trip planner. Everything synced and accessible.',
    icon: Calendar,
  },
  {
    title: 'Real-Time Collaboration',
    subtitle: 'Plan together with friends and family. Share trips, get instant updates, and chat live while coordinating.',
    icon: Share2,
  },
  {
    title: 'Travel Community',
    subtitle: 'Discover public trips, get inspiration from fellow travelers, and share your adventures with the world.',
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

const LandingPage = ({ onShowAuth }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pulseCta, setPulseCta] = useState(false)

  useEffect(() => {
    const dialogTimer = setTimeout(() => setDialogOpen(true), 3000)
    const ctaTimer = setTimeout(() => setPulseCta(true), 4500)

    return () => {
      clearTimeout(dialogTimer)
      clearTimeout(ctaTimer)
    }
  }, [])

  const animationStyles = useMemo(
    () => `
      @keyframes floatSlow {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-12px); }
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

      .animate-float-slow { animation: floatSlow 9s ease-in-out infinite; }
      .animate-glow { animation: glowPulse 6s ease-in-out infinite; }
      .animate-shimmer { animation: shimmerSoft 14s linear infinite; background-size: 300% 300%; }
      .animate-pulse-ring { animation: pulseRing 3.6s ease-in-out infinite; }
    `,
    []
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#343f65] text-white">
      <style>{animationStyles}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,52,172,0.15),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-1/2 bg-[radial-gradient(circle_at_center,_rgba(125,187,229,0.2),_transparent_65%)] blur-3xl" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#343f65]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Logo Animation Video */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#ff34ac] via-[#7dbbe5] to-[#e5dbf1] p-0.5 shadow-lg glow-tt-pink">
                <div className="rounded-[10px] overflow-hidden bg-[#343f65] w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ mixBlendMode: 'screen' }}
                  >
                    <source src="https://customer-assets.emergentagent.com/job_8205aa99-9784-4880-8173-eca98cfaee03/artifacts/e6r0jceo_logo%20animation%2012%20%28edited%29%20%281%29.webm" type="video/webm" />
                  </video>
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">Tucker Trips</h1>
                <p className="text-xs sm:text-sm text-[#e5dbf1] hidden sm:block">Plan, Share, Explore</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-purple-100">
              <button className="transition hover:text-white">Features</button>
              <button className="transition hover:text-white">Community</button>
              <button className="transition hover:text-white">About</button>
            </nav>
            <div className="flex space-x-2 sm:space-x-3">
              <Button
                onClick={onShowAuth}
                variant="ghost"
                size="sm"
                className="backdrop-blur-md border border-white/10 bg-white/10 text-white shadow-lg shadow-purple-900/40 transition hover:border-pink-500/60 hover:bg-pink-500/10 text-xs sm:text-sm"
              >
                <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Login
              </Button>
              <Button
                onClick={onShowAuth}
                size="sm"
                className="bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400 text-white shadow-lg shadow-pink-500/40 transition hover:shadow-pink-500/60 text-xs sm:text-sm"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-shimmer absolute -top-32 left-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-pink-500/60 via-purple-500/40 to-pink-500/60 blur-3xl" />
          <div className="animate-glow absolute bottom-0 left-0 h-60 w-60 rounded-full bg-pink-500/40 blur-[90px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-pink-200 shadow-[0_8px_35px_rgba(236,72,153,0.25)] backdrop-blur">
              <Stars className="h-3 w-3 sm:h-4 sm:w-4" />
              Your Journey Starts Here
            </div>

            <div className="space-y-4 sm:space-y-5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                Plan Your Dream Trip.
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-pink-200 via-white to-pink-200 bg-clip-text text-transparent">
                  Share Every Moment.
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-purple-100/80 lg:mx-0">
                The ultimate travel planning platform for modern adventurers. Create detailed itineraries,
                collaborate with friends, and turn every trip into an unforgettable story.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                onClick={onShowAuth}
                size="lg"
                className={`w-full sm:w-auto relative flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 px-6 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold text-white shadow-[0_20px_40px_rgba(236,72,153,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(236,72,153,0.35)] ${pulseCta ? 'animate-pulse-ring' : ''}`}
              >
                <ShinyText text="Start Planning Free" speed={2.2} />
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <button
                onClick={onShowAuth}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 sm:px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-pink-400/60 hover:text-white"
              >
                View Demo
                <Camera className="h-4 w-4 transition group-hover:text-pink-300" />
              </button>
            </div>

            <div className="grid gap-4 sm:gap-6 pt-4 sm:pt-6 text-left grid-cols-1 sm:grid-cols-3">
              {highlightMetrics.map(({ icon: Icon, label, value, blurb }) => (
                <div
                  key={label}
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 transition duration-300 hover:-translate-y-1 hover:border-pink-400/50 hover:bg-pink-500/10"
                >
                  <div className="mb-3 sm:mb-4 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-200">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/60">{label}</p>
                  <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs sm:text-sm text-white/70">{blurb}</p>
                  <span className="pointer-events-none absolute -right-8 bottom-0 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-pink-500/20 blur-3xl" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="animate-float-slow pointer-events-none absolute -top-12 left-10 hidden h-28 w-28 rounded-full bg-gradient-to-br from-pink-500/40 to-purple-500/30 blur-3xl md:block" />
            <div className="scale-75 sm:scale-90 md:scale-100">
              <Stack cardsData={heroImages} cardDimensions={{ width: 300, height: 360 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Grid */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.1),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-pink-200/70">Integrations</p>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white px-4">
            Seamlessly connect with your favorite travel platforms
          </h2>
          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
            {partnerLogos.map((name) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-4 py-6 sm:px-6 sm:py-8 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/70 transition duration-300 hover:-translate-y-1 hover:border-pink-400/60 hover:text-white"
              >
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-pink-500/30 via-transparent to-pink-500/30" />
                </div>
                <span className="relative">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 sm:gap-10 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur">
          <div className="flex flex-col gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-pink-200/70">Features</p>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                Everything you need for the perfect trip
              </h2>
            </div>
            <Button
              variant="ghost"
              onClick={onShowAuth}
              className="rounded-full border border-white/20 bg-white/5 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white/80 transition hover:border-pink-400/60 hover:bg-pink-500/10 hover:text-white"
            >
              Explore Dashboard
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            {experienceHighlights.map(({ title, subtitle, icon: Icon }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#150226]/70 p-5 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-400/60"
              >
                <div className="mb-4 sm:mb-5 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/20 text-pink-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/70">{subtitle}</p>
                <div className="pointer-events-none absolute -bottom-10 right-0 h-28 w-28 rounded-full bg-pink-500/20 blur-3xl transition duration-500 group-hover:bottom-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-pink-200/70">Powerful Tools</p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Built for every type of traveler
            </h2>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-400/50 hover:bg-pink-500/10"
              >
                <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-pink-500/20 text-pink-200">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-white/70">{description}</p>
                <span className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-pink-500/20 blur-3xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magic Bento Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent via-purple-900/40 to-purple-900/80" />
        <div className="relative mx-auto max-w-7xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white px-4">
            Interactive trip planning dashboard
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-purple-100/80 px-4">
            Organize your entire trip visually. Drag, drop, and arrange every detail with our intuitive interface.
          </p>
          <div className="mt-8 sm:mt-12 flex justify-center overflow-hidden">
            <div className="scale-75 sm:scale-90 md:scale-100">
              <MagicBento glowColor="236, 72, 153" enableTilt particleCount={16} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,7,100,0.55),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-pink-200/70">Testimonials</p>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-white px-4">
            Loved by travelers worldwide
          </h2>
          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
            {testimonials.map(({ name, role, quote, avatar }) => (
              <div
                key={name}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-pink-400/60"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={avatar}
                    alt={name}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/30 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/60">{role}</p>
                  </div>
                </div>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-white/80">{quote}</p>
                <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/20 blur-3xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-pink-900/50 to-transparent" />
        <div className="relative mx-auto max-w-3xl space-y-5 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white px-4">
            Ready to plan your next adventure?
          </h2>
          <p className="text-base sm:text-lg text-purple-100/80 px-4">
            Join thousands of travelers using Tucker Trips to create unforgettable journeys.
            Start planning for free today.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row px-4">
            <Button
              onClick={onShowAuth}
              size="lg"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400 px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold text-white shadow-[0_22px_50px_rgba(236,72,153,0.35)] transition hover:-translate-y-0.5"
            >
              <ShinyText text="Create Free Account" speed={2.4} />
            </Button>
            <Button
              variant="ghost"
              onClick={onShowAuth}
              className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-6 sm:px-8 py-4 text-sm sm:text-base text-white/80 transition hover:border-pink-400/60 hover:bg-pink-500/10 hover:text-white"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#080010] py-6 sm:py-8 px-4 text-center text-xs sm:text-sm text-white/60">
        <div className="max-w-7xl mx-auto">
          <p>
            &copy; {new Date().getFullYear()} Tucker Trips. Plan smarter. Travel better. Live fully.
          </p>
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/50">
            <button className="hover:text-pink-300 transition">Privacy Policy</button>
            <button className="hover:text-pink-300 transition">Terms of Service</button>
            <button className="hover:text-pink-300 transition">Contact Us</button>
            <button className="hover:text-pink-300 transition">Help Center</button>
          </div>
        </div>
      </footer>

      {/* Welcome Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border border-pink-500/30 bg-[#110122]/90 text-white backdrop-blur-xl mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-white">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-pink-300" />
              Welcome to Tucker Trips
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-white/70">
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
              className="flex-1 bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400 text-white shadow-lg shadow-pink-500/30 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Get Started Free
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="flex-1 border border-white/10 bg-white/5 text-white/80 transition hover:border-pink-400/60 hover:bg-pink-500/10 hover:text-white text-sm sm:text-base"
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
