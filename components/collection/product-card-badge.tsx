import { Shield, Award, Lock } from "lucide-react"
import type { Product } from "@/lib/shopify/types"

interface ProductCardBadgeProps {
  product: Product
}

export default function ProductCardBadge({ product }: ProductCardBadgeProps) {
  const isPremierBundle = product.tags?.includes("premier-kit-included") || false
  const hasAntiTheft = product.tags?.includes("anti-theft-guarantee") || false
  const hasForeverWarranty = product.tags?.includes("forever-warranty") || false

  if (!isPremierBundle && !hasAntiTheft && !hasForeverWarranty) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {isPremierBundle && (
        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
          <Award className="w-3 h-3" />
          Premier Kit
        </span>
      )}
      {hasAntiTheft && (
        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full">
          <Lock className="w-3 h-3" />
          Anti-Theft
        </span>
      )}
      {hasForeverWarranty && (
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full">
          <Shield className="w-3 h-3" />
          Forever Warranty
        </span>
      )}
    </div>
  )
}
