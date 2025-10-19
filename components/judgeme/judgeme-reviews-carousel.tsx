"use client"

import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import type { JudgemeReview } from "@/lib/judgeme"

interface JudgemeReviewsCarouselProps {
  reviews: JudgemeReview[]
}

export function JudgemeReviewsCarousel({ reviews }: JudgemeReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredReviews = reviews.filter((review) => review.rating >= 4)

  useEffect(() => {
    if (filteredReviews.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredReviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [filteredReviews.length])

  if (filteredReviews.length === 0) {
    return null
  }

  const review = filteredReviews[currentIndex]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm max-w-md">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
      <p className="text-[#0B1C2C] text-sm leading-relaxed mb-4 line-clamp-3">{review.body}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-[#0B1C2C] text-sm">{review.reviewer.name}</p>
          {review.reviewer.verified_buyer && <p className="text-xs text-[#C8A55C]">Verified Buyer</p>}
        </div>
        <div className="flex gap-1">
          {filteredReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex ? "w-6 bg-[#C8A55C]" : "w-1.5 bg-gray-300"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
