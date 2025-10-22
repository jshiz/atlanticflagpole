import { Shield, Award, Flag, Clock } from "lucide-react"

interface ProductCTRSectionProps {
  price: number
  compareAtPrice?: number
}

export function ProductCTRSection({ price, compareAtPrice }: ProductCTRSectionProps) {
  const savings = compareAtPrice ? compareAtPrice - price : 0
  const savingsPercent = compareAtPrice ? Math.round((savings / compareAtPrice) * 100) : 0

  return (
    <div className="bg-gradient-to-br from-[#0B1C2C] to-[#1a3a52] text-white rounded-lg p-6 space-y-4">
      {/* Savings Banner */}
      {savings > 0 && (
        <div className="bg-[#C8A55C] text-[#0B1C2C] rounded-md px-4 py-3 text-center">
          <p className="text-2xl font-bold">
            Save ${savings.toFixed(2)} ({savingsPercent}% OFF)
          </p>
          <p className="text-sm font-medium">Limited Time Offer</p>
        </div>
      )}

      {/* Value Props */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Flag className="w-5 h-5 text-[#C8A55C]" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">American Made</h4>
            <p className="text-xs text-gray-300">Proudly manufactured in the USA</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Shield className="w-5 h-5 text-[#C8A55C]" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Forever Warranty</h4>
            <p className="text-xs text-gray-300">Lifetime protection included</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Award className="w-5 h-5 text-[#C8A55C]" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Premium Quality</h4>
            <p className="text-xs text-gray-300">Built to last generations</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Clock className="w-5 h-5 text-[#C8A55C]" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Fast Shipping</h4>
            <p className="text-xs text-gray-300">Ships within 1-2 business days</p>
          </div>
        </div>
      </div>

      {/* Forever Warranty CTA */}
      <div className="border-t border-white/20 pt-4">
        <p className="text-sm text-center text-gray-300 mb-2">
          Add our <span className="text-[#C8A55C] font-semibold">Forever Warranty</span> for complete peace of mind
        </p>
        <p className="text-xs text-center text-gray-400">Covers all flagpole products for life - no questions asked</p>
      </div>
    </div>
  )
}
