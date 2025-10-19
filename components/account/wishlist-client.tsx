"use client"

import { useEffect, useState } from "react"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface WishlistItem {
  id: string
  handle: string
  title: string
  price: string
  image: string
}

export function WishlistClient() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      const response = await fetch("/api/account/wishlist")
      const data = await response.json()
      setWishlist(data.items || [])
    } catch (error) {
      console.error("[v0] Error loading wishlist:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (productId: string) => {
    try {
      await fetch("/api/account/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })
      setWishlist(wishlist.filter((item) => item.id !== productId))
    } catch (error) {
      console.error("[v0] Error removing from wishlist:", error)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-600">Loading wishlist...</p>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-afp-navy mb-2">Your wishlist is empty</h3>
        <p className="text-gray-600 mb-6">Save products you love to your wishlist</p>
        <Button asChild className="bg-afp-gold hover:bg-afp-gold-700 text-white">
          <Link href="/collections/all">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
          <Link href={`/products/${item.handle}`} className="block">
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/products/${item.handle}`}>
              <h3 className="font-medium text-afp-navy mb-2 hover:text-afp-gold transition-colors line-clamp-2">
                {item.title}
              </h3>
            </Link>
            <p className="text-lg font-bold text-afp-navy mb-4">{item.price}</p>
            <div className="flex gap-2">
              <Button className="flex-1 bg-afp-gold hover:bg-afp-gold-700 text-white">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeFromWishlist(item.id)}
                className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
