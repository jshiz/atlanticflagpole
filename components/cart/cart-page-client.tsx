"use client"

import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, Package, Shield, Truck, Award, Zap, MapPin } from "lucide-react"
import { useState, useEffect, useCallback, useRef } from "react"
import { getBundleConfig } from "@/lib/bundles/bundle-config"
import { useRouter } from "next/navigation"
import { useGeo } from "@/lib/geo/context"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { ExpressCheckoutButtons } from "@/components/cart/express-checkout-buttons"

interface BundleComponentWithImage {
  title: string
  handle: string
  variantTitle?: string
  quantity: number
  notes?: string
  imageUrl?: string
  imageAlt?: string
}

export function CartPageClient() {
  const { cart, loading, updateCartLine, removeFromCart, addToCart } = useCart()
  const [expandedBundles, setExpandedBundles] = useState<Set<string>>(new Set())
  const [bundleComponentImages, setBundleComponentImages] = useState<Record<string, BundleComponentWithImage[]>>({})
  const router = useRouter()
  const { location, loading: geoLoading } = useGeo()
  const [geoProducts, setGeoProducts] = useState<ShopifyProduct[]>([])
  const [addOnProducts, setAddOnProducts] = useState<ShopifyProduct[]>([])
  const [savingsProducts, setSavingsProducts] = useState<ShopifyProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const updateTimeoutRef = useRef<NodeJS.Timeout>()

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
      const variantId = product.variants.edges[0]?.node.id
      if (variantId) {
        await handleCartUpdate(() => addToCart(variantId, 1))
      }
    },
    [addToCart, handleCartUpdate],
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
    const fetchUpsellProducts = async () => {
      try {
        setLoadingProducts(true)

        const [productsRes] = await Promise.all([fetch("/api/products?first=50")])

        if (!productsRes.ok) {
          throw new Error(`Failed to fetch products: ${productsRes.status}`)
        }
        const productsData = await productsRes.json()
        console.log("[v0] Cart - fetched products for upsells:", productsData)

        if (productsData.products && Array.isArray(productsData.products)) {
          const accessories = productsData.products
            .filter((p: ShopifyProduct) =>
              p.tags.some(
                (tag: string) =>
                  tag.toLowerCase().includes("accessory") ||
                  tag.toLowerCase().includes("mount") ||
                  tag.toLowerCase().includes("hardware") ||
                  tag.toLowerCase().includes("bracket"),
              ),
            )
            .slice(0, 6)

          const saleItems = productsData.products
            .filter((p: ShopifyProduct) => {
              const hasComparePrice =
                p.compareAtPriceRange?.minVariantPrice?.amount &&
                Number.parseFloat(p.compareAtPriceRange.minVariantPrice.amount) >
                  Number.parseFloat(p.priceRange.minVariantPrice.amount)
              return hasComparePrice
            })
            .slice(0, 4)

          console.log("[v0] Cart - found", accessories.length, "accessories and", saleItems.length, "sale items")

          setAddOnProducts(accessories)
          setSavingsProducts(saleItems)
        }
      } catch (error) {
        console.error("[v0] Cart - failed to fetch upsell products:", error)
      } finally {
        setLoadingProducts(false)
      }
    }

    fetchUpsellProducts()
  }, [])

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

  const potentialSavings = savingsProducts.reduce((sum, product) => {
    const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
    const compareAt = product.compareAtPriceRange?.minVariantPrice?.amount
      ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
      : price
    return sum + (compareAt - price)
  }, 0)

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
              onClick={() => handleCartUpdate(() => removeFromCart(line.id))}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={isUpdating}
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
                  onClick={() => handleCartUpdate(() => updateCartLine(line.id, line.quantity - 1))}
                  disabled={line.quantity <= 1 || isUpdating}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-bold text-lg">{line.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-gray-100"
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
                {geoProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
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
                      disabled={isUpdating}
                    >
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {addOnProducts.length > 0 && (
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="w-5 h-5 text-green-700" />
                <h3 className="text-lg font-bold text-[#0B1C2C]">Complete Your Setup</h3>
                <span className="ml-auto text-xs bg-green-600 text-white px-2 py-1 rounded-full font-semibold">
                  Add-Ons
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {addOnProducts.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => !isUpdating && handleQuickAdd(product)}
                  >
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
                    <Button
                      size="sm"
                      className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white text-xs py-1"
                      disabled={isUpdating}
                    >
                      Quick Add
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {savingsProducts.length > 0 && (
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-red-700" />
                <h3 className="text-lg font-bold text-[#0B1C2C]">Last Minute Savings</h3>
                <span className="ml-auto text-xs bg-red-600 text-white px-2 py-1 rounded-full font-semibold">
                  Save ${potentialSavings.toFixed(0)}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {savingsProducts.map((product) => {
                  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
                  const compareAt = product.compareAtPriceRange?.minVariantPrice?.amount
                    ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
                    : null
                  const savings = compareAt ? compareAt - price : 0

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
                      onClick={() => !isUpdating && handleQuickAdd(product)}
                    >
                      {savings > 0 && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
                          Save ${savings.toFixed(0)}
                        </div>
                      )}
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
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-bold text-red-600">${price.toFixed(2)}</p>
                        {compareAt && <p className="text-xs text-gray-500 line-through">${compareAt.toFixed(2)}</p>}
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-1"
                        disabled={isUpdating}
                      >
                        Add & Save
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
          <Card className="p-6 sticky top-24 shadow-xl">
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

            <ExpressCheckoutButtons cartId={cart?.id} />

            <Button
              onClick={handleCheckout}
              size="lg"
              className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white py-6 text-lg font-bold shadow-lg mt-3"
              disabled={isUpdating}
            >
              Proceed to Checkout
            </Button>

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
  )
}
