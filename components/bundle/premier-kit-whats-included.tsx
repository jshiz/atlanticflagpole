"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Package, Gift, Shield } from "lucide-react"
import Image from "next/image"
import type { BundleConfig } from "@/lib/bundles/bundle-config"

interface PremierKitWhatsIncludedProps {
  bundleConfig: BundleConfig
  showTitle?: boolean
  compact?: boolean
}

export function PremierKitWhatsIncluded({
  bundleConfig,
  showTitle = true,
  compact = false,
}: PremierKitWhatsIncludedProps) {
  if (!bundleConfig.includesPremier || bundleConfig.components.length === 0) {
    return null
  }

  // Calculate total retail value
  const totalRetailValue = bundleConfig.components.reduce(
    (sum, component) => sum + (component.retailPrice || 0) * component.quantity,
    0,
  )

  if (compact) {
    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-blue-600" />
          <h4 className="font-bold text-blue-900">Premier Kit Included</h4>
          <Badge className="ml-auto bg-green-600">FREE</Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {bundleConfig.components.map((component, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
              <span className="truncate">{component.title}</span>
              {component.quantity > 1 && <span className="text-gray-600">(x{component.quantity})</span>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-[#C8A55C]/10 via-white to-blue-50 border-2 border-[#C8A55C]/30 shadow-lg">
      {showTitle && (
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-[#C8A55C]/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#C8A55C] rounded-xl shadow-lg">
              <Package className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C]">What's Included in Your Premier Kit</h2>
              <p className="text-sm text-[#0B1C2C]/70 mt-1">
                Everything you need for professional installation — completely FREE with your bundle
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Badge className="bg-green-600 hover:bg-green-700 text-white text-base px-4 py-2 shadow-md">
              <Gift className="w-4 h-4 mr-1.5" />
              FREE
            </Badge>
            {totalRetailValue > 0 && (
              <p className="text-xs text-gray-600 mt-1 line-through">${totalRetailValue.toFixed(2)} value</p>
            )}
          </div>
        </div>
      )}

      {/* Kit Details Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-white rounded-lg border border-[#C8A55C]/20">
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-1">Bundle Name</p>
          <p className="font-bold text-sm text-[#0B1C2C]">{bundleConfig.name}</p>
        </div>
        {bundleConfig.flagSize && (
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Flag Size</p>
            <p className="font-bold text-sm text-[#0B1C2C]">{bundleConfig.flagSize}</p>
          </div>
        )}
        {bundleConfig.groundSleeveSize && (
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Ground Sleeve</p>
            <p className="font-bold text-sm text-[#0B1C2C]">{bundleConfig.groundSleeveSize}</p>
          </div>
        )}
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-1">Total Items</p>
          <p className="font-bold text-sm text-[#0B1C2C]">{bundleConfig.components.length} Components</p>
        </div>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bundleConfig.components.map((component, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-[#C8A55C] hover:shadow-md transition-all group"
          >
            {/* Product Image */}
            {component.image && (
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-[#C8A55C]/20 group-hover:border-[#C8A55C] transition-all">
                <Image
                  src={component.image || "/placeholder.svg"}
                  alt={component.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                  sizes="80px"
                />
              </div>
            )}

            {/* Check Icon (if no image) */}
            {!component.image && (
              <div className="w-20 h-20 flex-shrink-0 bg-[#C8A55C]/10 rounded-lg flex items-center justify-center border-2 border-[#C8A55C]/20">
                <Check className="w-8 h-8 text-[#C8A55C]" />
              </div>
            )}

            {/* Component Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-[#0B1C2C] leading-tight">{component.title}</p>
                  {component.variantTitle && component.variantTitle !== "Default Title" && (
                    <p className="text-xs text-gray-600 mt-0.5">{component.variantTitle}</p>
                  )}
                  {component.notes && (
                    <p className="text-xs text-gray-500 mt-1 italic line-clamp-2">{component.notes}</p>
                  )}
                </div>
                {component.quantity > 1 && (
                  <Badge variant="secondary" className="bg-[#C8A55C]/20 text-[#C8A55C] font-bold flex-shrink-0">
                    x{component.quantity}
                  </Badge>
                )}
              </div>

              {/* Price Display */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-green-600">Included FREE</p>
                  {component.retailPrice && component.retailPrice > 0 && (
                    <p className="text-xs text-gray-500 line-through">
                      ${(component.retailPrice * component.quantity).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Banner */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-green-900 mb-1">Complete Installation Package</p>
            <p className="text-sm text-green-800">
              All Premier Kit items shown above are automatically included with your bundle purchase — no hidden fees,
              no surprises. Everything you need for a professional flagpole installation arrives together.
            </p>
          </div>
          {totalRetailValue > 0 && (
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-green-700 font-semibold">Total Value</p>
              <p className="text-2xl font-bold text-green-600">${totalRetailValue.toFixed(2)}</p>
              <p className="text-xs text-green-700 font-bold">FREE</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
