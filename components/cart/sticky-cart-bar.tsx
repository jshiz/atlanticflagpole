"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function StickyCartBar() {
  const { cart } = useCart()
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const itemCount = cart?.lines?.edges?.reduce((total, edge) => total + edge.node.quantity, 0) || 0
  const subtotal = cart?.cost?.subtotalAmount?.amount || "0"

  useEffect(() => {
    if (itemCount > 0) {
      setIsVisible(true)
      setJustAdded(true)
      setIsExpanded(true)

      // Auto-collapse after 3 seconds
      const timer = setTimeout(() => {
        setIsExpanded(false)
        setJustAdded(false)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
      setIsExpanded(false)
    }
  }, [itemCount])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isExpanded ? "translate-y-0" : "translate-y-[calc(100%-4rem)]",
      )}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent backdrop-blur-sm" />

      {/* Main cart bar */}
      <div className="relative bg-gradient-to-r from-[#0B1C2C] via-[#0B1C2C] to-[#1a2f42] text-white shadow-2xl border-t-4 border-[#C8A55C]">
        {/* Collapsed view - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-[#C8A55C]" />
              {itemCount > 0 && (
                <span
                  className={cn(
                    "absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center",
                    justAdded && "animate-bounce",
                  )}
                >
                  {itemCount}
                </span>
              )}
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">
                {itemCount} {itemCount === 1 ? "Item" : "Items"} in Cart
              </p>
              <p className="text-xs text-gray-300">Click to {isExpanded ? "collapse" : "expand"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-300">Subtotal</p>
              <p className="text-xl font-bold text-[#C8A55C]">${Number.parseFloat(subtotal).toFixed(2)}</p>
            </div>
            <ArrowRight className={cn("w-5 h-5 transition-transform", isExpanded && "rotate-90")} />
          </div>
        </button>

        {/* Expanded view - Cart details */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500",
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="px-6 pb-6 space-y-4">
            {/* Cart items preview */}
            <div className="max-h-48 overflow-y-auto space-y-3 bg-white/5 rounded-lg p-4">
              {cart?.lines?.edges?.map((edge) => {
                const productImage = edge.node.merchandise.product.images?.edges?.[0]?.node
                const productHandle = edge.node.merchandise.product.handle
                const productTitle = edge.node.merchandise.product.title

                return (
                  <Link
                    key={edge.node.id}
                    href={productHandle ? `/products/${productHandle}` : "/cart"}
                    className="flex items-center gap-3 text-sm hover:bg-white/5 rounded-lg p-2 transition-colors group"
                  >
                    <div className="w-16 h-16 bg-white/10 rounded flex-shrink-0 overflow-hidden relative border border-white/20">
                      {productImage?.url ? (
                        <Image
                          src={productImage.url || "/placeholder.svg"}
                          alt={productImage.altText || productTitle}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/40">
                          <ShoppingCart className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate group-hover:text-[#C8A55C] transition-colors">
                        {productTitle}
                      </p>
                      <p className="text-xs text-gray-300">Qty: {edge.node.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#C8A55C]">
                      ${Number.parseFloat(edge.node.cost.totalAmount.amount).toFixed(2)}
                    </p>
                  </Link>
                )
              })}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Link href="/cart" className="flex-1">
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  View Cart
                </Button>
              </Link>
              <Link href="/cart" className="flex-1">
                <Button className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white font-bold">
                  Checkout Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
