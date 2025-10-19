"use client"

import { Check, Package, Star, TrendingUp, Shield, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ShopifyProduct } from "@/lib/shopify"
import type { BundleData } from "@/lib/shopify/bundles"

interface ProductValueShowcaseProps {
  product: ShopifyProduct
  bundleData?: BundleData | null
  averageRating?: number
  reviewCount?: number
}

export function ProductValueShowcase({
  product,
  bundleData,
  averageRating = 4.6,
  reviewCount = 2898,
}: ProductValueShowcaseProps) {
  const hasBundle = bundleData?.includesPremier && bundleData.components.length > 0

  return (
    <div className="space-y-6">
      {/* Value Proposition Banner */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">🎉 Incredible Value - Limited Time Offer!</h3>
            <p className="text-[#0B1C2C]/80 mb-3">
              You're getting an insane deal! This premium package includes everything you need for a professional
              flagpole installation.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-600 hover:bg-green-700">Free Shipping ($49 Value)</Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700">Lifetime Warranty ($299 Value)</Badge>
              <Badge className="bg-purple-600 hover:bg-purple-700">Installation Guide ($29 Value)</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Bundle Contents Showcase */}
      {hasBundle && bundleData && (
        <Card className="bg-gradient-to-br from-[#C8A55C]/10 via-white to-[#C8A55C]/5 border-2 border-[#C8A55C]/30 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#C8A55C] rounded-lg shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C]">Complete Premier Kit Package</h2>
              <p className="text-sm text-[#0B1C2C]/70">
                {bundleData.components.length} Premium Items Included - ${" "}
                {bundleData.components.reduce((sum, c) => sum + Number.parseFloat(c.price.amount), 0).toFixed(2)} Total
                Value!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bundleData.components.map((component, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#C8A55C]/20 hover:border-[#C8A55C] transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0B1C2C] text-sm">{component.title}</p>
                  <p className="text-xs text-green-600 font-bold">
                    FREE (${Number.parseFloat(component.price.amount).toFixed(2)} value)
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold mb-1">🔥 You Save Big with This Bundle!</p>
                <p className="text-xs opacity-90">All items included at no extra cost</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">FREE</p>
                <p className="text-xs opacity-90">Accessories</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Trust & Quality Indicators */}
      <Card className="p-6 bg-white border-2 border-gray-200">
        <h3 className="text-xl font-bold text-[#0B1C2C] mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#C8A55C]" />
          Why This Is The Best Deal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-[#0B1C2C] text-sm mb-1">Highest Rated</p>
              <p className="text-xs text-[#0B1C2C]/70">
                {averageRating.toFixed(1)}★ from {reviewCount.toLocaleString()}+ verified customers
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-[#0B1C2C] text-sm mb-1">Premium Quality</p>
              <p className="text-xs text-[#0B1C2C]/70">Aircraft-grade aluminum, Made in USA</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-[#0B1C2C] text-sm mb-1">Lifetime Warranty</p>
              <p className="text-xs text-[#0B1C2C]/70">If it breaks, we replace it. No questions asked.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Package className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-[#0B1C2C] text-sm mb-1">Complete Package</p>
              <p className="text-xs text-[#0B1C2C]/70">Everything included - no hidden costs or extras needed</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
