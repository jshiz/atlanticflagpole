"use client"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Plus, ShoppingBag } from 'lucide-react'
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
            image: "/gold-ball-flagpole-topper.jpg",
          },
          { 
            handle: "eagle-ornament-for-flagpole", 
            title: "Eagle Topper", 
            image: "/eagle-flagpole-topper.jpg" 
          },
        ],
        badge: "Popular Add-On",
      })

      suggestions.push({
        title: "Protect Your Investment",
        description: "Keep your flag looking new with a premium flash collar cover",
        products: [
          { 
            handle: "flash-collar-cover", 
            title: "Flash Collar Cover", 
            image: "/flagpole-flash-collar.jpg" 
          },
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
            image: "/american-flag.png",
          },
          { 
            handle: "state-flags", 
            title: "State Flags", 
            image: "/state-flag.jpg" 
          },
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
          { 
            handle: "solar-light-for-flagpole", 
            title: "Solar Light", 
            image: "/solar-flagpole-light.jpg" 
          },
          { 
            handle: "flagpole-beacon", 
            title: "LED Beacon", 
            image: "/flagpole-beacon-light.jpg" 
          },
        ],
        badge: "Bundle Exclusive",
      })
    }
    
    // Default suggestions if none match
    if (suggestions.length === 0) {
       suggestions.push({
        title: "Essential Accessories",
        description: "Must-have items for every flagpole owner",
        products: [
          { 
            handle: "solar-light-for-flagpole", 
            title: "Solar Light", 
            image: "/solar-flagpole-light.jpg" 
          },
          {
            handle: "gold-ball-ornament-for-flagpole",
            title: "Gold Ball Topper",
            image: "/gold-ball-flagpole-topper.jpg",
          },
        ],
        badge: "Customer Favorites",
      })
    }

    return suggestions
  }

  const suggestions = getUpsellSuggestions()

  return (
    <div className="space-y-8 my-12">
      <div className="flex items-center justify-center text-center mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-2">
            <ShoppingBag className="w-8 h-8 inline-block mr-3 text-[#C8A55C] mb-1" />
            Complete Your Order
          </h2>
          <p className="text-muted-foreground">Frequently bought together with your selection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((suggestion, idx) => (
          <Card
            key={idx}
            className="p-6 border-2 border-[#C8A55C]/20 hover:border-[#C8A55C] transition-all hover:shadow-xl bg-white group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-[#0B1C2C] mb-2">{suggestion.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{suggestion.description}</p>
              </div>
              <span className="text-xs bg-[#C8A55C] text-white px-3 py-1 rounded-full font-bold whitespace-nowrap ml-3 shadow-sm">
                {suggestion.badge}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              {suggestion.products.map((product, pidx) => (
                <Link
                  key={pidx}
                  href={`/products/${product.handle}`}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-[#C8A55C]/10 transition-colors group/item border border-transparent hover:border-[#C8A55C]/20"
                >
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                    <Image
                      src={product.image || "/placeholder.svg?height=64&width=64&query=flagpole accessory"}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-[#0B1C2C] group-hover/item:text-[#C8A55C] transition-colors block mb-1">
                      {product.title}
                    </span>
                    <span className="text-xs text-muted-foreground">View Details</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover/item:bg-[#C8A55C] transition-colors">
                    <Plus className="w-4 h-4 text-[#C8A55C] group-hover/item:text-white" />
                  </div>
                </Link>
              ))}
            </div>

            <Link href={`/products/${suggestion.products[0].handle}`} className="block">
              <Button className="w-full bg-[#0B1C2C] hover:bg-[#C8A55C] text-white text-sm py-6 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl">
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
