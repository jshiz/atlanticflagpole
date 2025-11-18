"use client"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, Package, Shield, Truck, Award, Zap, MapPin, Tag, X, Star, CheckCircle2, Wind, Sun, Snowflake, Lightbulb, Anchor, Settings, TrendingUp, Sparkles, Lock } from 'lucide-react'
import { useState, useEffect, useCallback, useRef } from "react"
import { getBundleConfig } from "@/lib/bundles/bundle-config"
import { useRouter } from 'next/navigation'
import { useGeo } from "@/lib/geo/context"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { ExpressCheckoutButtons } from "@/components/cart/express-checkout-buttons"
import { CartCountdownTimer } from "@/components/cart/cart-countdown-timer"
import { CartSupportSection } from "@/components/cart/cart-support-section"
import { ProtectionPlanModal } from "./protection-plan-modal"

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
  const [isProtectionModalOpen, setIsProtectionModalOpen] = useState(false)

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

  const calculateRetailValue = () => {
    let retailValue = subtotal
    
    // Add premier kit values
    lines.forEach((line) => {
      const componentsWithImages = bundleComponentImages[line.id] || []
      if (componentsWithImages.length > 0) {
        const premierKitValue = componentsWithImages.reduce(
          (sum: number, c: any) => sum + (c.retailPrice || 0) * c.quantity, 
          0
        )
        retailValue += premierKitValue
      }
    })
    
    return retailValue
  }

  const retailValue = calculateRetailValue()
  const savings = retailValue - subtotal

  const handleAddProtectionPlan = (planType: "monthly" | "2year") => {
    // Placeholder for adding the plan to cart
    console.log(`Adding ${planType} protection plan`)
    setIsProtectionModalOpen(false)
    // You would call addItem() here with the specific variant ID for the plan
  }

  useEffect(() => {
    // Show modal after a short delay if items are in cart and modal hasn't been shown this session
    const hasShownModal = sessionStorage.getItem("hasShownProtectionModal")
    if (cart && cart.lines.edges.length > 0 && !hasShownModal) {
      const timer = setTimeout(() => {
        setIsProtectionModalOpen(true)
        sessionStorage.setItem("hasShownProtectionModal", "true")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [cart])

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
    
    // Calculate total value for this item (price + potential savings/premier kit)
    // For display purposes, let's assume a 20% markup as "retail value" if no premier kit, 
    // or use the premier kit value if present.
    const itemRetailValue = hasPremierKit 
      ? price + premierKitValue 
      : price * 1.2

    const { description, highlights } = getProductHighlights(product)

    return (
      <Card key={line.id} className="overflow-hidden border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column: Image & Controls */}
            <div className="w-full md:w-48 shrink-0 flex flex-col gap-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
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
              
              {/* Quantity & Remove - Below Image */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9 w-full max-w-[120px]">
                  <button
                    className="px-3 h-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                    onClick={() => handleCartUpdate(() => updateCartLine(line.id, line.quantity - 1))}
                    disabled={line.quantity <= 1 || isUpdating}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="flex-1 text-center text-sm font-medium">{line.quantity}</span>
                  <button
                    className="px-3 h-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                    onClick={() => handleCartUpdate(() => updateCartLine(line.id, line.quantity + 1))}
                    disabled={isUpdating}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => handleCartUpdate(() => removeFromCart(line.id))}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  disabled={isUpdating}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Middle Column: Details */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <Link
                    href={`/products/${product.handle}`}
                    className="text-xl font-bold text-[#0B1C2C] hover:text-[#C8A55C] transition-colors block leading-tight"
                  >
                    {product.title}
                  </Link>
                  {variant.title !== "Default Title" && (
                    <p className="text-sm text-gray-500 mt-1">Size: {variant.title}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-bold text-[#0B1C2C]">${price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 line-through decoration-red-500 decoration-1">
                    Total Value ${itemRetailValue.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Trial Badge */}
              <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-2 py-1">
                <Shield className="w-3 h-3 text-[#C8A55C]" />
                <span className="text-xs font-bold text-[#0B1C2C]">365-Day Home Trial</span>
              </div>

              {/* Premier Kit / Bundle Items */}
              {hasPremierKit && (
                <div className="mt-3">
                  <p className="text-sm font-bold text-green-700 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Included in Bundle:
                  </p>
                  <div className="space-y-1.5">
                    {componentsWithImages.slice(0, 4).map((component: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{component.title}</span>
                      </div>
                    ))}
                    {componentsWithImages.length > 4 && (
                      <p className="text-xs text-gray-500 pl-6">+ {componentsWithImages.length - 4} more items</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Upsell Checkbox Area (Mockup for now, could be dynamic) */}
          <div className="mt-6 pt-4 border-t border-gray-100">
             <label className="flex items-start gap-3 cursor-pointer group">
               <div className="relative flex items-center">
                 <input type="checkbox" className="peer h-5 w-5 rounded border-gray-300 text-[#C8A55C] focus:ring-[#C8A55C]" />
               </div>
               <div className="text-sm">
                 <span className="font-bold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors">Add Lifetime Theft Protection</span>
                 <span className="text-gray-500 mx-1">-</span>
                 <span className="font-bold text-[#0B1C2C]">$29.00</span>
                 <p className="text-gray-500 text-xs mt-0.5">Protect your investment against theft or vandalism forever.</p>
               </div>
             </label>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProtectionPlanModal 
        isOpen={isProtectionModalOpen} 
        onClose={() => setIsProtectionModalOpen(false)}
        onAddPlan={handleAddProtectionPlan}
      />
      <CartCountdownTimer />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C]">Your Cart</h1>
          <p className="text-[#0B1C2C]/60 mt-2">
            {lines.length} {lines.length === 1 ? "item" : "items"}
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
            <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-[#C8A55C] p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-[#C8A55C] rounded-lg shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0B1C2C]">
                    Complete Your Setup
                  </h3>
                  <p className="text-sm text-gray-600">
                    Popular additions in {location?.region || location?.city || "your area"}
                  </p>
                </div>
                {location?.region_code && (
                  <span className="text-xs bg-[#C8A55C] text-white px-3 py-1.5 rounded-full font-bold shadow-md">
                    {location.region_code}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {geoProducts.map((product) => {
                  const isAdding = addingProducts.has(product.id)
                  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
                  
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-[#C8A55C] group"
                    >
                      <Link href={`/products/${product.handle}`} className="block">
                        {product.featuredImage && (
                          <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-50">
                            <Image
                              src={product.featuredImage.url || "/placeholder.svg"}
                              alt={product.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        )}
                        <p className="text-sm font-bold text-[#0B1C2C] line-clamp-2 mb-2 min-h-[2.5rem]">{product.title}</p>
                        <div className="flex items-baseline gap-1 mb-3">
                          <p className="text-lg font-bold text-[#C8A55C]">
                            ${price.toFixed(2)}
                          </p>
                          {price > 50 && (
                            <p className="text-xs text-gray-400 line-through">
                              ${(price * 1.3).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </Link>
                      <Button
                        size="sm"
                        className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white font-bold shadow-md hover:shadow-lg transition-all"
                        onClick={() => handleQuickAdd(product)}
                        disabled={isAdding}
                      >
                        {isAdding ? (
                          <>
                            <Plus className="w-4 h-4 mr-1 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-1" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}

          <CartSupportSection />
        </div>

        {/* Order Summary - Sticky */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24 shadow-lg border border-gray-200 bg-white">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6 border-b border-gray-100 pb-4">Order Summary</h2>

            {/* Coupon Section */}
            <div className="bg-gray-50 rounded-md p-3 mb-6 flex items-center justify-between border border-gray-200">
               <div className="flex items-center gap-2">
                 <Tag className="w-4 h-4 text-[#C8A55C]" />
                 <span className="text-sm font-medium text-gray-700">Coupon Code</span>
               </div>
               <span className="text-xs text-gray-400 italic">Add at checkout</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-900 text-sm">
                <span>Total Value</span>
                <span className="line-through">${retailValue.toFixed(2)}</span>
              </div>
              
              {savings > 0 && (
                <div className="flex justify-between text-sm text-red-600 font-medium">
                  <span>Total Value Savings</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm text-gray-900">
                <span>Taxes</span>
                <span className="text-gray-500 italic">Calculated at checkout</span>
              </div>

              <div className="flex justify-between text-sm text-gray-900">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-baseline">
                <span className="text-xl font-bold text-[#0B1C2C]">Total</span>
                <span className="text-3xl font-bold text-[#C8A55C]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Banner */}
            <div className="bg-gray-100 rounded-md p-3 mb-6 flex items-center justify-center gap-2 text-sm text-gray-700 font-medium">
              <Truck className="w-4 h-4 text-gray-500" />
              <span>Ships in 1 - 2 business days</span>
            </div>

            <Button
              onClick={handleCheckout}
              size="lg"
              className="w-full bg-[#C8A55C] hover:bg-[#b69550] text-white h-14 text-lg font-bold shadow-md mb-4 relative overflow-hidden group"
              disabled={isUpdating}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Lock className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Proceed to Checkout</span>
            </Button>

            <div className="text-center mb-6">
              <p className="text-xs text-gray-500">
                As low as <span className="font-bold text-[#0B1C2C]">${(total / 12).toFixed(2)}/mo</span> with <span className="font-bold text-[#004cdd]">affirm</span>
              </p>
              <button className="text-xs text-blue-600 underline hover:text-blue-800 mt-1">
                See if you qualify
              </button>
            </div>

            <ExpressCheckoutButtons cartId={cart?.id} />

            {/* Trust Icons Grid */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#C8A55C]">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-gray-600 leading-tight">365-Day<br/>Home Trial</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#C8A55C]">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-gray-600 leading-tight">Lifetime<br/>Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#C8A55C]">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-gray-600 leading-tight">Free Shipping<br/>& Returns</span>
              </div>
            </div>

            {/* Affirm Banner */}
            <div className="mt-6 bg-[#F5F5F5] rounded-lg p-4 text-center">
               <span className="text-[#004cdd] font-bold text-lg block mb-1">affirm</span>
               <p className="text-sm font-medium text-gray-800">Big Dreams, Small Payments</p>
               <p className="text-xs text-gray-500 mt-1 mb-2">Check if you prequalify without affecting your credit score.</p>
               <button className="text-xs font-bold underline text-gray-700 hover:text-black">See if you qualify</button>
            </div>

            <div className="mt-6 text-center">
              <Button variant="link" asChild className="text-[#C8A55C] hover:text-[#a88947] font-bold">
                <Link href="/collections/flagpoles">Continue Shopping</Link>
              </Button>
            </div>
          </Card>
          
          {/* Support Section - Below Summary */}
          <div className="mt-6">
             <CartSupportSection />
          </div>
        </div>
      </div>
    </div>
  )
}
