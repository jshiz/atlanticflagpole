import { Check, X } from "lucide-react"

export function WhyBetter() {
  const stats = [
    { value: "35K+", label: "Happy Customers" },
    { value: "<10%", label: "Return Rate" },
    { value: "3 in 4", label: "Reorder or Refer" },
  ]

  const comparisons = [
    { feature: "Lifetime Warranty", us: true, them: false },
    { feature: "Made in USA", us: true, them: false },
    { feature: "Aircraft-Grade Aluminum", us: true, them: false },
    { feature: "Free Shipping", us: true, them: true },
    { feature: "365-Night Trial", us: true, them: false },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C2C] mb-6">Us vs The Rest</h2>
            <p className="text-lg text-[#333333] mb-8 leading-relaxed">
              We build flagpoles that stand for generations. Our commitment to quality and craftsmanship sets us apart
              from the competition.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#C8A55C] mb-2">{stat.value}</div>
                  <div className="text-sm text-[#333333]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Comparison Table */}
          <div className="bg-[#F5F3EF] rounded-lg p-8">
            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b-2 border-[#C8A55C]">
              <div className="text-sm font-bold text-[#333333]">Feature</div>
              <div className="text-sm font-bold text-[#0B1C2C] text-center">Atlantic</div>
              <div className="text-sm font-bold text-[#666666] text-center">Others</div>
            </div>

            {comparisons.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 last:border-0">
                <div className="text-sm text-[#333333]">{item.feature}</div>
                <div className="flex justify-center">
                  {item.us ? <Check className="w-5 h-5 text-[#2E7D32]" /> : <X className="w-5 h-5 text-[#B71C1C]" />}
                </div>
                <div className="flex justify-center">
                  {item.them ? <Check className="w-5 h-5 text-[#2E7D32]" /> : <X className="w-5 h-5 text-[#999999]" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
