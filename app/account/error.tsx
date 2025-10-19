"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AccountError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Account page error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-afp-ivory flex items-center justify-center px-4 py-12">
      <Card className="max-w-md p-12 text-center shadow-xl">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-afp-navy mb-3">Something went wrong</h2>
        <p className="text-gray-600 mb-8 text-lg">We encountered an error loading your account. Please try again.</p>
        <div className="flex flex-col gap-4">
          <Button onClick={reset} size="lg" className="bg-afp-gold hover:bg-afp-gold-700 text-white">
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
