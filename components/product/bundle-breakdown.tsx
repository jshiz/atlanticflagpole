"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Shield, Package, Gift } from "lucide-react"

interface BundleItem {
  handle: string
  title: string
  image: string
  category: "base" | "extra" | "warranty"
  quantity: number
}

interface BundleBreakdownProps {
  productHandle: string
  variantId?: string
}

export default function BundleBreakdown({ productHandle, variantId }: BundleBreakdownProps) {
  const [items, setItems] = useState<BundleItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch("/api/bundles/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productHandle, variantId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [productHandle, variantId])

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse py-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded"></div>
              <div className="flex-1 h-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const baseItems = items.filter((i) => i.category === "base")
  const extras = items.filter((i) => i.category === "extra")
  const warranties = items.filter((i) => i.category === "warranty")

  return (
    <div className="space-y-8 py-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-semibold text-blue-900">Premier Kit (Base) — Included FREE</h4>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {baseItems.map((item) => (
            <li key={item.handle} className="flex items-center gap-3 bg-white rounded-lg p-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover rounded" />
              </div>
              <span className="text-sm font-medium text-gray-800">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {extras.length > 0 && (
        <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-green-600" />
            <h4 className="text-lg font-semibold text-green-900">Bundle Extras — Included FREE</h4>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {extras.map((item) => (
              <li key={item.handle} className="flex items-center gap-3 bg-white rounded-lg p-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <span className="text-sm font-medium text-gray-800">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {warranties.length > 0 && (
        <div className="bg-amber-50 rounded-lg p-6 border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-amber-600" />
            <h4 className="text-lg font-semibold text-amber-900">Warranties & Guarantees</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {warranties.map((item) => (
              <span
                key={item.handle}
                className="inline-flex items-center gap-1.5 bg-white px-4 py-2 rounded-full text-sm font-medium text-amber-800 border border-amber-300"
              >
                <Shield className="w-4 h-4" />
                {item.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
