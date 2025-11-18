"use client"

import { useState, useEffect } from "react"
import { Clock } from 'lucide-react'

export function CartCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

  useEffect(() => {
    // Check if we have a saved timer in localStorage
    const savedTime = localStorage.getItem("cart-timer-end")
    const now = Date.now()

    if (savedTime) {
      const endTime = parseInt(savedTime)
      const remaining = Math.floor((endTime - now) / 1000)
      
      if (remaining > 0) {
        setTimeLeft(remaining)
      } else {
        // Timer expired, set new one
        const newEndTime = now + (15 * 60 * 1000)
        localStorage.setItem("cart-timer-end", newEndTime.toString())
        setTimeLeft(15 * 60)
      }
    } else {
      // No saved timer, create new one
      const newEndTime = now + (15 * 60 * 1000)
      localStorage.setItem("cart-timer-end", newEndTime.toString())
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer expired, reset
          const newEndTime = Date.now() + (15 * 60 * 1000)
          localStorage.setItem("cart-timer-end", newEndTime.toString())
          return 15 * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-[#C8A55C] rounded-lg p-4 mb-6 shadow-lg">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Clock className="w-5 h-5 text-[#C8A55C] animate-pulse" />
        <p className="text-sm md:text-base font-semibold text-[#0B1C2C]">
          <span className="hidden sm:inline">⏰ Hurry!</span> Your order is reserved for
        </p>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md border-2 border-[#C8A55C]">
          <span className="text-2xl font-bold text-[#C8A55C] tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-gray-600 font-medium">minutes</span>
        </div>
      </div>
    </div>
  )
}
