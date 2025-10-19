"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#0B1C2C] via-[#1a3a52] to-[#0B1C2C] flex items-center justify-center animate-out fade-out duration-700">
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          {/* Flagpole */}
          <div className="absolute left-0 top-0 w-2 h-64 bg-gradient-to-b from-[#C8A55C] via-[#B8954C] to-[#A8853C] rounded-full shadow-lg" />
          <div className="absolute left-0 top-0 w-3 h-4 bg-[#C8A55C] rounded-full" />

          {/* Flag */}
          <div className="ml-2 relative w-72 h-48">
            <svg
              viewBox="0 0 380 250"
              className="w-full h-full"
              style={{
                filter: "drop-shadow(0 15px 40px rgba(0,0,0,0.4))",
              }}
            >
              <defs>
                {/* Wave animation path */}
                <path id="wave1" d="M 0 0 Q 95 -8 190 0 T 380 0" fill="none" />
                <path id="wave2" d="M 0 0 Q 95 8 190 0 T 380 0" fill="none" />
              </defs>

              {/* Red stripes with wave effect */}
              {[0, 2, 4, 6, 8, 10, 12].map((i) => (
                <g key={`red-${i}`}>
                  <path
                    d={`M 0 ${i * 19.23} Q 95 ${i * 19.23 - 6} 190 ${i * 19.23} T 380 ${i * 19.23} L 380 ${i * 19.23 + 19.23} Q 285 ${i * 19.23 + 19.23 + 6} 190 ${i * 19.23 + 19.23} T 0 ${i * 19.23 + 19.23} Z`}
                    fill="#B22234"
                    className="animate-wave"
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      transformOrigin: "left center",
                    }}
                  />
                </g>
              ))}

              {/* White stripes with wave effect */}
              {[1, 3, 5, 7, 9, 11].map((i) => (
                <g key={`white-${i}`}>
                  <path
                    d={`M 0 ${i * 19.23} Q 95 ${i * 19.23 + 6} 190 ${i * 19.23} T 380 ${i * 19.23} L 380 ${i * 19.23 + 19.23} Q 285 ${i * 19.23 + 19.23 - 6} 190 ${i * 19.23 + 19.23} T 0 ${i * 19.23 + 19.23} Z`}
                    fill="#FFFFFF"
                    className="animate-wave"
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      transformOrigin: "left center",
                    }}
                  />
                </g>
              ))}

              {/* Blue canton with wave */}
              <path
                d="M 0 0 Q 38 -4 76 0 T 152 0 L 152 134.62 Q 114 138.62 76 134.62 T 0 134.62 Z"
                fill="#3C3B6E"
                className="animate-wave"
                style={{
                  transformOrigin: "left center",
                }}
              />

              {/* Stars in proper 50-star pattern */}
              {Array.from({ length: 9 }).map((_, row) => {
                const starsInRow = row % 2 === 0 ? 6 : 5
                const offsetX = row % 2 === 0 ? 12 : 24
                return Array.from({ length: starsInRow }).map((_, col) => {
                  const x = offsetX + col * 24
                  const y = 12 + row * 14
                  return (
                    <g key={`star-${row}-${col}`}>
                      <polygon
                        points={`${x},${y - 4} ${x + 1.5},${y - 1} ${x + 4.5},${y - 1} ${x + 2},${y + 1} ${x + 3},${y + 4} ${x},${y + 2} ${x - 3},${y + 4} ${x - 2},${y + 1} ${x - 4.5},${y - 1} ${x - 1.5},${y - 1}`}
                        fill="white"
                        className="animate-pulse"
                        style={{
                          animationDelay: `${(row * starsInRow + col) * 0.03}s`,
                          animationDuration: "2s",
                        }}
                      />
                    </g>
                  )
                })
              })}
            </svg>
          </div>
        </div>

        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-serif font-bold text-white mb-4 tracking-wide">ATLANTIC FLAGPOLE</h2>
          <p className="text-[#C8A55C] text-base tracking-[0.3em] font-medium mt-2">
            <span className="inline-block animate-pulse">LOADING</span>
            <span className="inline-block animate-bounce ml-1">.</span>
            <span className="inline-block animate-bounce ml-0.5" style={{ animationDelay: "0.1s" }}>
              .
            </span>
            <span className="inline-block animate-bounce ml-0.5" style={{ animationDelay: "0.2s" }}>
              .
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
