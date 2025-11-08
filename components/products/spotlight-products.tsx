"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, TrendingUp } from "lucide-react"

interface SpotlightProduct {
  handle: string
  title: string
  price: string
  image: string
  badge?: string
  rating: number
  reviewCount: number
}

export function SpotlightProducts() {
  const [featuredProducts] = useState<SpotlightProduct[]>([
    {
      handle: "phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      title: "Phoenix Premier Kit 20ft",
      price: "$899.00",
      image: "/phoenix-20ft-flagpole-kit.jpg",
      badge: "Best Seller",
      rating: 4.9,
      reviewCount: 1247,
    },
    {
      handle: "patriot-telescoping-flagpole-kit",
      title: "Patriot Flagpole Kit 25ft",
      price: "$1,099.00",
      image: "/patriot-25ft-flagpole.jpg",
      badge: "Premium",
      rating: 4.8,
      reviewCount: 893,
    },
    {
      handle: "skip-bedell-signature-flagpole",
      title: "Skip Bedell Signature 20ft",
      price: "$1,299.00",
      image: "/skip-bedell-flagpole-signature.jpg",
      badge: "Top Rated",
      rating: 5.0,
      reviewCount: 567,
    },
  ])

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-accent/20 to-background">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8A55C] text-white rounded-full font-bold mb-4">
            <TrendingUp className="w-5 h-5" />
            Customer Favorites
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Most Popular Flagpole Kits</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by thousands of patriots across America
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.handle} className="group overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-[#C8A55C] text-white px-3 py-1.5 text-sm font-bold">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-[#C8A55C] text-[#C8A55C]" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#C8A55C] transition-colors">
                  {product.title}
                </h3>
                <p className="text-2xl font-bold text-foreground mb-4">{product.price}</p>
                <Link href={`/products/${product.handle}`}>
                  <Button className="w-full bg-gradient-to-r from-[#C8A55C] to-[#a88947] hover:from-[#a88947] hover:to-[#C8A55C] text-white font-bold">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-bold border-2 border-[#C8A55C] text-[#C8A55C] hover:bg-[#C8A55C] hover:text-white bg-transparent"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
