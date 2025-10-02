"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, Camera } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { ReviewsData } from "@/lib/shopify/reviews"

interface CustomerReviewsProps {
  reviewsData: ReviewsData
}

export function CustomerReviews({ reviewsData }: CustomerReviewsProps) {
  const [showAll, setShowAll] = useState(false)
  const { reviews, averageRating, totalReviews, ratingDistribution } = reviewsData

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)
  const hasReviews = reviews.length > 0

  return (
    <div className="py-12" id="reviews">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-white sticky top-4">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Customer Reviews</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-bold text-[#0B1C2C]">{averageRating.toFixed(1)}</div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating) ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-[#0B1C2C]/60">
                  {totalReviews > 0 ? `Based on ${totalReviews} reviews` : "No reviews yet"}
                </p>
              </div>
            </div>

            {hasReviews && (
              <div className="space-y-3 mb-6">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#0B1C2C] w-8">{item.stars}★</span>
                    <Progress value={item.percentage} className="flex-1 h-2" />
                    <span className="text-sm text-[#0B1C2C]/60 w-12 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            )}

            <Button className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white" size="lg">
              Write a review
            </Button>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {!hasReviews ? (
            <Card className="p-12 bg-white text-center">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#0B1C2C] mb-2">No reviews yet</h3>
              <p className="text-[#0B1C2C]/60 mb-6">Be the first to review this product!</p>
              <Button className="bg-[#C8A55C] hover:bg-[#a88947] text-white">Write a review</Button>
            </Card>
          ) : (
            <>
              {displayedReviews.map((review) => (
                <Card key={review.id} className="p-6 bg-white">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-[#C8A55C] text-white font-semibold">
                        {review.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-[#0B1C2C]">{review.author}</h3>
                        {review.verified && (
                          <span className="text-xs text-green-600 font-medium">✓ Verified Purchase</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-[#0B1C2C]/60">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-semibold text-[#0B1C2C] mb-2">{review.title}</h4>
                  <p className="text-[#0B1C2C]/80 leading-relaxed mb-4">{review.content}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded overflow-hidden">
                          <Image src={img || "/placeholder.svg"} alt="Review" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-sm text-[#0B1C2C]/60 hover:text-[#0B1C2C] transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </Card>
              ))}

              {reviews.length > 3 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAll(!showAll)}
                    className="border-[#C8A55C] text-[#C8A55C] hover:bg-[#C8A55C] hover:text-white"
                  >
                    {showAll ? "Show Less" : `Load More Reviews (${reviews.length - 3} more)`}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Customer Photos Section */}
      <div className="mt-12 pt-12 border-t border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-1">Customer photos & videos</h3>
            <p className="text-sm text-[#0B1C2C]/60">See how customers are using this product</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Camera className="w-4 h-4" />
            Add photo
          </Button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
            >
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
