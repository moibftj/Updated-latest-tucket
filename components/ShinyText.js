'use client'

import React from 'react'

const ShinyText = ({ text = '', disabled = false, speed = 3, className = '' }) => {
  if (disabled) {
    return <span className={className}>{text}</span>
  }

  const duration = Math.max(0.5, 6 / (Number(speed) || 3))

  return (
    <span
      className={`relative inline-block bg-clip-text text-transparent select-none ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.95) 60%, rgba(255,255,255,0.8) 80%)',
        WebkitBackgroundClip: 'text',
        backgroundSize: '200% 100%',
        animation: `tt-shimmer ${duration}s linear infinite`,
        filter: 'drop-shadow(0 0 6px rgba(236,72,153,0.35)) drop-shadow(0 0 12px rgba(168,85,247,0.25))`,
      }}
    >
      {text}
      <style jsx>{`
        @keyframes tt-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </span>
  )
}

export default ShinyText
