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
} from 'lucide-react'
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

const partnerLogos = [
  'Wayfarer',
  'SkyPilot',
  'Atlas Co.',
  'Nomad Lab',
  'Compassly',
  'Voyagera',
]

const highlightMetrics = [
  {
    icon: Sparkles,
    label: 'Moments Captured',
    value: '120K+',
    blurb: 'Trip highlights and journals saved in Tucker Trips.',
  },
  {
    icon: Globe2,
    label: 'Countries Explored',
    value: '94',
    blurb: 'Shared experiences from the community around the globe.',
  },
  {
    icon: HeartPulse,
    label: 'Live Connections',
    value: '24/7',
    blurb: 'Friends planning together with live chat and presence.',
  },
]

const testimonials = [
  {
    name: 'Elena Rivers',
    role: 'Adventure Filmmaker',
    quote: '“Every itinerary detail lives in Tucker Trips now. The magic bento makes planning feel like art.”',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format',
  },
  {
    name: 'Marcus Chen',
    role: 'Remote Founder',
    quote: '“Our team off-sites used to be chaos. Shared boards and live chat keep everyone aligned instantly.”',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format',
  },
  {
    name: 'Sophia Mendes',
    role: 'Travel Concierge',
    quote: '“Clients love the interactive recaps. Tucker Trips turned memories into immersive storybooks.”',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format',
  },
]

const experienceHighlights = [
  {
    title: 'Moodboards that breathe',
    subtitle: 'Blend photos, voice notes, and route sketches with one drag.',
    icon: Camera,
  },
  {
    title: 'Segment-smart itineraries',
    subtitle: 'Flights, rooms, and transfers connect with intelligent reminders.',
    icon: MapPin,
  },
  {
    title: 'Collective planning',
    subtitle: 'Invite friends, set visibility, and co-curate moments in real time.',
    icon: Users,
  },
]

const LandingPage = ({ onShowAuth }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pulseCta, setPulseCta] = useState(false)

  useEffect(() => {
    const dialogTimer = setTimeout(() => setDialogOpen(true), 2600)
    const ctaTimer = setTimeout(() => setPulseCta(true), 4200)

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
    <div className="relative min-h-screen overflow-hidden bg-[#0b0016] text-white">
      <style>{animationStyles}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.18),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,_rgba(76,29,149,0.24),_transparent_65%)] blur-3xl" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#110122]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-gradient-to-br from-pink-500 via-pink-400 to-purple-500 p-2 shadow-lg shadow-pink-500/40">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-white">Tucker Trips</h1>
                <p className="text-sm text-pink-200/80">Build journeys that feel cinematic</p>
              </div>
            </div>
            <nav className="hidden items-center space-x-6 text-sm font-medium text-purple-100 md:flex">
              <button className="transition hover:text-white">Features</button>
              <button className="transition hover:text-white">Community</button>
              <button className="transition hover:text-white">Pricing</button>
              <button className="transition hover:text-white">Stories</button>
            </nav>
            <div className="flex space-x-3">
              <Button
                onClick={onShowAuth}
                variant="ghost"
                className="backdrop-blur-md border border-white/10 bg-white/10 text-white shadow-lg shadow-purple-900/40 transition hover:border-pink-500/60 hover:bg-pink-500/10"
              >
                <Users className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button
                onClick={onShowAuth}
                className="bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400 text-white shadow-lg shadow-pink-500/40 transition hover:shadow-pink-500/60"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-shimmer absolute -top-32 left-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-pink-500/60 via-purple-500/40 to-pink-500/60 blur-3xl" />
          <div className="animate-glow absolute bottom-0 left-0 h-60 w-60 rounded-full bg-pink-500/40 blur-[90px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-white/5 px-4 py-2 text-sm text-pink-200 shadow-[0_8px_35px_rgba(236,72,153,0.25)] backdrop-blur">
              <Stars className="h-4 w-4" />
              Curate unforgettable journeys
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
                Plan boldly.
                <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-pink-200 via-white to-pink-200 bg-clip-text text-transparent">
                  Remember forever.
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-purple-100/80 md:text-xl lg:mx-0">
                Tucker Trips stitches planning, coordination, and storytelling into one luminous canvas.
                Craft itineraries, chat live, and relive every highlight with cinematic flair.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                onClick={onShowAuth}
                size="lg"
                className={`relative flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 px-10 py-6 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(236,72,153,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(236,72,153,0.35)] ${pulseCta ? 'animate-pulse-ring' : ''}`}
              >
                <ShinyText text="Get Started" speed={2.2} />
                <ArrowRight className="h-5 w-5" />
              </Button>
              <button
                onClick={onShowAuth}
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-pink-400/60 hover:text-white"
              >
                Watch 90s demo
                <Camera className="h-4 w-4 transition group-hover:text-pink-300" />
              </button>
            </div>

            <div className="grid gap-6 pt-6 text-left md:grid-cols-3">
              {highlightMetrics.map(({ icon: Icon, label, value, blurb }) => (
                <div
                  key={label}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-pink-400/50 hover:bg-pink-500/10"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/60">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-sm text-white/70">{blurb}</p>
                  <span className="pointer-events-none absolute -right-8 bottom-0 h-24 w-24 rounded-full bg-pink-500/20 blur-3xl" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="animate-float-slow pointer-events-none absolute -top-12 left-10 hidden h-28 w-28 rounded-full bg-gradient-to-br from-pink-500/40 to-purple-500/30 blur-3xl md:block" />
            <Stack cardsData={heroImages} cardDimensions={{ width: 300, height: 360 }} />
          </div>
        </div>
      </section>

      {/* Partner Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.1),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-pink-200/70">Trusted by modern explorers</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            A vibrant community of planners, storytellers, and adventure brands
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {partnerLogos.map((name) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-sm font-semibold uppercase tracking-[0.25em] text-white/70 transition duration-300 hover:-translate-y-1 hover:border-pink-400/60 hover:text-white"
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
      <section className="relative py-14 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-col gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-pink-200/70">Experience design</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Interactive flows for every stage of your trip</h2>
            </div>
            <Button
              variant="ghost"
              onClick={onShowAuth}
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white/80 transition hover:border-pink-400/60 hover:bg-pink-500/10 hover:text-white"
            >
              Explore the dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {experienceHighlights.map(({ title, subtitle, icon: Icon }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#150226]/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-400/60"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/20 text-pink-100">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/70">{subtitle}</p>
                <div className="pointer-events-none absolute -bottom-10 right-0 h-28 w-28 rounded-full bg-pink-500/20 blur-3xl transition duration-500 group-hover:bottom-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magic Bento Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent via-purple-900/40 to-purple-900/80" />
        <div className="relative mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">The magic bento, now even more radiant</h2>
          <p className="mt-4 text-lg text-purple-100/80">
            Hover through segments to light up your planning canvas with a vibrant dark pink glow.
            Swap labels, reorder blocks, and let the micro-animations guide your flow.
          </p>
          <div className="mt-12 flex justify-center">
            <MagicBento glowColor="236, 72, 153" enableTilt particleCount={16} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,7,100,0.55),_transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-pink-200/70">Loved by creators</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Stories that keep glowing long after the trip ends</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map(({ name, role, quote, avatar }) => (
              <div
                key={name}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-pink-400/60"
              >
                <div className="flex items-center gap-4">
                  <img src={avatar} alt={name} className="h-12 w-12 rounded-full border border-white/30 object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">{role}</p>
                  </div>
                </div>
                <p className="mt-6 text-base text-white/80">{quote}</p>
                <div className="pointer-events-none absolute -right-10 top-0 h-36 w-36 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/20 blur-3xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-pink-900/50 to-transparent" />
        <div className="relative mx-auto max-w-3xl space-y-6">
          <h2 className="text-4xl font-semibold text-white md:text-5xl">Ready to illuminate your journeys?</h2>
          <p className="text-lg text-purple-100/80">
            Join the Tucker Trips community and turn every itinerary into a living memory. Share, collaborate, and keep the glow alive.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={onShowAuth}
              size="lg"
              className="rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400 px-10 py-6 text-lg font-semibold text-white shadow-[0_22px_50px_rgba(236,72,153,0.35)] transition hover:-translate-y-0.5"
            >
              <ShinyText text="Sign Up For Tucker Trips" speed={2.4} />
            </Button>
            <Button
              variant="ghost"
              onClick={onShowAuth}
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-white/80 transition hover:border-pink-400/60 hover:bg-pink-500/10 hover:text-white"
            >
              Preview dashboards
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#080010] py-8 px-4 text-center text-sm text-white/60">
        <p>
          &copy; {new Date().getFullYear()} Tucker Trips. Crafted for explorers, storytellers, and memory keepers.
        </p>
      </footer>

      {/* Early access dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border border-pink-500/30 bg-[#110122]/90 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-white">
              <Sparkles className="h-5 w-5 text-pink-300" />
              New: Curated vendor grid
            </DialogTitle>
            <DialogDescription className="text-sm text-white/70">
              Explore our refreshed partner showcase—discover boutique stays, experience curators, and travel studios that keep Tucker Trips glowing.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                setDialogOpen(false)
                onShowAuth?.()
              }}
              className="flex-1 bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400 text-white shadow-lg shadow-pink-500/30 hover:-translate-y-0.5"
            >
              Claim early access
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="flex-1 border border-white/10 bg-white/5 text-white/80 transition hover:border-pink-400/60 hover:bg-pink-500/10 hover:text-white"
            >
              Maybe later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LandingPage
