"use client"

import { Star } from "lucide-react"

interface ProductReviewsSummaryProps {
  rating?: number
  reviewCount?: number
  onViewReviews?: () => void
}

export function ProductReviewsSummary({ rating = 4.9, reviewCount = 437, onViewReviews }: ProductReviewsSummaryProps) {
  return (
    <button onClick={onViewReviews} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-[#0B1C2C]">{rating} out of 5</span>
      <span className="text-sm text-[#0B1C2C]/60">({reviewCount})</span>
    </button>
  )
}
