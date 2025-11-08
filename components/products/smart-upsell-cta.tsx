"use client"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Plus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

interface SmartUpsellProps {
  currentProduct: {
    handle: string
    title: string
    productType?: string
  }
}

export function SmartUpsellCTA({ currentProduct }: SmartUpsellProps) {
  const { cart } = useCart()
  const [userLocation, setUserLocation] = useState<string | null>(null)

  // Detect if user has bundle in cart
  const hasBundle = cart?.lines?.edges?.some(
    (edge) =>
      edge.node.merchandise.product.handle?.includes("bundle") || edge.node.merchandise.product.handle?.includes("kit"),
  )

  // Get user location (simplified - you'd use actual geolocation)
  useEffect(() => {
    // You could integrate with your geo API here
    setUserLocation("United States")
  }, [])

  // Smart upsell logic based on current product
  const getUpsellSuggestions = () => {
    const suggestions = []

    // If viewing flagpole, suggest toppers and covers
    if (currentProduct.handle?.includes("flagpole") || currentProduct.productType?.includes("Flagpole")) {
      suggestions.push({
        title: "Add a Premium Topper",
        description: "Complete your flagpole with a stunning gold ball or eagle topper",
        products: [
          {
            handle: "gold-ball-ornament-for-flagpole",
            title: "Gold Ball Topper",
            image: "/images/products/gold-ball-topper.jpg",
          },
          { handle: "eagle-ornament-for-flagpole", title: "Eagle Topper", image: "/images/products/eagle-topper.jpg" },
        ],
        badge: "Popular Add-On",
      })

      suggestions.push({
        title: "Protect Your Investment",
        description: "Keep your flag looking new with a premium flash collar cover",
        products: [
          { handle: "flash-collar-cover", title: "Flash Collar Cover", image: "/images/products/flash-cover.jpg" },
        ],
        badge: "Best Value",
      })

      suggestions.push({
        title: "Extra Flags for Rotation",
        description: "Extend the life of your flags by rotating them regularly",
        products: [
          {
            handle: "oversized-american-flag",
            title: "American Flag 3x5",
            image: "/images/products/american-flag.jpg",
          },
          { handle: "state-flags", title: "State Flags", image: "/images/products/state-flags.jpg" },
        ],
        badge: "Smart Choice",
      })
    }

    // If has bundle, suggest complementary items
    if (hasBundle) {
      suggestions.push({
        title: "Complete Your Setup",
        description: "Bundle customers love these premium upgrades",
        products: [
          { handle: "solar-light-for-flagpole", title: "Solar Light", image: "/images/products/solar-light.jpg" },
          { handle: "flagpole-beacon", title: "LED Beacon", image: "/images/products/beacon.jpg" },
        ],
        badge: "Bundle Exclusive",
      })
    }

    return suggestions
  }

  const suggestions = getUpsellSuggestions()

  if (suggestions.length === 0) return null

  return (
    <div className="space-y-6 my-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0B1C2C]">
          <ShoppingBag className="w-6 h-6 inline-block mr-2 text-[#C8A55C]" />
          Complete Your Order
        </h2>
        {hasBundle && (
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
            Bundle Savings Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion, idx) => (
          <Card
            key={idx}
            className="p-4 border-2 border-[#C8A55C]/20 hover:border-[#C8A55C] transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-[#0B1C2C] mb-1">{suggestion.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{suggestion.description}</p>
              </div>
              <span className="text-[10px] bg-[#C8A55C] text-white px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ml-2">
                {suggestion.badge}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              {suggestion.products.map((product, pidx) => (
                <Link
                  key={pidx}
                  href={`/products/${product.handle}`}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-[#C8A55C]/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image || "/placeholder.svg?height=48&width=48&query=flagpole accessory"}
                      alt={product.title}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors flex-1">
                    {product.title}
                  </span>
                  <Plus className="w-4 h-4 text-[#C8A55C]" />
                </Link>
              ))}
            </div>

            <Link href={`/products/${suggestion.products[0].handle}`}>
              <Button className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white text-sm py-2">
                Add to Cart
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
