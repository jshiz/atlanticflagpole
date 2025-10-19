"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, ArrowRight, Plus, Minus, ChevronUp, ChevronDown } from "lucide-react"
import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getBundleConfig } from "@/lib/bundles/bundle-config"

export function StickyCartBar() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const [isVisible, setIsVisible] = useState(false)
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

  useEffect(() => {
    if (itemCount > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
      setIsExpanded(false)
    }
  }, [itemCount])

  if (!isVisible) return null

  const lines = cart?.lines?.edges?.map((edge) => edge.node) || []

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isExpanded ? "translate-y-0" : "translate-y-[calc(100%-80px)]",
        )}
      >
        {/* Main cart drawer */}
        <div className="relative bg-gradient-to-br from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] text-white shadow-2xl border-t-4 border-[#C8A55C] rounded-t-3xl overflow-hidden max-w-7xl mx-auto">
          {/* Collapsed bar - Shows product thumbnails and summary */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              {/* Left side - Cart icon and overlapping products */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-[#C8A55C]" />
                    {/* Item count badge */}
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#E63946] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <span className="text-xs font-bold">{itemCount}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-left">
                      {itemCount} {itemCount === 1 ? "Item" : "Items"}
                    </p>
                    <p className="text-xs text-gray-400">{isExpanded ? "Collapse" : "Expand"}</p>
                  </div>
                </div>

                {/* Overlapping product images */}
                <div className="relative h-14 flex items-center">
                  {lines.slice(0, 4).map((line, idx) => {
                    const productImage = line.merchandise.product.images?.edges?.[0]?.node
                    const bundleConfig = getBundleConfig(line.merchandise.product.handle)
                    const hasBundle = bundleConfig && bundleConfig.components.length > 0

                    return (
                      <div
                        key={line.id}
                        className="relative"
                        style={{
                          marginLeft: idx > 0 ? "-12px" : "0",
                          zIndex: 10 - idx,
                        }}
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/10 border-2 border-white shadow-lg hover:scale-110 transition-transform">
                          {productImage?.url ? (
                            <Image
                              src={productImage.url || "/placeholder.svg"}
                              alt={productImage.altText || line.merchandise.product.title}
                              width={56}
                              height={56}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingCart className="w-5 h-5 text-white/40" />
                            </div>
                          )}
                        </div>
                        {/* Plus sign badge for bundle items */}
                        {hasBundle && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            <Plus className="w-3 h-3 text-white font-bold" />
                          </div>
                        )}
                        {/* Quantity badge */}
                        {line.quantity > 1 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#C8A55C] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            <span className="text-xs font-bold">{line.quantity}</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {lines.length > 4 && (
                    <div className="relative -ml-3 w-14 h-14 rounded-lg bg-white/20 border-2 border-white shadow-lg flex items-center justify-center backdrop-blur-sm">
                      <span className="text-sm font-bold">+{lines.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side - Savings, subtotal, and actions */}
              <div className="flex items-center gap-4">
                {/* Savings badge */}
                {totalSavings > 0 && (
                  <div className="bg-green-500/20 border-2 border-green-500 rounded-lg px-3 py-1.5">
                    <p className="text-xs text-green-300 font-semibold">Saving</p>
                    <p className="text-lg font-bold text-green-400">${totalSavings.toFixed(2)}</p>
                  </div>
                )}

                {/* Subtotal */}
                <div className="text-right">
                  <p className="text-xs text-gray-300">Subtotal</p>
                  <p className="text-xl font-bold text-[#C8A55C]">${Number.parseFloat(subtotal).toFixed(2)}</p>
                </div>

                {/* Quick checkout button */}
                <Link href="/cart" onClick={(e) => e.stopPropagation()}>
                  <Button className="bg-[#E63946] hover:bg-[#d32f3c] text-white font-bold px-6 py-4 text-base rounded-xl shadow-lg hover:shadow-xl transition-all">
                    Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                {/* Expand/collapse icon */}
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-[#C8A55C]" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-[#C8A55C]" />
                )}
              </div>
            </div>
          </button>

          {/* Expanded content - Full cart details with max-height and scroll */}
          {isExpanded && (
            <div className="px-4 pb-4 border-t border-white/10 max-h-[70vh] overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                {/* Savings banner */}
                {totalSavings > 0 && (
                  <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-lg p-3 text-center my-3 shadow-lg">
                    <p className="text-xs text-green-300 font-semibold">🎉 Bundle Savings Applied!</p>
                    <p className="text-2xl font-bold text-green-400 my-0.5">${totalSavings.toFixed(2)}</p>
                    <p className="text-xs text-green-300">Save hundreds with Premier Kit bundles!</p>
                  </div>
                )}

                {/* Cart items grid - 2 columns for better showcase */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                  {lines.map((line) => {
                    const productImage = line.merchandise.product.images?.edges?.[0]?.node
                    const productHandle = line.merchandise.product.handle
                    const productTitle = line.merchandise.product.title
                    const bundleConfig = getBundleConfig(productHandle)
                    const linePrice = Number.parseFloat(line.cost.totalAmount.amount)

                    return (
                      <div key={line.id} className="space-y-2">
                        {/* Main product card */}
                        <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="w-20 h-20 bg-white/10 rounded-lg flex-shrink-0 overflow-hidden relative border-2 border-white/20">
                            {productImage?.url ? (
                              <Image
                                src={productImage.url || "/placeholder.svg"}
                                alt={productImage.altText || productTitle}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/40">
                                <ShoppingCart className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${productHandle}`}
                              className="text-sm font-semibold hover:text-[#C8A55C] transition-colors line-clamp-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {productTitle}
                            </Link>
                            <p className="text-xs text-gray-400 mt-0.5">{line.merchandise.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1.5 bg-white/10 rounded px-1.5 py-0.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateQuantity(line.id, Math.max(0, line.quantity - 1))
                                  }}
                                  className="w-5 h-5 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-semibold w-6 text-center">{line.quantity}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateQuantity(line.id, line.quantity + 1)
                                  }}
                                  className="w-5 h-5 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeFromCart(line.id)
                                }}
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

                        {/* Premier Kit items - compact with images and prices */}
                        {bundleConfig && bundleConfig.components.length > 0 && (
                          <div className="ml-4 pl-3 border-l-2 border-green-500/50 space-y-1.5 bg-green-500/5 rounded-r-lg p-2">
                            <p className="text-xs text-green-400 font-bold flex items-center gap-1.5">
                              <Plus className="w-3 h-3" />
                              Premier Kit ({bundleConfig.components.length} items):
                            </p>
                            <div className="space-y-1">
                              {bundleConfig.components.map((component, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-xs text-gray-200 bg-white/5 rounded p-1.5"
                                >
                                  <div className="w-8 h-8 bg-white/10 rounded overflow-hidden flex-shrink-0 border border-white/20">
                                    {component.image ? (
                                      <Image
                                        src={component.image || "/placeholder.svg"}
                                        alt={component.title}
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Plus className="w-3 h-3 text-white/30" />
                                      </div>
                                    )}
                                  </div>
                                  <span className="flex-1 font-medium text-xs truncate">{component.title}</span>
                                  {component.retailPrice && (
                                    <span className="text-green-400 font-semibold text-xs">
                                      ${component.retailPrice}
                                    </span>
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

                {/* Bottom action bar */}
                <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-400">Subtotal ({itemCount} items)</p>
                      <p className="text-2xl font-bold text-[#C8A55C]">${Number.parseFloat(subtotal).toFixed(2)}</p>
                    </div>
                    {totalSavings > 0 && (
                      <div className="bg-green-500/20 border border-green-500 rounded-lg px-3 py-1.5">
                        <p className="text-xs text-green-300">Total Savings</p>
                        <p className="text-lg font-bold text-green-400">${totalSavings.toFixed(2)}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href="/cart" onClick={(e) => e.stopPropagation()}>
                      <Button className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 font-semibold px-6 py-4 text-sm rounded-xl">
                        View Cart
                      </Button>
                    </Link>
                    <Link href="/cart" onClick={(e) => e.stopPropagation()}>
                      <Button className="bg-[#E63946] hover:bg-[#d32f3c] text-white font-bold px-8 py-4 text-base rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
