"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Package } from "lucide-react"
import Image from "next/image"
import type { BundleData } from "@/lib/shopify/bundles"

interface BundleBreakdownProps {
  bundleData: BundleData
}

export function BundleBreakdown({ bundleData }: BundleBreakdownProps) {
  if (!bundleData.includesPremier || bundleData.components.length === 0) {
    return null
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-[#C8A55C]/10 to-white border-2 border-[#C8A55C]/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#C8A55C] rounded-lg">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C]">Premier Kit Included</h2>
          <p className="text-sm text-[#0B1C2C]/70">Everything you need in one complete package</p>
        </div>
        <Badge className="ml-auto bg-green-600 hover:bg-green-700">FREE</Badge>
      </div>

      <div className="space-y-3">
        {bundleData.components.map((component, index) => (
          <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex-shrink-0 w-12 h-12 bg-[#C8A55C]/10 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-[#C8A55C]" />
            </div>
            {component.image && (
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={component.image.url || "/placeholder.svg"}
                  alt={component.image.altText || component.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#0B1C2C]">{component.title}</p>
              <p className="text-sm text-[#0B1C2C]/60">Included at no extra cost</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-600">FREE</p>
              <p className="text-xs text-gray-500 line-through">
                ${Number.parseFloat(component.price.amount).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#C8A55C]/10 rounded-lg">
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-[#C8A55C] mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-[#0B1C2C] mb-1">Complete Installation Package</p>
            <p className="text-sm text-[#0B1C2C]/70">
              All Premier Kit items will be automatically added to your cart when you purchase this bundle.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
