"use client"

import { useState } from "react"
import { Star, ChevronDown } from "lucide-react"
import Image from "next/image"
import type { JudgemeReview } from "@/lib/judgeme"

interface ExpandableReviewsProps {
  reviews: JudgemeReview[]
}

export function ExpandableReviews({ reviews }: ExpandableReviewsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const highRatedReviews = reviews.filter((review) => review.rating >= 4)

  const toggleReview = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

  return (
    <section className="py-16 bg-[#0A2740]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by Thousands</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {highRatedReviews.map((review, index) => {
            const isExpanded = expandedIndex === index
            const hasMedia = review.pictures && review.pictures.length > 0

            return (
              <div key={review.id} className="bg-[#112B44] rounded-lg overflow-hidden shadow-lg">
                <button
                  onClick={() => toggleReview(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggleReview(index)
                    }
                  }}
                  className="w-full p-6 text-left hover:bg-[#112B44]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A55C] focus:ring-inset"
                  aria-expanded={isExpanded}
                  aria-controls={`review-content-${review.id}`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-[#C8A55C] text-[#C8A55C]" : "text-gray-600"}`}
                      />
                    ))}
                  </div>

                  {/* Title and snippet */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      {review.title && <h3 className="text-white font-semibold mb-2">{review.title}</h3>}
                      <p className="text-[#F5F3EF]/80 text-sm leading-relaxed">
                        {isExpanded ? review.body : truncateText(review.body, 140)}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C8A55C] flex-shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Author */}
                  <p className="text-[#C8A55C] text-sm font-medium mt-3">
                    {review.reviewer.name}
                    {review.reviewer.verified_buyer && (
                      <span className="ml-2 text-xs text-[#1F6FFF]">✓ Verified Buyer</span>
                    )}
                  </p>
                </button>

                <div
                  id={`review-content-${review.id}`}
                  className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[1000px]" : "max-h-0"}`}
                >
                  {hasMedia && (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-2 gap-3">
                        {review.pictures.slice(0, 4).map((picture, picIndex) => (
                          <div key={picIndex} className="relative aspect-square rounded-lg overflow-hidden">
                            <Image
                              src={picture.urls.compact || picture.urls.small || picture.urls.original}
                              alt={`Review image ${picIndex + 1} from ${review.reviewer.name}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
