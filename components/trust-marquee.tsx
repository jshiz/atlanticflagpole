"use client"

const trustMessages = [
  "American Made™",
  "365-Night Home Trial",
  "Lifetime Warranty",
  "Premium Materials at Half the Price",
  "30-Day Price Match Guarantee",
  "Made in USA",
  "Aircraft-Grade Aluminum",
  "Ships in 1-2 Business Days",
]

export function TrustMarquee() {
  return (
    <div className="bg-[#0B1C2C] py-3 overflow-hidden border-t border-[#C8A55C]/20">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {[...trustMessages, ...trustMessages].map((message, index) => (
          <span key={index} className="text-[#C8A55C] font-serif text-lg tracking-wide">
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}
