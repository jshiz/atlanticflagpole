"use client"

import { useRef, useState, type ReactNode } from "react"

interface FadeInOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export function FadeInOnScroll({ children, className = "", delay = 0, threshold = 0.1 }: FadeInOnScrollProps) {
  const [isVisible, setIsVisible] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ease-out opacity-100 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
