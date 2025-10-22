"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface FadeInOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export function FadeInOnScroll({ children, className = "", delay = 0, threshold = 0.1 }: FadeInOnScrollProps) {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !ref.current) return

    const checkIfInView = () => {
      if (!ref.current) return false
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      return rect.top <= windowHeight * (1 - threshold)
    }

    // If already in viewport, show immediately
    if (checkIfInView()) {
      setTimeout(() => setIsVisible(true), delay)
      return
    }

    // Otherwise, set up intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [delay, threshold, mounted])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )
}
