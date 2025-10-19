"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function CartError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Cart page error:", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto p-12 text-center shadow-xl">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-3">Something went wrong</h2>
        <p className="text-[#0B1C2C]/70 mb-8 text-lg">We encountered an error loading your cart. Please try again.</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} size="lg" className="bg-[#C8A55C] hover:bg-[#a88947] text-white px-8">
            Try Again
          </Button>
          <Button onClick={() => (window.location.href = "/")} variant="outline" size="lg">
            Go Home
          </Button>
        </div>
      </Card>
    </div>
  )
}
