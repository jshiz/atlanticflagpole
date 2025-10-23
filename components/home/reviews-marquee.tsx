"use client"

import { Star } from "lucide-react"
import { useEffect, useRef } from "react"

const reviews = [
  {
    name: "John M.",
    text: "Best flagpole I have ever owned. Built like a tank!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    text: "The quality is outstanding. Worth every penny.",
    rating: 5,
  },
  {
    name: "Michael R.",
    text: "Customer service was excellent. Highly recommend!",
    rating: 5,
  },
  {
    name: "Lisa T.",
    text: "Beautiful finish and incredibly sturdy construction.",
    rating: 5,
  },
  {
    name: "David P.",
    text: "Made in USA quality you can see and feel.",
    rating: 5,
  },
  {
    name: "Jennifer L.",
    text: "Survived multiple storms without any issues.",
    rating: 5,
  },
]

export function ReviewsMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    let animationId: number
    let position = 0

    const animate = () => {
      position -= 0.5
      if (Math.abs(position) >= marquee.scrollWidth / 2) {
        position = 0
      }
      marquee.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section className="py-12 bg-navy overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-ivory text-center">What Our Customers Say</h2>
      </div>

      <div className="relative">
        <div ref={marqueeRef} className="flex gap-6 whitespace-nowrap">
          {/* Duplicate reviews for seamless loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <div key={index} className="inline-block bg-[#112B44] rounded-lg p-6 min-w-[300px] max-w-[300px]">
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C8A55C] text-[#C8A55C]" />
                ))}
              </div>
              <p className="text-[#F5F3EF] text-sm mb-3 whitespace-normal leading-relaxed">{review.text}</p>
              <p className="text-[#C8A55C] text-sm font-medium">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
