"use client"

import { useEffect, useState } from "react"
import { Footer } from "@/components/footer"

export function LazyFooter() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
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
  }, [])

  if (!shouldRender) {
    return null
  }

  return <Footer />
}
