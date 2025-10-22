"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductReviewFormProps {
  productHandle: string
  productTitle: string
}

export function ProductReviewForm({ productHandle, productTitle }: ProductReviewFormProps) {
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/judgeme/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productHandle,
          rating,
          name,
          email,
          title,
          body,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        // Reset form
        setRating(5)
        setName("")
        setEmail("")
        setTitle("")
        setBody("")
      }
    } catch (error) {
      console.error("[v0] Error submitting review:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Thank you for your review!</h3>
        <p className="text-sm text-green-600">Your review has been submitted and will appear after approval.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating *</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={cn(
                    "w-8 h-8 transition-colors",
                    star <= (hoveredRating || rating) ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent"
            placeholder="your@email.com"
          />
          <p className="text-xs text-gray-500 mt-1">We'll never share your email</p>
        </div>

        {/* Review Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
            Review Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent"
            placeholder="Sum up your experience"
          />
        </div>

        {/* Review Body */}
        <div>
          <label htmlFor="body" className="block text-sm font-semibold text-gray-700 mb-1">
            Your Review *
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent resize-none"
            placeholder="Tell us what you think about this product"
          />
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white font-semibold py-3"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  )
}
