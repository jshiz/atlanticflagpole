"use client"

import { useState } from "react"
import { ShoppingCart, X, Plus, Minus, ArrowRight } from "lucide-react"
import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getBundleConfig } from "@/lib/bundles/bundle-config"

export function CartSidebarButton() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [isExpanded, setIsExpanded] = useState(false)

  const itemCount = cart?.lines?.edges?.reduce((total, edge) => total + edge.node.quantity, 0) || 0
  const subtotal = cart?.cost?.subtotalAmount?.amount || "0"

  const totalSavings =
    cart?.lines?.edges?.reduce((total, edge) => {
      const line = edge.node
      const bundleConfig = getBundleConfig(line.merchandise.product.handle)
      if (bundleConfig && bundleConfig.components.length > 0) {
        const bundleValue = bundleConfig.components.reduce((sum, comp) => sum + (comp.retailPrice || 0), 0)
        const linePrice = Number.parseFloat(line.cost.totalAmount.amount)
        return total + Math.max(0, bundleValue - linePrice)
      }
      return total
    }, 0) || 0

  const lines = cart?.lines?.edges?.map((edge) => edge.node) || []

  if (itemCount === 0 && !isExpanded) return null

  return (
    <>
      {/* Collapsed Cart Button */}
      {!isExpanded && itemCount > 0 && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-[340px] right-0 z-[110] bg-[#0B1C2C] hover:bg-[#1a2d3f] text-white px-2 py-6 rounded-l-lg shadow-lg transition-all duration-300 hover:px-3 group"
          aria-label="Open cart"
        >
          <div className="flex flex-col items-center">
            {/* Cart icon with badge and subtle ring animation */}
            <div className="relative">
              <ShoppingCart
                className={cn("w-5 h-5 text-[#C8A55C]", itemCount > 0 && "animate-[cart-ring_2s_ease-in-out_infinite]")}
              />
              {itemCount > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#E63946] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-xs font-bold">{itemCount}</span>
                </div>
              )}
            </div>
          </div>
        </button>
      )}

      {/* Expanded Cart Panel */}
      {isExpanded && (
        <div className="fixed top-0 right-0 z-[120] w-full max-w-md h-full bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] text-white shadow-2xl border-l-4 border-[#C8A55C] overflow-hidden animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="bg-[#0B1C2C]/80 backdrop-blur-sm p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <p className="text-sm text-gray-400">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Savings banner */}
            {totalSavings > 0 && (
              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-lg p-3 text-center">
                <p className="text-xs text-green-300 font-semibold">🎉 Bundle Savings Applied!</p>
                <p className="text-2xl font-bold text-green-400">${totalSavings.toFixed(2)}</p>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: "calc(100vh - 280px)" }}>
            {lines.map((line) => {
              const productImage = line.merchandise.product.images?.edges?.[0]?.node
              const productHandle = line.merchandise.product.handle
              const productTitle = line.merchandise.product.title
              const bundleConfig = getBundleConfig(productHandle)
              const linePrice = Number.parseFloat(line.cost.totalAmount.amount)

              return (
                <div key={line.id} className="space-y-2">
                  {/* Main product card */}
                  <div className="flex items-start gap-4 bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-24 h-24 bg-white/10 rounded-lg flex-shrink-0 overflow-hidden relative border-2 border-white/20">
                      {productImage?.url ? (
                        <Image
                          src={productImage.url || "/placeholder.svg"}
                          alt={productImage.altText || productTitle}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/40">
                          <ShoppingCart className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${productHandle}`}
                        className="text-sm font-semibold hover:text-[#C8A55C] transition-colors line-clamp-2"
                        onClick={() => setIsExpanded(false)}
                      >
                        {productTitle}
                      </Link>
                      <p className="text-xs text-gray-400 mt-1">{line.merchandise.title}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-2 bg-white/10 rounded px-2 py-1">
                          <button
                            onClick={() => updateQuantity(line.id, Math.max(0, line.quantity - 1))}
                            className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-semibold w-8 text-center">{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(line.id)}
                          className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#C8A55C]">${linePrice.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">${(linePrice / line.quantity).toFixed(2)} ea</p>
                    </div>
                  </div>

                  {/* Premier Kit items */}
                  {bundleConfig && bundleConfig.components.length > 0 && (
                    <div className="ml-6 pl-4 border-l-2 border-green-500/50 space-y-2 bg-green-500/5 rounded-r-lg p-3">
                      <p className="text-xs text-green-400 font-bold flex items-center gap-2">
                        <Plus className="w-3 h-3" />
                        Premier Kit ({bundleConfig.components.length} items):
                      </p>
                      <div className="space-y-1.5">
                        {bundleConfig.components.map((component, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-gray-200 bg-white/5 rounded p-2"
                          >
                            <div className="w-10 h-10 bg-white/10 rounded overflow-hidden flex-shrink-0 border border-white/20">
                              {component.image ? (
                                <Image
                                  src={component.image || "/placeholder.svg"}
                                  alt={component.title}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Plus className="w-4 h-4 text-white/30" />
                                </div>
                              )}
                            </div>
                            <span className="flex-1 font-medium truncate">{component.title}</span>
                            {component.retailPrice && (
                              <span className="text-green-400 font-semibold">${component.retailPrice}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="bg-[#0B1C2C]/80 backdrop-blur-sm p-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Subtotal</p>
                <p className="text-3xl font-bold text-[#C8A55C]">${Number.parseFloat(subtotal).toFixed(2)}</p>
              </div>
              {totalSavings > 0 && (
                <div className="bg-green-500/20 border border-green-500 rounded-lg px-4 py-2">
                  <p className="text-xs text-green-300">Savings</p>
                  <p className="text-xl font-bold text-green-400">${totalSavings.toFixed(2)}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Link href="/cart" onClick={() => setIsExpanded(false)}>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 font-semibold py-6 text-base rounded-xl">
                  View Full Cart
                </Button>
              </Link>
              <Link href="/cart" onClick={() => setIsExpanded(false)}>
                <Button className="w-full bg-[#E63946] hover:bg-[#d32f3c] text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
