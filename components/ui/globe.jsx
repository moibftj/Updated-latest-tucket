"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe from "cobe"
import { useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400
const GLOBE_RADIUS = 300 // Base radius for calculations
const AVATAR_ORBIT_RADIUS = 380 // How far avatars float from center

// User avatars that will orbit around the globe
const GLOBE_MARKERS = [
  { location: [40.7128, -74.006], size: 0.08, name: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format", color: "#ff34ac" }, // New York
  { location: [51.5074, -0.1278], size: 0.08, name: "David", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format", color: "#7dbbe5" }, // London
  { location: [35.6762, 139.6503], size: 0.08, name: "Yuki", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format", color: "#ff34ac" }, // Tokyo
  { location: [-33.8688, 151.2093], size: 0.08, name: "Emma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format", color: "#7dbbe5" }, // Sydney
  { location: [48.8566, 2.3522], size: 0.08, name: "Pierre", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format", color: "#ff34ac" }, // Paris
  { location: [1.3521, 103.8198], size: 0.08, name: "Wei", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format", color: "#7dbbe5" }, // Singapore
  { location: [19.4326, -99.1332], size: 0.08, name: "Maria", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=400&auto=format", color: "#ff34ac" }, // Mexico City
  { location: [-23.5505, -46.6333], size: 0.08, name: "Carlos", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format", color: "#7dbbe5" }, // São Paulo
  { location: [55.7558, 37.6176], size: 0.08, name: "Olga", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format", color: "#ff34ac" }, // Moscow
  { location: [25.2048, 55.2708], size: 0.08, name: "Ahmed", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=400&auto=format", color: "#7dbbe5" }, // Dubai
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

  const r = useMotionValue(0)
  const rs = useSpring(r, {
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
        state.phi = phi + rs.get()
        state.width = width * 2
        state.height = width * 2

        // Calculate avatar positions in 3D space
        const currentPhi = state.phi
        const currentTheta = state.theta || 0.3
        
        const visible = GLOBE_MARKERS.map((marker, index) => {
          const [lat, lng] = marker.location
          
          // Convert lat/lng to spherical coordinates
          const markerPhi = (lng * Math.PI) / 180
          const markerTheta = ((90 - lat) * Math.PI) / 180
          
          // Calculate 3D position on sphere surface
          const x3d = Math.sin(markerTheta) * Math.cos(markerPhi)
          const y3d = Math.cos(markerTheta)
          const z3d = Math.sin(markerTheta) * Math.sin(markerPhi)
          
          // Rotate based on current globe rotation
          const rotatedX = x3d * Math.cos(currentPhi) - z3d * Math.sin(currentPhi)
          const rotatedY = y3d
          const rotatedZ = x3d * Math.sin(currentPhi) + z3d * Math.cos(currentPhi)
          
          // Check if on visible hemisphere (z > 0 means facing viewer)
          const isVisible = rotatedZ > -0.2
          
          if (isVisible) {
            // Project 3D to 2D with perspective
            const scale = AVATAR_ORBIT_RADIUS / (AVATAR_ORBIT_RADIUS + rotatedZ * 100)
            const x2d = 50 + (rotatedX * AVATAR_ORBIT_RADIUS * scale) / (width / 2) * 50
            const y2d = 50 + (rotatedY * AVATAR_ORBIT_RADIUS * scale) / (width / 2) * 50
            
            // Calculate size based on depth (perspective)
            const depth = (rotatedZ + 1) / 2 // Normalize to 0-1
            const size = 40 + depth * 40 // 40px to 80px
            
            // Calculate opacity based on depth
            const opacity = Math.max(0.3, depth * 1.2)
            
            return {
              ...marker,
              x: x2d,
              y: y2d,
              size,
              opacity,
              depth,
              index,
            }
          }
          return null
        }).filter(Boolean)
        
        // Sort by depth (back to front rendering)
        visible.sort((a, b) => a.depth - b.depth)

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
  }, [config, rs])

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
      
      {/* Floating Avatar Spheres */}
      {visibleAvatars.map((avatar) => (
        <div
          key={avatar.index}
          className="absolute pointer-events-auto transition-all duration-200 ease-out"
          style={{
            left: `${avatar.x}%`,
            top: `${avatar.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: avatar.opacity,
            zIndex: Math.round(avatar.depth * 100),
          }}
        >
          <div className="relative group cursor-pointer">
            {/* Outer glow ring */}
            <div 
              className="absolute inset-0 rounded-full blur-md animate-pulse"
              style={{
                width: `${avatar.size}px`,
                height: `${avatar.size}px`,
                background: `radial-gradient(circle, ${avatar.color}40, transparent 70%)`,
                transform: 'scale(1.5)',
              }}
            />
            
            {/* Animated border ring */}
            <div 
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                width: `${avatar.size}px`,
                height: `${avatar.size}px`,
                background: `conic-gradient(from 0deg, ${avatar.color}, transparent, ${avatar.color})`,
                padding: '2px',
                WebkitMask: 'radial-gradient(circle, transparent 45%, black 46%, black 48%, transparent 49%)',
                mask: 'radial-gradient(circle, transparent 45%, black 46%, black 48%, transparent 49%)',
              }}
            />
            
            {/* Avatar image sphere */}
            <div 
              className="relative rounded-full overflow-hidden bg-white shadow-2xl transition-transform duration-300 group-hover:scale-110"
              style={{
                width: `${avatar.size}px`,
                height: `${avatar.size}px`,
                border: `3px solid ${avatar.color}`,
                boxShadow: `0 0 20px ${avatar.color}60, 0 0 40px ${avatar.color}30`,
              }}
            >
              <img
                src={avatar.avatar}
                alt={avatar.name}
                className="w-full h-full object-cover"
              />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Name tooltip */}
            <div 
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
              }}
            >
              <div 
                className="px-3 py-1.5 rounded-full text-white text-xs font-semibold whitespace-nowrap backdrop-blur-md"
                style={{
                  background: `linear-gradient(135deg, ${avatar.color}cc, ${avatar.color}99)`,
                  border: `1px solid ${avatar.color}50`,
                }}
              >
                {avatar.name}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
