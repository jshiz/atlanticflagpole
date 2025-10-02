"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

export function ProductWatching() {
  const [watching, setWatching] = useState(0)

  useEffect(() => {
    // Generate a random number between 2-8 for people watching
    const count = Math.floor(Math.random() * 7) + 2
    setWatching(count)
  }, [])

  if (watching === 0) return null

  return (
    <div className="flex items-center gap-2 text-sm text-[#0B1C2C]/70">
      <Eye className="w-4 h-4 text-[#C8A55C]" />
      <span className="font-medium">{watching} watching this item</span>
    </div>
  )
}
