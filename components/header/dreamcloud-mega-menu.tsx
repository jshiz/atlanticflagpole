"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  title: string
  url: string
  items?: MenuItem[]
}

interface Product {
  id: string
  handle: string
  title: string
  featuredImage?: {
    url: string
    altText?: string
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  compareAtPriceRange?: {
    minVariantPrice?: {
      amount: string
    }
  }
  variants?: {
    edges: Array<{
      node: {
        id: string
        availableForSale: boolean
      }
    }>
  }
}

interface DreamCloudMegaMenuProps {
  title: string
  menuItems: MenuItem[]
  featuredProducts?: Product[]
  onLinkClick?: () => void
  headerContent?: {
    title: string
    badges?: Array<{ label: string; image?: string }>
  }
  promoContent?: {
    title: string
    description: string
    buttonText: string
    buttonHref: string
    image?: string
  }
}

function getProductBadge(featuredProducts: Product[], index: number): string | null {
  const product = featuredProducts[index]
  if (!product || !product.title) return null

  const title = product.title.toLowerCase()

  if (index === 0) return "BEST VALUE"
  if (index === 1) return "MOST POPULAR"
  if (title.includes("premium") || title.includes("deluxe")) return "PREMIUM CHOICE"
  if (title.includes("ultimate") || title.includes("pro")) return "ULTIMATE COMFORT"
  if (index >= featuredProducts.length - 2) return "NEW"

  return null
}

function QuickAddButton({ product }: { product: Product }) {
  const { addToCart, loading } = useCart()
  const [added, setAdded] = useState(false)

  const defaultVariant = product.variants?.edges?.[0]?.node
  const isAvailable = defaultVariant?.availableForSale

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!defaultVariant || !isAvailable) return

    try {
      await addToCart(defaultVariant.id, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
    }
  }

  if (!defaultVariant || !isAvailable) {
    return (
      <Button size="sm" variant="outline" disabled className="w-full text-xs h-10 px-4 bg-transparent">
        Unavailable
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      onClick={handleQuickAdd}
      disabled={loading || added}
      className={cn(
        "w-full text-xs transition-all duration-300 h-10 px-4 font-semibold",
        added ? "bg-green-600 hover:bg-green-700" : "bg-[#C8A55C] hover:bg-[#a88947] text-white",
      )}
    >
      {added ? (
        <>
          <Check className="w-4 h-4 mr-1.5" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-1.5" />
          Quick Add
        </>
      )}
    </Button>
  )
}

export function DreamCloudMegaMenu({
  title,
  menuItems,
  featuredProducts = [],
  onLinkClick,
  headerContent,
  promoContent,
}: DreamCloudMegaMenuProps) {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  useEffect(() => {
    const activeProducts = featuredProducts.filter((p) => {
      const hasVariant = p.variants?.edges?.[0]?.node
      return hasVariant?.availableForSale
    })

    setDisplayProducts(activeProducts.slice(0, 8))
  }, [featuredProducts])

  // Determine layout type based on content
  const hasProducts = displayProducts.length > 0
  const hasPromo = !!promoContent

  return (
    <div className="w-full max-w-[1400px] mx-auto px-8 py-8">
      {/* Header section with title and badges */}
      {headerContent && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#0B1C2C] mb-4 text-center">{headerContent.title}</h3>
          {headerContent.badges && (
            <div className="flex items-center justify-center gap-6">
              {headerContent.badges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  {badge.image && (
                    <div className="w-20 h-20 relative">
                      <Image
                        src={badge.image || "/placeholder.svg"}
                        alt={badge.label}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <span className="text-xs text-gray-600 text-center">{badge.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar Navigation */}
        <div className="col-span-2">
          <h4 className="text-base font-bold text-[#0B1C2C] mb-4 pb-2 border-b-2 border-[#C8A55C]">{title}</h4>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  onClick={onLinkClick}
                  onMouseEnter={() => setHoveredCategory(item.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F5F3EF] transition-all"
                >
                  <span className="text-sm text-[#0B1C2C] group-hover:text-[#C8A55C] font-medium transition-colors">
                    {item.title}
                  </span>
                  {item.items && item.items.length > 0 && (
                    <span className="text-xs text-gray-400 group-hover:text-[#C8A55C]">→</span>
                  )}
                </Link>

                {/* Submenu on hover */}
                {hoveredCategory === item.id && item.items && item.items.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-0.5 animate-in fade-in slide-in-from-left-2 duration-200">
                    {item.items.slice(0, 10).map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.url}
                          onClick={onLinkClick}
                          className="block py-1.5 px-3 text-xs text-gray-600 hover:text-[#C8A55C] hover:bg-[#F5F3EF] rounded transition-colors"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* View All link */}
          <Link
            href={`/collections/${title.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onLinkClick}
            className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-[#C8A55C] hover:text-[#a88947] group"
          >
            View All {title}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Right Content Area - Products or Promo */}
        <div className="col-span-10">
          {hasProducts ? (
            <>
              {/* Product Categories Tabs (if applicable) */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-8">
                  <button className="text-sm font-bold text-[#0B1C2C] pb-2 border-b-2 border-[#C8A55C]">
                    All Products
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayProducts.map((product, index) => {
                  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
                  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice
                  const badge = getProductBadge(featuredProducts, index)

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={onLinkClick}
                      className="group block"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden mb-3 shadow-sm group-hover:shadow-lg transition-shadow">
                        {product.featuredImage ? (
                          <Image
                            src={product.featuredImage.url || "/placeholder.svg"}
                            alt={product.featuredImage.altText || product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <span className="text-3xl">🏴</span>
                          </div>
                        )}

                        {/* Product Badge */}
                        {badge && (
                          <div className="absolute top-2 left-2">
                            <Badge
                              className={cn(
                                "text-[10px] font-bold px-2 py-1",
                                badge === "BEST VALUE" && "bg-[#C8A55C] text-white",
                                badge === "MOST POPULAR" && "bg-[#0B1C2C] text-white",
                                badge === "PREMIUM CHOICE" && "bg-amber-600 text-white",
                                badge === "ULTIMATE COMFORT" && "bg-blue-600 text-white",
                                badge === "NEW" && "bg-orange-600 text-white",
                              )}
                            >
                              {badge}
                            </Badge>
                          </div>
                        )}

                        {/* Height indicator (for flagpoles) */}
                        {product.title.match(/\d+['']?\s*ft/i) && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-white/90 text-[#0B1C2C] text-xs font-bold">
                              {product.title.match(/\d+['']?\s*ft/i)?.[0]}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Product Title */}
                      <h5 className="text-sm font-bold text-[#0B1C2C] group-hover:text-[#C8A55C] mb-2 line-clamp-2 min-h-[2.5rem] transition-colors">
                        {product.title}
                      </h5>

                      {/* Product Description/Features */}
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">Premium quality flagpole system</p>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-lg font-bold text-[#C8A55C]">${price.toFixed(2)}</span>
                        {compareAtPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${Number.parseFloat(compareAtPrice.amount).toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quick Add button */}
                      <div className="h-10">
                        <QuickAddButton product={product} />
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Bottom CTAs */}
              <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
                <Button asChild size="lg" className="bg-[#C8A55C] hover:bg-[#a88947] text-white px-8">
                  <Link href={`/collections/${title.toLowerCase().replace(/\s+/g, "-")}`} onClick={onLinkClick}>
                    Shop {title}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#C8A55C] text-[#C8A55C] hover:bg-[#C8A55C] hover:text-white px-8 bg-transparent"
                >
                  <Link href="/compare" onClick={onLinkClick}>
                    Compare All {title}
                  </Link>
                </Button>
              </div>
            </>
          ) : hasPromo ? (
            // Promotional Content Layout
            <div className="grid grid-cols-2 gap-8 items-center h-full">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#0B1C2C]">{promoContent.title}</h3>
                <p className="text-gray-600 leading-relaxed">{promoContent.description}</p>
                <Button asChild size="lg" className="bg-[#C8A55C] hover:bg-[#a88947] text-white">
                  <Link href={promoContent.buttonHref} onClick={onLinkClick}>
                    {promoContent.buttonText}
                  </Link>
                </Button>
              </div>
              {promoContent.image && (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={promoContent.image || "/placeholder.svg"}
                    alt={promoContent.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              )}
            </div>
          ) : (
            // Default informational layout
            <div className="text-center py-12">
              <p className="text-gray-500">Explore our {title.toLowerCase()} collection</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
