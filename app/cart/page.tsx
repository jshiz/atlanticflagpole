"use client"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ChevronDown, Package } from "lucide-react"
import { useState, useEffect } from "react"
import { getBundleConfig } from "@/lib/bundles/bundle-config"

interface BundleComponentWithImage {
  title: string
  handle: string
  variantTitle?: string
  quantity: number
  notes?: string
  imageUrl?: string
  imageAlt?: string
}

export default function CartPage() {
  const { cart, loading, updateCartLine, removeFromCart } = useCart()
  const [expandedBundles, setExpandedBundles] = useState<Set<string>>(new Set())
  const [bundleComponentImages, setBundleComponentImages] = useState<Record<string, BundleComponentWithImage[]>>({})

  console.log("[v0] Cart page - cart:", cart)
  console.log("[v0] Cart page - checkoutUrl:", cart?.checkoutUrl)

  useEffect(() => {
    const fetchBundleComponentImages = async () => {
      if (!cart?.lines?.edges) return

      const lines = cart.lines.edges.map((edge) => edge.node)
      const newBundleComponentImages: Record<string, BundleComponentWithImage[]> = {}

      for (const line of lines) {
        const productHandle = line.merchandise.product.handle
        const bundleConfig = getBundleConfig(productHandle)

        if (bundleConfig && bundleConfig.components.length > 0) {
          const componentsWithImages: BundleComponentWithImage[] = []

          for (const component of bundleConfig.components) {
            try {
              // Fetch product data for each component
              const response = await fetch(`/api/shopify/product?handle=${component.handle}`)
              if (response.ok) {
                const productData = await response.json()
                const image = productData.images?.edges?.[0]?.node

                componentsWithImages.push({
                  ...component,
                  imageUrl: image?.url || undefined,
                  imageAlt: image?.altText || component.title,
                })
              } else {
                // If fetch fails, add component without image
                componentsWithImages.push(component)
              }
            } catch (error) {
              console.error(`[v0] Error fetching image for ${component.handle}:`, error)
              componentsWithImages.push(component)
            }
          }

          newBundleComponentImages[line.id] = componentsWithImages
        }
      }

      setBundleComponentImages(newBundleComponentImages)
    }

    fetchBundleComponentImages()
  }, [cart])

  useEffect(() => {
    if (cart?.lines?.edges) {
      const lines = cart.lines.edges.map((edge) => edge.node)
      const bundleParentIds = new Set<string>()

      lines.forEach((line) => {
        const bundleParent = line.attributes?.find((attr: any) => attr.key === "BundleParent")?.value
        if (bundleParent) {
          bundleParentIds.add(bundleParent)
        }
      })

      setExpandedBundles(bundleParentIds)
    }
  }, [cart])

  const lines = cart?.lines?.edges ? cart.lines.edges.map((edge) => edge.node) : []
  const isEmpty = lines.length === 0

  const groupedLines = lines.reduce(
    (acc, line) => {
      const productHandle = line.merchandise.product.handle
      const bundleConfig = getBundleConfig(productHandle)

      // Check if this is a bundle product
      if (bundleConfig && bundleConfig.includesPremier) {
        // This is a bundle parent - add to regular lines
        acc.regular.push(line)
        // Store bundle config for later use
        acc.bundleConfigs[line.id] = bundleConfig
      } else {
        // Regular product
        acc.regular.push(line)
      }

      return acc
    },
    {
      regular: [] as any[],
      bundleConfigs: {} as Record<string, any>,
    },
  )

  const toggleBundle = (bundleId: string) => {
    setExpandedBundles((prev) => {
      const next = new Set(prev)
      if (next.has(bundleId)) {
        next.delete(bundleId)
      } else {
        next.add(bundleId)
      }
      return next
    })
  }

  const subtotal = cart?.cost?.subtotalAmount ? Number.parseFloat(cart.cost.subtotalAmount.amount) : 0
  const total = cart?.cost?.totalAmount ? Number.parseFloat(cart.cost.totalAmount.amount) : 0

  if (isEmpty) {
    return (
      <main className="min-h-screen bg-[#F5F3EF]">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-8 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-2">Your cart is empty</h2>
            <p className="text-[#0B1C2C]/70 mb-6">Add some premium flagpoles to get started!</p>
            <Button asChild className="bg-[#C8A55C] hover:bg-[#a88947]">
              <Link href="/products">Shop Products</Link>
            </Button>
          </Card>
        </div>
      </main>
    )
  }

  const handleCheckout = () => {
    console.log("[v0] Checkout button clicked, redirecting to:", cart?.checkoutUrl)
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl
    } else {
      console.error("[v0] No checkout URL available")
    }
  }

  const renderCartLine = (line: any, isIncluded = false) => {
    const product = line.merchandise.product
    const variant = line.merchandise
    const price = Number.parseFloat(line.cost.totalAmount.amount)
    const productImages = product.images?.edges ? product.images.edges.map((edge: any) => edge.node) : []
    const image = productImages[0] || variant.image

    return (
      <div
        key={line.id}
        className={`flex gap-4 ${isIncluded ? "pl-12 py-3 border-l-4 border-green-500 bg-green-50/30" : "p-4"}`}
      >
        <div
          className={`relative flex-shrink-0 rounded-lg overflow-hidden bg-white ${isIncluded ? "w-16 h-16" : "w-24 h-24"}`}
        >
          {image ? (
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.altText || product.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-xs">No image</span>
            </div>
          )}
          {isIncluded && (
            <div className="absolute inset-0 bg-green-600/10 flex items-center justify-center">
              <span className="text-lg font-bold text-green-700">✓</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <Link
            href={`/products/${product.handle}`}
            className={`font-semibold text-[#0B1C2C] hover:text-[#C8A55C] transition-colors line-clamp-2 ${isIncluded ? "text-sm" : ""}`}
          >
            {product.title}
          </Link>
          {variant.title !== "Default Title" && (
            <p className={`text-[#0B1C2C]/70 mt-1 ${isIncluded ? "text-xs" : "text-sm"}`}>{variant.title}</p>
          )}
          {isIncluded && (
            <p className="text-xs text-green-700 font-semibold mt-1 flex items-center gap-1">
              <Package className="w-3 h-3" />
              Included in Premier Kit
            </p>
          )}
          {!isIncluded && <p className="text-lg font-bold text-[#0B1C2C] mt-2">${price.toFixed(2)}</p>}
        </div>

        {!isIncluded && (
          <div className="flex flex-col items-end justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(line.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2 border border-gray-300 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateCartLine(line.id, line.quantity - 1)}
                disabled={line.quantity <= 1}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center font-semibold">{line.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateCartLine(line.id, line.quantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderBundleComponent = (component: BundleComponentWithImage, index: number) => {
    return (
      <div key={index} className="flex gap-4 pl-12 py-3 border-l-4 border-green-500 bg-green-50/30">
        <div className="relative flex-shrink-0 rounded-lg overflow-hidden bg-white w-16 h-16">
          {component.imageUrl ? (
            <Image
              src={component.imageUrl || "/placeholder.svg"}
              alt={component.imageAlt || component.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-green-600/10 flex items-center justify-center">
            <span className="text-lg font-bold text-green-700">✓</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <Link
            href={`/products/${component.handle}`}
            className="font-semibold text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm line-clamp-2"
          >
            {component.title}
          </Link>
          {component.variantTitle && <p className="text-xs text-[#0B1C2C]/70 mt-1">{component.variantTitle}</p>}
          {component.notes && <p className="text-xs text-[#0B1C2C]/60 mt-1 italic">{component.notes}</p>}
          <p className="text-xs text-green-700 font-semibold mt-1 flex items-center gap-1">
            <Package className="w-3 h-3" />
            Included in Premier Kit • Qty: {component.quantity}
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {groupedLines.regular.map((line) => {
              const bundleConfig = groupedLines.bundleConfigs[line.id]
              const componentsWithImages = bundleComponentImages[line.id] || bundleConfig?.components || []
              const hasBundleItems = componentsWithImages.length > 0
              const isExpanded = expandedBundles.has(line.id)

              return (
                <Card key={line.id}>
                  {renderCartLine(line)}
                  {hasBundleItems && (
                    <Collapsible open={isExpanded} onOpenChange={() => toggleBundle(line.id)}>
                      <CollapsibleTrigger className="w-full px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 border-t-2 border-green-300 flex items-center justify-between hover:from-green-100 hover:to-green-200 transition-colors">
                        <div className="flex items-center gap-2">
                          <Package className="w-5 h-5 text-green-700" />
                          <span className="text-sm font-bold text-green-800">
                            Premier Kit Included ({componentsWithImages.length} items)
                          </span>
                          {bundleConfig?.flagSize && (
                            <span className="text-xs text-green-700 ml-2">• Flag: {bundleConfig.flagSize}</span>
                          )}
                          {bundleConfig?.groundSleeveSize && (
                            <span className="text-xs text-green-700">• Sleeve: {bundleConfig.groundSleeveSize}</span>
                          )}
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-green-700 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="bg-white">
                        {componentsWithImages.map((component: BundleComponentWithImage, index: number) =>
                          renderBundleComponent(component, index),
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-serif font-bold text-[#0B1C2C] mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#0B1C2C]">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#0B1C2C]/70 text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-[#0B1C2C]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white py-6 text-lg"
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-[#0B1C2C]/60 text-center mt-4">Taxes and shipping calculated at checkout</p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
