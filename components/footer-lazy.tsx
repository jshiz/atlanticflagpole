"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/footer"

export function FooterLazy() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    const handleScroll = () => {
      // Show footer when user scrolls past 50% of the page
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercentage > 50) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Footer />
    </div>
  )
}
