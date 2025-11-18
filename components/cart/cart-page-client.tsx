"use client"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, Package, Shield, Truck, Award, Zap, MapPin, Tag, X, Star, CheckCircle2, Wind, Sun, Snowflake, Lightbulb, Anchor, Settings } from 'lucide-react'
import { useState, useEffect, useCallback, useRef } from "react"
import { getBundleConfig } from "@/lib/bundles/bundle-config"
import { useRouter } from 'next/navigation'
import { useGeo } from "@/lib/geo/context"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { ExpressCheckoutButtons } from "@/components/cart/express-checkout-buttons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BundleComponentWithImage {
  title: string
  handle: string
  variantTitle?: string
  quantity: number
  notes?: string
  imageUrl?: string
  imageAlt?: string
  retailPrice?: number
}

const getProductHighlights = (product: any) => {
  const title = product.title.toLowerCase()
  const handle = product.handle.toLowerCase()
  
  // Default fallback
  let description = "Experience premium quality with this authentic American-made product. Built for durability and designed to impress."
  let highlights = [
    { icon: Star, text: "Premium Quality", color: "text-yellow-600", bg: "bg-yellow-50" },
    { icon: Shield, text: "Durable Build", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: CheckCircle2, text: "Satisfaction Guaranteed", color: "text-green-600", bg: "bg-green-50" }
  ]

  // Specific Category Logic
  if (title.includes("christmas") || title.includes("tree") || handle.includes("christmas")) {
    description = "Transform your flagpole into a stunning holiday display! This festive lighting system creates a magical Christmas tree effect that will be the envy of the neighborhood."
    highlights = [
      { icon: Snowflake, text: "Festive Holiday Display", color: "text-blue-600", bg: "bg-blue-50" },
      { icon: Lightbulb, text: "Ultra-Bright LEDs", color: "text-yellow-600", bg: "bg-yellow-50" },
      { icon: Zap, text: "Easy Setup", color: "text-green-600", bg: "bg-green-50" },
      { icon: Star, text: "Weather Resistant", color: "text-slate-600", bg: "bg-slate-100" }
    ]
  } else if (title.includes("eagle") || title.includes("finial") || title.includes("topper")) {
    description = "Crown your flagpole with majesty. This exquisite finial features stunning detail and a durable finish that resists weathering, ensuring your display looks proud for years."
    highlights = [
      { icon: Award, text: "Hand-Painted Detail", color: "text-amber-600", bg: "bg-amber-50" },
      { icon: Sun, text: "UV Resistant Finish", color: "text-orange-600", bg: "bg-orange-50" },
      { icon: Shield, text: "Heavy-Duty Material", color: "text-slate-600", bg: "bg-slate-100" }
    ]
  } else if (title.includes("solar") || title.includes("light") || handle.includes("light")) {
    description = "Illuminate your flag all night long. Our high-efficiency solar lights feature ultra-bright LEDs and smart dusk-to-dawn sensors for automatic operation."
    highlights = [
      { icon: Sun, text: "Solar Powered", color: "text-yellow-600", bg: "bg-yellow-50" },
      { icon: Zap, text: "Dusk-to-Dawn Sensor", color: "text-purple-600", bg: "bg-purple-50" },
      { icon: Lightbulb, text: "Ultra-Bright Output", color: "text-blue-600", bg: "bg-blue-50" }
    ]
  } else if (title.includes("flagpole") || handle.includes("flagpole")) {
    description = "The last flagpole you will ever need. Engineered with aircraft-grade aluminum for unmatched strength and a patented telescoping design for easy operation."
    highlights = [
      { icon: Shield, text: "Aircraft-Grade Aluminum", color: "text-slate-600", bg: "bg-slate-100" },
      { icon: Wind, text: "360° No-Wrap Swivel", color: "text-blue-600", bg: "bg-blue-50" },
      { icon: Zap, text: "Easy Telescoping", color: "text-amber-600", bg: "bg-amber-50" },
      { icon: CheckCircle2, text: "Wind Rated 95+ MPH", color: "text-green-600", bg: "bg-green-50" }
    ]
  } else if (title.includes("flag") || handle.includes("flag")) {
    description = "Fly your pride high with our vibrant, fade-resistant flags. Crafted from heavy-duty SolarMax nylon with reinforced stitching to withstand the elements."
    highlights = [
      { icon: Sun, text: "Fade Resistant", color: "text-orange-600", bg: "bg-orange-50" },
      { icon: Wind, text: "Fly-End Stitching", color: "text-blue-600", bg: "bg-blue-50" },
      { icon: Award, text: "Made in USA", color: "text-red-600", bg: "bg-red-50" }
    ]
  } else if (title.includes("mount") || title.includes("bracket") || title.includes("sleeve")) {
    description = "Secure your flagpole with confidence. This heavy-duty mounting hardware is designed for maximum stability and easy installation in any environment."
    highlights = [
      { icon: Anchor, text: "Heavy-Duty Steel", color: "text-slate-700", bg: "bg-slate-100" },
      { icon: Settings, text: "Easy Installation", color: "text-green-600", bg: "bg-green-50" },
      { icon: Shield, text: "Rust Resistant", color: "text-orange-600", bg: "bg-orange-50" }
    ]
  } else if (title.includes("collar") || title.includes("flash")) {
    description = "Give your flagpole a polished, professional look while protecting the base. This flash collar adds the perfect finishing touch to your installation."
    highlights = [
      { icon: Star, text: "Polished Finish", color: "text-yellow-600", bg: "bg-yellow-50" },
      { icon: Shield, text: "Base Protection", color: "text-blue-600", bg: "bg-blue-50" },
      { icon: CheckCircle2, text: "Perfect Fit", color: "text-green-600", bg: "bg-green-50" }
    ]
  }

  return { description, highlights }
}

export function CartPageClient() {
  const { cart, loading, updateCartLine, removeFromCart, addToCart } = useCart()
  const [expandedBundles, setExpandedBundles] = useState<Set<string>>(new Set())
  const [bundleComponentImages, setBundleComponentImages] = useState<Record<string, BundleComponentWithImage[]>>({})
  const router = useRouter()
  const { location, loading: geoLoading } = useGeo()
  const [geoProducts, setGeoProducts] = useState<ShopifyProduct[]>([])
  const [addingProducts, setAddingProducts] = useState<Set<string>>(new Set())

  const [isUpdating, setIsUpdating] = useState(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlDiscount = params.get("discount")
    if (urlDiscount) {
      // Auto-apply the discount code
      setTimeout(() => {
        const applyBtn = document.getElementById("apply-discount-btn")
        if (applyBtn) {
          applyBtn.click()
        }
      }, 500)
    }
  }, [])

  const handleCartUpdate = useCallback(
    async (updateFn: () => Promise<void>) => {
      if (isUpdating) {
        console.log("[v0] Cart update already in progress, skipping")
        return
      }

      setIsUpdating(true)
      try {
        await updateFn()
      } catch (error) {
        console.error("[v0] Cart update failed:", error)
      } finally {
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current)
        }
        updateTimeoutRef.current = setTimeout(() => {
          setIsUpdating(false)
        }, 300)
      }
    },
    [isUpdating],
  )

  const handleCheckout = useCallback(() => {
    if (!isUpdating) {
      router.push("/checkout")
    }
  }, [router, isUpdating])

  const handleQuickAdd = useCallback(
    async (product: ShopifyProduct) => {
      // Don't add if already adding this product
      if (addingProducts.has(product.id)) {
        console.log("[v0] Already adding product:", product.id)
        return
      }

      const variantId = product.variants.edges[0]?.node.id
      if (variantId) {
        setAddingProducts((prev) => new Set(prev).add(product.id))
        try {
          await addToCart(variantId, 1)
        } finally {
          // Remove from adding set after a short delay
          setTimeout(() => {
            setAddingProducts((prev) => {
              const next = new Set(prev)
              next.delete(product.id)
              return next
            })
          }, 1000)
        }
      }
    },
    [addToCart, addingProducts],
  )

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const fetchGeoProducts = async () => {
      try {
        console.log("[v0] Cart - fetching geo products, location:", location)

        const response = await fetch("/api/geo/products")
        if (!response.ok) {
          throw new Error(`Failed to fetch geo products: ${response.status}`)
        }
        const data = await response.json()

        console.log("[v0] Cart - geo products response:", data)

        if (data.products && Array.isArray(data.products)) {
          setGeoProducts(data.products.slice(0, 4))
          console.log("[v0] Cart - set", data.products.length, "geo products")
        }
      } catch (error) {
        console.error("[v0] Cart - failed to fetch geo products:", error)
      }
    }

    fetchGeoProducts()
  }, [location])

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
    )
  }

  const renderCartLine = (line: any) => {
    const product = line.merchandise.product
    const variant = line.merchandise
    const price = Number.parseFloat(line.cost.totalAmount.amount)
    const productImages = product.images?.edges ? product.images.edges.map((edge: any) => edge.node) : []
    const image = productImages[0] || variant.image
    const bundleConfig = getBundleConfig(product.handle)
    const componentsWithImages = bundleComponentImages[line.id] || bundleConfig?.components || []

    const hasPremierKit = componentsWithImages.length > 0
    const premierKitValue = hasPremierKit
      ? componentsWithImages.reduce((sum: number, c: any) => sum + (c.retailPrice || 0) * c.quantity, 0)
      : 0

    const { description, highlights } = getProductHighlights(product)

    return (
      <Card key={line.id} className="overflow-hidden border-l-4 border-l-[#C8A55C]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          {/* Column 1: Product Image & Bundle Items (3 cols - 25%) */}
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
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

              {hasPremierKit && (
                <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-xl p-4 border-2 border-green-400 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shadow-md shrink-0">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-green-900 text-sm truncate">Premier Kit Included!</h4>
                      <p className="text-xs text-green-700 font-semibold">${premierKitValue.toFixed(2)} Value</p>
                    </div>
                    <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md shrink-0">FREE</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {componentsWithImages.slice(0, 6).map((component: any, idx: number) => (
                      <div key={idx} className="relative">
                        <div className="aspect-square rounded-md overflow-hidden bg-white shadow-sm border-2 border-green-300">
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
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                          <Plus className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                  {componentsWithImages.length > 6 && (
                    <p className="text-xs text-green-700 mt-2 text-center font-semibold bg-green-200 rounded py-1">
                      +{componentsWithImages.length - 6} more items included
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Product Details (6 cols - 50%) */}
          <div className="md:col-span-5 lg:col-span-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="text-center md:text-left">
                <Link
                  href={`/products/${product.handle}`}
                  className="text-2xl md:text-3xl font-serif font-bold text-[#0B1C2C] hover:text-[#C8A55C] transition-colors block leading-tight text-balance"
                >
                  {product.title}
                </Link>
                {variant.title !== "Default Title" && (
                  <div className="mt-2 flex justify-center md:justify-start">
                    <span className="text-sm font-semibold text-[#0B1C2C]/80 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      {variant.title}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-base text-gray-600 leading-relaxed border-l-4 border-[#C8A55C] pl-4 py-1 italic bg-gray-50/50 rounded-r-lg text-left">
                {description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className={`flex items-center gap-3 text-sm px-3 py-2 rounded-lg border ${highlight.bg} border-opacity-60 shadow-sm justify-center md:justify-start`}>
                    <div className={`p-1.5 rounded-full bg-white shadow-sm ${highlight.color} shrink-0`}>
                      <highlight.icon className="w-4 h-4" />
                    </div>
                    <span className={`font-bold ${highlight.color.replace('text-', 'text-opacity-90 ')}`}>{highlight.text}</span>
                  </div>
                ))}
              </div>

              {hasPremierKit && (
                <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm mt-4 text-left">
                  <p className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2 border-b border-green-100 pb-2">
                    <Package className="w-4 h-4" />
                    Premier Kit Contents
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {componentsWithImages.slice(0, 6).map((component: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-sm shrink-0" />
                        <span className="truncate font-medium">{component.title}</span>
                        {component.quantity > 1 && (
                          <span className="text-green-600 font-bold text-[10px] bg-green-50 px-1.5 rounded border border-green-100">x{component.quantity}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  {componentsWithImages.length > 6 && (
                    <p className="text-xs text-green-700 font-bold pt-2 mt-2 text-center border-t border-green-100">
                      + {componentsWithImages.length - 6} more items included
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Price & Actions (3 cols - 25%) */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col justify-between items-center md:items-end h-full border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6 mt-6 md:mt-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCartUpdate(() => removeFromCart(line.id))}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-2 px-3 mb-4 md:mb-0"
              disabled={isUpdating}
            >
              <Trash2 className="w-4 h-4" />
              <span className="inline md:hidden">Remove</span>
              <span className="hidden md:inline">Remove Item</span>
            </Button>

            <div className="text-center md:text-right space-y-6 w-full md:w-auto flex flex-col items-center md:items-end">
              <div>
                <p className="text-sm text-gray-500 mb-1 font-medium">Total Price</p>
                <p className="text-3xl md:text-4xl font-bold text-[#C8A55C] tracking-tight">${price.toFixed(2)}</p>
              </div>

              <div className="flex items-center justify-center md:justify-end gap-3 bg-gray-50 rounded-xl p-1.5 border border-gray-200 w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                  onClick={() => handleCartUpdate(() => updateCartLine(line.id, line.quantity - 1))}
                  disabled={line.quantity <= 1 || isUpdating}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-bold text-lg text-[#0B1C2C]">{line.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                  onClick={() => handleCartUpdate(() => updateCartLine(line.id, line.quantity + 1))}
                  disabled={isUpdating}
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C]">Shopping Cart</h1>
          <p className="text-[#0B1C2C]/60 mt-2">
            {lines.length} {lines.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
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

          {geoProducts.length > 0 && (
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-700" />
                <h3 className="text-lg font-bold text-[#0B1C2C]">
                  Popular in {location?.region || location?.city || "Your Area"}
                </h3>
                {location?.region_code && (
                  <span className="ml-auto text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">
                    {location.region_code}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {geoProducts.map((product) => {
                  const isAdding = addingProducts.has(product.id)
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link href={`/products/${product.handle}`} className="block">
                        {product.featuredImage && (
                          <div className="relative aspect-square mb-2 rounded overflow-hidden">
                            <Image
                              src={product.featuredImage.url || "/placeholder.svg"}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="text-xs font-semibold text-[#0B1C2C] line-clamp-2 mb-1">{product.title}</p>
                        <p className="text-sm font-bold text-[#C8A55C]">
                          ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                        </p>
                      </Link>
                      <Button
                        size="sm"
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1"
                        onClick={() => handleQuickAdd(product)}
                        disabled={isAdding}
                      >
                        {isAdding ? "Adding..." : "Add to Cart"}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}
        </div>

        {/* Order Summary - Sticky */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-24 shadow-xl border-2 border-[#C8A55C]/20">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3 text-center">Order Summary</h2>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-[#0B1C2C] text-base">
                <span>
                  Subtotal ({lines.length} {lines.length === 1 ? "item" : "items"})
                </span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-2 flex justify-between text-xl font-bold text-[#0B1C2C]">
                <span>Total</span>
                <span className="text-[#C8A55C]">${total.toFixed(2)}</span>
              </div>
            </div>

            <ExpressCheckoutButtons cartId={cart?.id} />

            <div className="my-3">
              <div className="relative w-full h-40">
                <Image
                  src="/images/safecheckout.png"
                  alt="Guaranteed Safe Checkout - McAfee, Norton, Visa, MasterCard, Amex, Discover, PayPal"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="flex flex-col items-center justify-center text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                <Shield className="w-5 h-5 text-[#C8A55C] mb-1" />
                <span className="text-[10px] font-bold text-[#0B1C2C] leading-tight">Lifetime<br/>Warranty</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                <Award className="w-5 h-5 text-[#C8A55C] mb-1" />
                <span className="text-[10px] font-bold text-[#0B1C2C] leading-tight">Made in<br/>USA</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                <Truck className="w-5 h-5 text-[#C8A55C] mb-1" />
                <span className="text-[10px] font-bold text-[#0B1C2C] leading-tight">Fast<br/>Shipping</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              size="lg"
              className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white py-6 text-lg font-bold shadow-[0_0_15px_rgba(200,165,92,0.5)] hover:shadow-[0_0_25px_rgba(200,165,92,0.7)] transition-all transform hover:scale-[1.02]"
              disabled={isUpdating}
            >
              PROCEED TO CHECKOUT
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
