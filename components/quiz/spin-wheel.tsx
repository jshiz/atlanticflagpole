"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Gift, Percent, Tag, Star, Trophy, Sparkles } from "lucide-react"

interface Prize {
  id: number
  label: string
  icon: React.ReactNode
  color: string
  couponCode: string
  description: string
}

const prizes: Prize[] = [
  {
    id: 1,
    label: "15% OFF",
    icon: <Percent className="w-8 h-8" />,
    color: "#c8a55c",
    couponCode: "QUIZ15",
    description: "15% off your entire order",
  },
  {
    id: 2,
    label: "Free Flag",
    icon: <Gift className="w-8 h-8" />,
    color: "#0b1c2c",
    couponCode: "FREEFLAG",
    description: "Free 3x5 American flag with qualifying purchase",
  },
  {
    id: 3,
    label: "20% OFF",
    icon: <Tag className="w-8 h-8" />,
    color: "#c8a55c",
    couponCode: "QUIZ20",
    description: "20% off your entire order",
  },
  {
    id: 4,
    label: "Free Solar Light",
    icon: <Star className="w-8 h-8" />,
    color: "#0b1c2c",
    couponCode: "FREELIGHT",
    description: "Free solar light with flagpole purchase",
  },
  {
    id: 5,
    label: "25% OFF",
    icon: <Trophy className="w-8 h-8" />,
    color: "#c8a55c",
    couponCode: "QUIZ25",
    description: "25% off your entire order",
  },
  {
    id: 6,
    label: "Free Accessories",
    icon: <Sparkles className="w-8 h-8" />,
    color: "#0b1c2c",
    couponCode: "FREEACC",
    description: "Free accessories bundle with qualifying purchase",
  },
]

interface SpinWheelProps {
  score: number
  totalQuestions: number
  onClose: () => void
}

const triggerConfetti = () => {
  const canvas = document.createElement("canvas")
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "9999"
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const particles: any[] = []
  const colors = ["#c8a55c", "#0b1c2c", "#ffffff"]

  // Create 100 particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.6,
      vx: (Math.random() - 0.5) * 20,
      vy: Math.random() * -20,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 120,
    })
  }

  let frame = 0
  const animate = () => {
    frame++
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, index) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vy += 0.5
      particle.rotation += particle.rotationSpeed
      particle.life--

      if (particle.life <= 0) {
        particles.splice(index, 1)
        return
      }

      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate((particle.rotation * Math.PI) / 180)
      ctx.fillStyle = particle.color
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
      ctx.restore()
    })

    if (particles.length > 0 && frame < 120) {
      requestAnimationFrame(animate)
    } else {
      document.body.removeChild(canvas)
    }
  }

  animate()
}

export function SpinWheel({ score, totalQuestions, onClose }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null)
  const [showPrize, setShowPrize] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)

  const handleSpin = () => {
    if (spinning) return

    setSpinning(true)
    setShowPrize(false)

    // Random prize selection
    const prizeIndex = Math.floor(Math.random() * prizes.length)
    const prize = prizes[prizeIndex]

    // Calculate rotation (5 full spins + landing on prize)
    const segmentAngle = 360 / prizes.length
    const targetRotation = 360 * 5 + (360 - prizeIndex * segmentAngle - segmentAngle / 2)

    setRotation(targetRotation)

    // Show prize after spin completes
    setTimeout(() => {
      setSelectedPrize(prize)
      setShowPrize(true)
      setSpinning(false)

      if (typeof window !== "undefined") {
        try {
          triggerConfetti()
        } catch (error) {
          console.log("Confetti animation failed")
        }
      }
    }, 4000)
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    // You could add a toast notification here
  }

  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="bg-gradient-to-br from-[#0b1c2c] via-[#1a3a52] to-[#0b1c2c] text-white p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 left-4 text-6xl">⭐</div>
        <div className="absolute top-12 right-8 text-4xl">⭐</div>
        <div className="absolute bottom-8 left-12 text-5xl">⭐</div>
        <div className="absolute bottom-4 right-4 text-6xl">⭐</div>
      </div>

      <div className="max-w-xl mx-auto text-center relative z-10">
        {/* Score Display */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Quiz Complete!</h2>
          <p className="text-lg text-white/90">
            You scored {score}/{totalQuestions} ({percentage}%)
          </p>
          <p className="text-white/70 mt-1 text-sm">
            {percentage >= 80
              ? "Outstanding! You're a true flag expert!"
              : percentage >= 60
                ? "Great job! You know your flags!"
                : "Good effort! Keep learning about flags!"}
          </p>
        </div>

        {/* Spin Wheel */}
        {!showPrize && (
          <div className="mb-6">
            <p className="text-base mb-4">Spin the wheel to claim your reward!</p>
            <div className="relative w-64 h-64 mx-auto">
              {/* Wheel */}
              <div
                ref={wheelRef}
                className="absolute inset-0 rounded-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] border-4 border-[#c8a55c] transition-transform duration-[4000ms] ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {prizes.map((prize, index) => {
                  const segmentAngle = 360 / prizes.length
                  const rotation = index * segmentAngle

                  return (
                    <div
                      key={prize.id}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`,
                        backgroundColor: prize.color,
                      }}
                    >
                      <div
                        className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                        style={{ transform: "translateX(-50%)" }}
                      >
                        <div className="text-white scale-75">{prize.icon}</div>
                        <p className="text-white font-bold text-xs mt-1 whitespace-nowrap">{prize.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Center Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handleSpin}
                  disabled={spinning}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-100 text-[#0b1c2c] font-bold text-base shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed z-10 border-4 border-[#c8a55c]"
                >
                  {spinning ? "..." : "SPIN"}
                </button>
              </div>

              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-[#c8a55c] drop-shadow-lg" />
              </div>
            </div>
          </div>
        )}

        {/* Prize Display */}
        {showPrize && selectedPrize && (
          <div className="animate-fade-in">
            <div className="bg-white text-[#0b1c2c] rounded-lg p-6 mb-4 shadow-[0_15px_40px_rgba(0,0,0,0.3)] border-2 border-[#c8a55c]">
              <div className="flex justify-center mb-3" style={{ color: selectedPrize.color }}>
                {selectedPrize.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">{selectedPrize.label}</h3>
              <p className="text-gray-600 mb-3 text-sm">{selectedPrize.description}</p>
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-3 mb-3 border-2 border-[#c8a55c]/30">
                <p className="text-xs text-gray-600 mb-1">Your Coupon Code:</p>
                <p className="text-xl font-bold font-mono tracking-wider">{selectedPrize.couponCode}</p>
              </div>
              <Button
                onClick={() => copyToClipboard(selectedPrize.couponCode)}
                className="bg-gradient-to-r from-[#c8a55c] to-[#a88947] hover:from-[#a88947] hover:to-[#8a6d39] text-white shadow-lg border-b-4 border-[#8a6d39]"
              >
                Copy Code
              </Button>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-white text-[#0b1c2c] hover:bg-gray-100 border-2 border-white shadow-lg"
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
