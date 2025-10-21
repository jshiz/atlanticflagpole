"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SpinWheelModalProps {
  onClose: () => void
  onComplete: () => void
}

const WHEEL_SEGMENTS = [1, 5, 1, 2, 1, 10, 1, 2]
const COLORS = ["#D4AF37", "#F5F5DC", "#D4AF37", "#F5F5DC", "#D4AF37", "#F5F5DC", "#D4AF37", "#F5F5DC"]

export function SpinWheelModal({ onClose, onComplete }: SpinWheelModalProps) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)

  const handleSpin = async () => {
    if (spinning) return

    setSpinning(true)
    setResult(null)

    try {
      const response = await fetch("/api/account/rewards/spin", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        // Calculate rotation to land on the result
        const segmentIndex = WHEEL_SEGMENTS.indexOf(data.pointsWon)
        const segmentAngle = 360 / WHEEL_SEGMENTS.length
        const targetRotation = 360 * 5 + segmentIndex * segmentAngle // 5 full rotations + target segment

        setRotation(targetRotation)

        // Show result after animation
        setTimeout(() => {
          setResult(data.pointsWon)
          setSpinning(false)
        }, 4000)
      } else {
        alert(data.error || "Failed to spin wheel")
        setSpinning(false)
      }
    } catch (error) {
      console.error("[v0] Error spinning wheel:", error)
      alert("Failed to spin wheel. Please try again.")
      setSpinning(false)
    }
  }

  const handleClose = () => {
    if (result !== null) {
      onComplete()
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={spinning}
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-serif font-bold text-afp-navy mb-6 text-center">Daily Spin Wheel</h2>

        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-red-600" />
          </div>

          {/* Wheel */}
          <div
            className="w-full h-full rounded-full border-8 border-afp-navy relative overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            {WHEEL_SEGMENTS.map((points, index) => {
              const angle = (360 / WHEEL_SEGMENTS.length) * index
              return (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "center",
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 w-32 h-32 -translate-x-1/2 flex items-start justify-center pt-4"
                    style={{
                      background: COLORS[index],
                      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <span className="text-2xl font-bold text-afp-navy">{points}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {result !== null ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-afp-navy mb-2">Congratulations!</p>
            <p className="text-3xl font-bold text-afp-gold mb-4">You won {result} points!</p>
            <Button onClick={handleClose} className="w-full bg-afp-gold hover:bg-afp-gold-700 text-white">
              Claim Points
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full bg-afp-gold hover:bg-afp-gold-700 text-white disabled:opacity-50"
          >
            {spinning ? "Spinning..." : "Spin the Wheel!"}
          </Button>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">You can spin once per day</p>
      </div>
    </div>
  )
}
