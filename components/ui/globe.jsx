"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe from "cobe"
import { useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

// User avatars that will pop up on the globe
const GLOBE_MARKERS = [
  { location: [40.7128, -74.006], size: 0.08, name: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format" }, // New York
  { location: [51.5074, -0.1278], size: 0.08, name: "David", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format" }, // London
  { location: [35.6762, 139.6503], size: 0.08, name: "Yuki", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format" }, // Tokyo
  { location: [-33.8688, 151.2093], size: 0.08, name: "Emma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format" }, // Sydney
  { location: [48.8566, 2.3522], size: 0.08, name: "Pierre", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format" }, // Paris
  { location: [1.3521, 103.8198], size: 0.08, name: "Wei", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format" }, // Singapore
  { location: [19.4326, -99.1332], size: 0.08, name: "Maria", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=400&auto=format" }, // Mexico City
  { location: [-23.5505, -46.6333], size: 0.08, name: "Carlos", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format" }, // São Paulo
  { location: [55.7558, 37.6176], size: 0.08, name: "Olga", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format" }, // Moscow
  { location: [25.2048, 55.2708], size: 0.08, name: "Ahmed", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=400&auto=format" }, // Dubai
]

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.4,
  diffuse: 0.8,
  mapSamples: 16000,
  mapBrightness: 2.5,
  baseColor: [0.2, 0.2, 0.3],
  markerColor: [255 / 255, 52 / 255, 172 / 255],
  glowColor: [0.3, 0.5, 0.8],
  markers: GLOBE_MARKERS.map(m => ({ location: m.location, size: m.size })),
}

export function Globe({ className, config = GLOBE_CONFIG }) {
  let phi = 0
  let width = 0
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [visibleAvatars, setVisibleAvatars] = useState([])

  const r = useSpring(0, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005
        state.phi = phi + r.get()
        state.width = width * 2
        state.height = width * 2

        // Calculate which avatars should be visible based on rotation
        const currentPhi = state.phi
        const visible = GLOBE_MARKERS.map((marker, index) => {
          const [lat, lng] = marker.location
          const markerPhi = (lng * Math.PI) / 180
          const markerTheta = ((90 - lat) * Math.PI) / 180
          
          // Calculate if marker is on the visible side of the globe
          const phiDiff = ((markerPhi - currentPhi + Math.PI) % (2 * Math.PI)) - Math.PI
          const isVisible = Math.abs(phiDiff) < Math.PI / 2
          
          if (isVisible) {
            // Calculate 2D position on canvas
            const x = 50 + (phiDiff / Math.PI) * 50
            const y = 50 + ((markerTheta - Math.PI / 2) / Math.PI) * 40
            
            return {
              ...marker,
              x,
              y,
              opacity: Math.cos(phiDiff) * 0.8 + 0.2,
              index,
            }
          }
          return null
        }).filter(Boolean)

        setVisibleAvatars(visible)
      },
    })

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 100)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [config])

  return (
    <div className={cn("relative mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) => {
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
      
      {/* Avatar overlays */}
      {visibleAvatars.map((avatar) => (
        <div
          key={avatar.index}
          className="absolute pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: `${avatar.x}%`,
            top: `${avatar.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: avatar.opacity,
          }}
        >
          <div className="relative group">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-[#ff34ac] opacity-30 animate-ping" />
            
            {/* Avatar image */}
            <div className="relative w-12 h-12 rounded-full border-2 border-[#ff34ac] overflow-hidden bg-white shadow-lg shadow-[#ff34ac]/30 transform group-hover:scale-110 transition-transform">
              <img
                src={avatar.avatar}
                alt={avatar.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Name tooltip */}
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#343f65]/95 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[#ff34ac]/30">
              {avatar.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
