"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, ChevronDown, Search, User, Star, Flame, Sparkles, Tag } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"

const promoMessages = [
  { text: "66% OFF + Free Shipping", discount: "66% OFF" },
  { text: "Save $599 on Accessories Bundle", discount: "SAVE $599" },
  { text: "Limited Time: 60% Off All Flagpoles", discount: "60% OFF" },
  { text: "30-Day Price Match Guarantee", discount: "PRICE MATCH" },
]

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
}

interface HeaderProps {
  menuData: {
    items: MenuItem[]
  } | null
  collectionsData: Record<string, { products: { nodes: Product[] } }>
}

const fallbackMenu = {
  items: [
    {
      id: "flagpoles",
      title: "Flagpoles",
      url: "/products?tag=flagpoles",
      items: [
        { id: "telescoping", title: "Telescoping Flagpoles", url: "/products?tag=telescoping", items: [] },
        { id: "aluminum", title: "Aluminum Flagpoles", url: "/products?tag=aluminum", items: [] },
        { id: "indoor", title: "Indoor Flagpoles", url: "/products?tag=indoor", items: [] },
        { id: "commercial", title: "Commercial Flagpoles", url: "/products?tag=commercial", items: [] },
        { id: "residential", title: "Residential Flagpoles", url: "/products?tag=residential", items: [] },
      ],
    },
    {
      id: "flags",
      title: "Flags",
      url: "/products?tag=flags",
      items: [
        { id: "american", title: "American Flags", url: "/products?tag=american-flag", items: [] },
        { id: "state", title: "State Flags", url: "/products?tag=state-flag", items: [] },
        { id: "military", title: "Military Flags", url: "/products?tag=military", items: [] },
        { id: "international", title: "International Flags", url: "/products?tag=international", items: [] },
        { id: "custom", title: "Custom Flags", url: "/products?tag=custom", items: [] },
      ],
    },
    {
      id: "accessories",
      title: "Accessories",
      url: "/products?tag=accessories",
      items: [
        { id: "lighting", title: "Flagpole Lighting", url: "/products?tag=lighting", items: [] },
        { id: "mounts", title: "Flagpole Mounts", url: "/products?tag=mounts", items: [] },
        { id: "toppers", title: "Flagpole Toppers", url: "/products?tag=toppers", items: [] },
        { id: "hardware", title: "Hardware & Parts", url: "/products?tag=hardware", items: [] },
        { id: "maintenance", title: "Maintenance Kits", url: "/products?tag=maintenance", items: [] },
      ],
    },
    {
      id: "holiday",
      title: "Holiday & Seasonal",
      url: "/products?tag=holiday",
      items: [
        { id: "christmas", title: "Christmas", url: "/products?tag=christmas", items: [] },
        { id: "halloween", title: "Halloween", url: "/products?tag=halloween", items: [] },
        { id: "patriotic", title: "Patriotic Holidays", url: "/products?tag=patriotic", items: [] },
        { id: "seasonal", title: "Seasonal Decorations", url: "/products?tag=seasonal", items: [] },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      url: "/resources",
      items: [
        { id: "blog", title: "Blog", url: "/blog", items: [] },
        { id: "guides", title: "Installation Guides", url: "/installation", items: [] },
        { id: "faq", title: "FAQ", url: "/faq", items: [] },
        { id: "warranty", title: "Warranty Info", url: "/warranty", items: [] },
      ],
    },
  ],
}

const productBadges: Record<string, { type: "hot" | "new" | "sale"; label: string }> = {
  telescoping: { type: "hot", label: "HOT" },
  "american-flag": { type: "sale", label: "SALE" },
  lighting: { type: "new", label: "NEW" },
  christmas: { type: "sale", label: "SALE" },
  commercial: { type: "hot", label: "HOT" },
}

export function Header({ menuData, collectionsData }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges?.length || 0

  const menu = menuData || fallbackMenu

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPromoIndex((prev) => (prev + 1) % promoMessages.length)
        setIsTransitioning(false)
      }, 600)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!menuData) {
      console.log(
        "%c⚠️ Using Fallback Menu",
        "background: #FFA500; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
      )
      console.log("Menu links may not work if collections don't exist in Shopify.")
      console.log("Visit /debug-menu for detailed diagnostics and setup instructions.")
    }
  }, [menuData])

  useEffect(() => {
    console.log(
      "%c🎯 Mega Menu Debug",
      "background: #C8A55C; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
    )
    console.log(`📦 Total categories received: ${Object.keys(collectionsData).length}`)

    if (Object.keys(collectionsData).length === 0) {
      console.log("%c❌ NO PRODUCTS FOUND - Mega menu will not show product images", "color: red; font-weight: bold;")
      console.log("This means the Shopify API is not returning products or the tags don't match.")
    } else {
      console.log("✅ Products found for these categories:")
      Object.entries(collectionsData).forEach(([key, value]) => {
        const count = value.products?.nodes?.length || 0
        console.log(`  • ${key}: ${count} products`)
        if (count > 0 && value.products.nodes[0]) {
          console.log(`    Sample: "${value.products.nodes[0].title}"`)
        }
      })
    }
  }, [collectionsData])

  useEffect(() => {
    console.log("[v0] Header: collectionsData received:", Object.keys(collectionsData).length, "categories")
    Object.entries(collectionsData).forEach(([key, value]) => {
      console.log(`[v0] Header: Category "${key}" has ${value.products?.nodes?.length || 0} products`)
    })
  }, [collectionsData])

  const handleMenuEnter = (itemId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setActiveMegaMenu(itemId)
  }

  const handleMenuLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 150) // 150ms delay before closing
    setHoverTimeout(timeout)
  }

  const handleMegaMenuEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
  }

  const renderMegaMenu = (menuItem: MenuItem) => {
    const urlParams = new URLSearchParams(menuItem.url.split("?")[1] || "")
    const tag = urlParams.get("tag") || menuItem.url.split("/").pop() || ""
    const products = collectionsData[tag]?.products?.nodes || []
    const hasProducts = products.length > 0

    console.log(`[v0] Opening mega menu for "${menuItem.title}" (tag: "${tag}")`)
    console.log(`[v0] Found ${products.length} products for this menu`)

    const hasSubItems = menuItem.items && menuItem.items.length > 0

    if (!hasSubItems && !hasProducts) {
      return null
    }

    // Group subitems into columns
    const columns: MenuItem[][] = []
    if (hasSubItems) {
      const itemsPerColumn = Math.ceil(menuItem.items!.length / 2)
      for (let i = 0; i < menuItem.items!.length; i += itemsPerColumn) {
        columns.push(menuItem.items!.slice(i, i + itemsPerColumn))
      }
    }

    const getBadgeStyles = (type: "hot" | "new" | "sale") => {
      switch (type) {
        case "hot":
          return "bg-gradient-to-r from-red-600 to-orange-500 text-white"
        case "new":
          return "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
        case "sale":
          return "bg-gradient-to-r from-[#C8A55C] to-yellow-600 text-white"
      }
    }

    const getBadgeIcon = (type: "hot" | "new" | "sale") => {
      switch (type) {
        case "hot":
          return <Flame className="w-3 h-3" />
        case "new":
          return <Sparkles className="w-3 h-3" />
        case "sale":
          return <Tag className="w-3 h-3" />
      }
    }

    return (
      <div
        className="absolute top-full left-0 pt-2 z-50"
        onMouseEnter={handleMegaMenuEnter}
        onMouseLeave={handleMenuLeave}
      >
        <div
          className={`${hasProducts ? "w-[1100px]" : "w-[800px]"} bg-white border-2 border-[#C8A55C]/30 rounded-xl shadow-2xl overflow-hidden`}
        >
          <div className="bg-gradient-to-r from-[#0B1C2C] via-[#1a3a52] to-[#0B1C2C] px-6 py-3 border-b-4 border-[#C8A55C]">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
                <Star className="w-5 h-5 text-[#C8A55C] fill-[#C8A55C]" />
                {menuItem.title}
                <Star className="w-5 h-5 text-[#C8A55C] fill-[#C8A55C]" />
              </h2>
              <Link
                href={menuItem.url}
                className="text-[#C8A55C] hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
              >
                View All
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </Link>
            </div>
          </div>

          <div className="p-6">
            <div className={`grid ${hasProducts ? "grid-cols-[2fr_1fr]" : "grid-cols-1"} gap-8`}>
              <div>
                <div className="grid grid-cols-2 gap-6">
                  {columns.map((columnItems, idx) => (
                    <div key={idx} className="space-y-1">
                      {columnItems.map((item, itemIdx) => {
                        const itemUrlParams = new URLSearchParams(item.url.split("?")[1] || "")
                        const itemTag = itemUrlParams.get("tag") || item.url.split("/").pop() || ""
                        const badge = productBadges[itemTag]
                        return (
                          <Link
                            key={item.id}
                            href={item.url}
                            className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-[#F5F3EF] hover:to-white transition-all duration-200 border border-transparent hover:border-[#C8A55C]/20"
                          >
                            <span className="text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors font-medium text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A55C] opacity-0 group-hover:opacity-100 transition-opacity" />
                              {item.title}
                            </span>
                            {badge && (
                              <span
                                className={`${getBadgeStyles(badge.type)} px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-md`}
                              >
                                {getBadgeIcon(badge.type)}
                                {badge.label}
                              </span>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gradient-to-r from-red-50 via-white to-blue-50 border-2 border-[#C8A55C]/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#C8A55C] rounded-full p-2">
                        <Star className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div>
                        <p className="text-[#0B1C2C] font-bold text-sm">Free Shipping on Orders $99+</p>
                        <p className="text-[#0B1C2C]/60 text-xs">Plus 30-Day Money Back Guarantee</p>
                      </div>
                    </div>
                    <Link
                      href="/guarantee"
                      className="text-[#C8A55C] hover:text-[#0B1C2C] transition-colors text-xs font-medium"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>

              {hasProducts && (
                <div className="border-l-2 border-[#C8A55C]/20 pl-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-[#C8A55C] fill-[#C8A55C]" />
                    <h3 className="text-[#0B1C2C] font-bold text-sm uppercase tracking-wide">Featured Products</h3>
                  </div>
                  <div className="space-y-3">
                    {products.slice(0, 4).map((product, idx) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.handle}`}
                        className="group flex gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#F5F3EF] hover:to-white transition-all duration-200 border border-transparent hover:border-[#C8A55C]/30 hover:shadow-md"
                      >
                        {product.featuredImage && (
                          <div className="relative flex-shrink-0">
                            <Image
                              src={product.featuredImage.url || "/placeholder.svg"}
                              alt={product.featuredImage.altText || product.title}
                              width={80}
                              height={80}
                              className="w-20 h-20 object-cover rounded-lg border-2 border-[#C8A55C]/20 group-hover:border-[#C8A55C] transition-colors"
                            />
                            {idx === 0 && (
                              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                HOT
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-1">
                            {product.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-base font-bold text-[#C8A55C]">
                              ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-[#C8A55C] fill-[#C8A55C]" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="relative bg-white z-50">
        <div className="border-b border-gray-200 bg-[#F5F3EF] hidden md:block">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center text-xs">
            <div className="flex gap-6">
              <Link href="/guarantee" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium">
                Our Guarantee
              </Link>
              <Link href="/about" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium">
                About Us
              </Link>
              <Link href="/contact" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium">
                Contact Us
              </Link>
              <Link href="/reviews" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium">
                Reviews & Testimonials
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <Link href="/find-store" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium">
                Find in Store
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
              >
                <User className="w-3.5 h-3.5" />
                My Account
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-16">
              <button className="lg:hidden text-[#0B1C2C] order-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/" className="flex items-center gap-2 md:gap-3 order-2 lg:order-1">
                <Image
                  src="/images/favicon.png"
                  alt="Atlantic Flagpoles Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <span className="text-sm md:text-2xl font-serif font-bold text-[#0B1C2C] tracking-wide">
                  ATLANTIC FLAGPOLES
                </span>
              </Link>

              <div className="hidden md:flex flex-1 max-w-lg mx-8 order-2">
                <SearchBarWrapper className="w-full" />
              </div>

              <nav className="hidden lg:flex items-center gap-6 order-3">
                {menu.items.map((item) => {
                  const hasSubItems = item.items && item.items.length > 0

                  if (!hasSubItems) {
                    return (
                      <Link
                        key={item.id}
                        href={item.url}
                        className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm"
                      >
                        {item.title}
                      </Link>
                    )
                  }

                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => handleMenuEnter(item.id)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
                        {item.title}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {activeMegaMenu === item.id && renderMegaMenu(item)}
                    </div>
                  )
                })}

                <button
                  onClick={() => setQuizModalOpen(true)}
                  className="bg-[#C8A55C] hover:bg-[#a88947] px-6 py-2.5 rounded-md text-white font-medium transition-colors text-sm mr-2"
                >
                  Take Quiz
                </button>
              </nav>

              <div className="flex items-center gap-3 order-3">
                <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors lg:hidden">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#C8A55C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <div className="hidden lg:flex items-center gap-4">
                  <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#C8A55C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="lg:hidden py-4 border-t border-gray-200">
                <div className="mb-4">
                  <SearchBarWrapper />
                </div>
                <nav className="flex flex-col gap-4">
                  {menu.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <Link
                    href="/about"
                    className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <button
                    onClick={() => {
                      setQuizModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className="text-left bg-[#C8A55C] hover:bg-[#a88947] px-3 py-2 rounded-md text-white font-medium transition-colors"
                  >
                    Take Flagpole Quiz
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md transition-all duration-300 ${
          isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button className="lg:hidden text-[#0B1C2C] mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2 md:gap-4 flex-1 lg:flex-initial lg:w-80">
              <Image
                src="/images/favicon.png"
                alt="Atlantic Flagpoles Logo"
                width={32}
                height={32}
                className="w-7 h-7 md:w-8 md:h-8"
              />
              {!searchExpanded && (
                <button
                  onClick={() => setSearchExpanded(true)}
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
              {searchExpanded && (
                <SearchBarWrapper className="w-full" autoFocus onBlur={() => setSearchExpanded(false)} />
              )}
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              {menu.items.map((item) => {
                const hasSubItems = item.items && item.items.length > 0

                if (!hasSubItems) {
                  return (
                    <Link
                      key={item.id}
                      href={item.url}
                      className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm"
                    >
                      {item.title}
                    </Link>
                  )
                }

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleMenuEnter(item.id)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
                      {item.title}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {activeMegaMenu === item.id && renderMegaMenu(item)}
                  </div>
                )
              })}
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              <Link href="/account" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors hidden md:block">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C8A55C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FlagpoleQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  )
}
