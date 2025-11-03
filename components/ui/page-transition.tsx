"use client"

import { useEffect, useState, type ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0B1C2C] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#C8A55C] border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-sm font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return <div className="animate-fade-in-page">{children}</div>
}
