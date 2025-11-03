"use client"

import { useEffect, useState } from "react"
import { Footer } from "@/components/footer"

export function LazyFooter() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      if (scrollPosition > viewportHeight * 0.5) {
        setShouldRender(true)
        // Remove listener once footer is rendered
        window.removeEventListener("scroll", handleScroll)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!shouldRender) {
    return null
  }

  return <Footer />
}
