"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide loading screen after a short delay
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#0B1C2C] via-[#1a3a52] to-[#0B1C2C] flex items-center justify-center animate-out fade-out duration-500">
      <div className="relative">
        {/* Animated American Flag */}
        <div className="relative w-64 h-40 perspective-1000">
          <svg
            viewBox="0 0 320 200"
            className="w-full h-full"
            style={{
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
            }}
          >
            {/* Flag stripes with wave animation */}
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B22234" />
                <stop offset="50%" stopColor="#B22234" />
                <stop offset="100%" stopColor="#B22234" />
              </linearGradient>
              <filter id="wave-shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="2" dy="2" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Red stripes */}
            {[0, 2, 4, 6, 8, 10, 12].map((i) => (
              <path
                key={`red-${i}`}
                d={`M 0 ${i * 15.38} Q 80 ${i * 15.38 - 5} 160 ${i * 15.38} T 320 ${i * 15.38} L 320 ${i * 15.38 + 15.38} Q 240 ${i * 15.38 + 15.38 + 5} 160 ${i * 15.38 + 15.38} T 0 ${i * 15.38 + 15.38} Z`}
                fill="#B22234"
                className="animate-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}

            {/* White stripes */}
            {[1, 3, 5, 7, 9, 11].map((i) => (
              <path
                key={`white-${i}`}
                d={`M 0 ${i * 15.38} Q 80 ${i * 15.38 - 5} 160 ${i * 15.38} T 320 ${i * 15.38} L 320 ${i * 15.38 + 15.38} Q 240 ${i * 15.38 + 15.38 + 5} 160 ${i * 15.38 + 15.38} T 0 ${i * 15.38 + 15.38} Z`}
                fill="white"
                className="animate-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}

            {/* Blue canton */}
            <path
              d="M 0 0 Q 32 -3 64 0 T 128 0 L 128 107.69 Q 96 110.69 64 107.69 T 0 107.69 Z"
              fill="#3C3B6E"
              className="animate-wave"
            />

            {/* Stars (simplified) */}
            {Array.from({ length: 50 }).map((_, i) => {
              const row = Math.floor(i / 6)
              const col = i % 6
              const x = 10 + col * 20
              const y = 10 + row * 18
              return (
                <circle
                  key={`star-${i}`}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="white"
                  className="animate-pulse"
                  style={{
                    animationDelay: `${i * 0.02}s`,
                  }}
                />
              )
            })}
          </svg>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-2">ATLANTIC FLAGPOLE</h2>
          <p className="text-[#C8A55C] text-sm tracking-widest animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  )
}
