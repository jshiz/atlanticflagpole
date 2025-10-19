"use client"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, Package, Shield, Truck, Award } from "lucide-react"
import { useState, useEffect } from "react"
import { getBundleConfig } from "@/lib/bundles/bundle-config"
import { useRouter } from "next/router"

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
  const router = useRouter()

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

  const subtotal = cart?.cost?.subtotalAmount ? Number.parseFloat(cart.cost.subtotalAmount.amount) : 0
  const total = cart?.cost?.totalAmount ? Number.parseFloat(cart.cost.totalAmount.amount) : 0

  if (isEmpty) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-12 text-center shadow-xl">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0B1C2C] mb-3">Your Cart is Empty</h2>
            <p className="text-[#0B1C2C]/70 mb-8 text-lg">Start shopping for premium American-made flagpoles!</p>
            <Button asChild size="lg" className="bg-[#C8A55C] hover:bg-[#a88947] text-white px-8">
              <Link href="/collections/flagpoles">Shop Flagpoles</Link>
            </Button>
          </Card>
        </div>
      </main>
    )
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  const renderCartLine = (line: any) => {
    const product = line.merchandise.product
    const variant = line.merchandise
    const price = Number.parseFloat(line.cost.totalAmount.amount)
    const productImages = product.images?.edges ? product.images.edges.map((edge: any) => edge.node) : []
    const image = productImages[0] || variant.image
    const bundleConfig = getBundleConfig(product.handle)
    const componentsWithImages = bundleComponentImages[line.id] || bundleConfig?.components || []

    return (
      <Card key={line.id} className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Column 1: Product Image & Bundle Items */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-md">
              {image ? (
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.altText || product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Bundle Items with Plus Signs */}
            {componentsWithImages.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-green-700" />
                  <h4 className="font-bold text-green-800 text-sm">Premier Kit Included</h4>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {componentsWithImages.slice(0, 6).map((component: any, idx: number) => (
                    <div key={idx} className="relative">
                      <div className="aspect-square rounded-md overflow-hidden bg-white shadow-sm border border-green-200">
                        {component.imageUrl ? (
                          <Image
                            src={component.imageUrl || "/placeholder.svg"}
                            alt={component.imageAlt || component.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <Package className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                      </div>
                      {/* Plus sign badge in bottom right */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                        <Plus className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
                {componentsWithImages.length > 6 && (
                  <p className="text-xs text-green-700 mt-2 text-center font-semibold">
                    +{componentsWithImages.length - 6} more items
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <Link
                href={`/products/${product.handle}`}
                className="text-xl font-serif font-bold text-[#0B1C2C] hover:text-[#C8A55C] transition-colors line-clamp-2 mb-2"
              >
                {product.title}
              </Link>
              {variant.title !== "Default Title" && (
                <p className="text-sm text-[#0B1C2C]/70 mb-3 font-medium">{variant.title}</p>
              )}

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  <Shield className="w-3 h-3" />
                  <span>Lifetime Warranty</span>
                </div>
                <div className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                  <Award className="w-3 h-3" />
                  <span>Made in USA</span>
                </div>
                <div className="flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                  <Truck className="w-3 h-3" />
                  <span>Free Shipping</span>
                </div>
              </div>

              {/* Bundle details */}
              {componentsWithImages.length > 0 && (
                <div className="bg-white border border-green-200 rounded-lg p-3 space-y-1">
                  <p className="text-xs font-bold text-green-800 mb-2">Includes:</p>
                  {componentsWithImages.slice(0, 4).map((component: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span className="line-clamp-1">{component.title}</span>
                    </div>
                  ))}
                  {componentsWithImages.length > 4 && (
                    <p className="text-xs text-green-600 font-semibold pt-1">
                      + {componentsWithImages.length - 4} more items
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Price & Actions */}
          <div className="flex flex-col justify-between items-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(line.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </Button>

            <div className="text-right space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-3xl font-bold text-[#C8A55C]">${price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-3 border-2 border-gray-300 rounded-lg p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-gray-100"
                  onClick={() => updateCartLine(line.id, line.quantity - 1)}
                  disabled={line.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-bold text-lg">{line.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-gray-100"
                  onClick={() => updateCartLine(line.id, line.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F3EF] to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C]">Shopping Cart</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">Secure Checkout</p>
            <div className="flex items-center gap-1 text-green-600">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-semibold">SSL Encrypted</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {lines.map((line) => renderCartLine(line))}

            {/* Upsell Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-6">
              <h3 className="text-lg font-bold text-[#0B1C2C] mb-4">Complete Your Setup</h3>
              <div className="grid grid-cols-3 gap-4">
                {/* Placeholder for upsell products */}
                <div className="text-center">
                  <div className="aspect-square bg-white rounded-lg mb-2" />
                  <p className="text-xs font-semibold">Solar Light</p>
                  <p className="text-sm font-bold text-[#C8A55C]">$49.99</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4 shadow-xl">
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#0B1C2C]">
                  <span>
                    Subtotal ({lines.length} {lines.length === 1 ? "item" : "items"})
                  </span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span>FREE</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4 flex justify-between text-xl font-bold text-[#0B1C2C]">
                  <span>Total</span>
                  <span className="text-[#C8A55C]">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white py-6 text-lg font-bold shadow-lg"
              >
                Proceed to Checkout
              </Button>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>Lifetime Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Truck className="w-5 h-5 text-purple-600" />
                  <span>Free Shipping & Returns</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
