"use client"

import { useEffect, useState } from "react"
import { Footer } from "@/components/footer"
import { usePathname } from 'next/navigation'

export function LazyFooter() {
  const [shouldRender, setShouldRender] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Always render immediately on cart page or if already rendered
    if (pathname === "/cart" || pathname === "/checkout") {
      setShouldRender(true)
      return
    }

    let mounted = true
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      if (!mounted) return

      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        if (!mounted) return

        // Render footer when user scrolls past 50% of viewport
        if (scrollPosition > viewportHeight * 0.5) {
          setShouldRender(true)
          window.removeEventListener("scroll", handleScroll)
        }
      }, 100)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      mounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  if (!shouldRender) {
    return null
  }

  return <Footer />
}
