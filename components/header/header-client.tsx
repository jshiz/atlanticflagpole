"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, ChevronDown, Search, User } from "lucide-react"
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
      url: "/collections/flagpoles",
      items: [
        { id: "telescoping", title: "Telescoping Flagpoles", url: "/collections/telescoping-flagpoles", items: [] },
        { id: "aluminum", title: "Aluminum Flagpoles", url: "/collections/aluminum-flagpoles", items: [] },
        { id: "indoor", title: "Indoor Flagpoles", url: "/collections/indoor-flagpoles", items: [] },
      ],
    },
    {
      id: "flags",
      title: "Flags",
      url: "/collections/flags",
      items: [
        { id: "american", title: "American Flags", url: "/collections/american-flags", items: [] },
        { id: "state", title: "State Flags", url: "/collections/state-flags", items: [] },
        { id: "military", title: "Military Flags", url: "/collections/military-flags", items: [] },
      ],
    },
    {
      id: "accessories",
      title: "Accessories",
      url: "/collections/accessories",
      items: [
        { id: "lighting", title: "Flagpole Lighting", url: "/collections/flagpole-lighting", items: [] },
        { id: "mounts", title: "Flagpole Mounts", url: "/collections/flagpole-mounts", items: [] },
        { id: "toppers", title: "Flagpole Toppers", url: "/collections/flagpole-toppers", items: [] },
      ],
    },
    {
      id: "holiday",
      title: "Holiday & Seasonal",
      url: "/collections/holiday-seasonal",
      items: [
        { id: "christmas", title: "Christmas", url: "/collections/christmas", items: [] },
        { id: "halloween", title: "Halloween", url: "/collections/halloween", items: [] },
        { id: "patriotic", title: "Patriotic Holidays", url: "/collections/patriotic-holidays", items: [] },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      url: "/resources",
      items: [
        { id: "blog", title: "Blog", url: "/blog", items: [] },
        { id: "guides", title: "Installation Guides", url: "/installation-guides", items: [] },
        { id: "faq", title: "FAQ", url: "/faq", items: [] },
      ],
    },
  ],
}

export function Header({ menuData, collectionsData }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
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

  const renderMegaMenu = (menuItem: MenuItem) => {
    const collectionKey = menuItem.url.split("/").pop() || ""
    const products = collectionsData[collectionKey]?.products?.nodes || []
    const hasProducts = products.length > 0
    const hasSubItems = menuItem.items && menuItem.items.length > 0

    if (!hasSubItems && !hasProducts) {
      return null
    }

    // Group subitems into columns (max 3 columns for menu items)
    const columns: MenuItem[][] = []
    if (hasSubItems) {
      const itemsPerColumn = Math.ceil(menuItem.items!.length / 3)
      for (let i = 0; i < menuItem.items!.length; i += itemsPerColumn) {
        columns.push(menuItem.items!.slice(i, i + itemsPerColumn))
      }
    }

    return (
      <div
        className={`absolute top-full left-0 mt-2 ${hasProducts ? "w-[900px]" : "w-[700px]"} bg-white border border-gray-200 rounded-lg shadow-xl p-6 z-50`}
      >
        <div className={`grid ${hasProducts ? "grid-cols-4" : "grid-cols-3"} gap-6`}>
          {columns.map((columnItems, idx) => (
            <div key={idx}>
              <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">
                {idx === 0 ? "Categories" : ""}
              </h3>
              <ul className="space-y-2">
                {columnItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {hasProducts && (
            <div>
              <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Featured Products</h3>
              <div className="space-y-3">
                {products.slice(0, 3).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="flex gap-2 group hover:bg-[#F5F3EF] p-2 rounded-md transition-colors"
                  >
                    {product.featuredImage && (
                      <Image
                        src={product.featuredImage.url || "/placeholder.svg"}
                        alt={product.featuredImage.altText || product.title}
                        width={60}
                        height={60}
                        className="w-14 h-14 object-cover rounded border border-gray-200"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2">
                        {product.title}
                      </p>
                      <p className="text-xs text-[#0B1C2C]/70 mt-1">
                        ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
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
                      onMouseEnter={() => setActiveMegaMenu(item.id)}
                      onMouseLeave={() => setActiveMegaMenu(null)}
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
                    onMouseEnter={() => setActiveMegaMenu(item.id)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
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
