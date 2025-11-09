"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingCart, User, MapPin } from "lucide-react"
import { DreamCloudMegaMenu } from "./dreamcloud-mega-menu"
import { InfoMegaMenu } from "./info-mega-menu"
import { CompareMegaMenu } from "./compare-mega-menu"
import { ChristmasTreeMegaMenu } from "./christmas-tree-mega-menu"
import { NFLMenuClient } from "./nfl-menu-client"
import { InfoCenterMegaMenu } from "./info-center-mega-menu"
import type { Menu as MenuType, MenuItem } from "@/lib/menus"
import type { ShopifyProduct } from "@/lib/shopify/types"

interface EnhancedHeaderClientProps {
  menuData: MenuType | null
  megaMenuData: Record<string, any>
  submenuProductsData: Record<string, any[]>
  nflFlagProducts: ShopifyProduct[]
  christmasTreeProducts: ShopifyProduct[]
  judgemeBadge?: React.ReactNode
}

export function EnhancedHeaderClient({
  menuData,
  megaMenuData,
  submenuProductsData,
  nflFlagProducts,
  christmasTreeProducts,
  judgemeBadge,
}: EnhancedHeaderClientProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMenuClose = () => {
    setHoveredMenu(null)
    setIsMobileMenuOpen(false)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const renderMegaMenu = (item: MenuItem) => {
    const title = item.title.toLowerCase()

    if (title.includes("christmas") && title.includes("tree")) {
      return (
        <ChristmasTreeMegaMenu
          products={christmasTreeProducts}
          submenuProductsData={submenuProductsData}
          onLinkClick={handleMenuClose}
        />
      )
    }

    if (title.includes("nfl") || title.includes("sports")) {
      return <NFLMenuClient nflFlagProducts={nflFlagProducts} onLinkClick={handleMenuClose} />
    }

    const products = megaMenuData[item.id]?.products?.nodes || []

    // Add header content for product categories
    let headerContent = undefined
    if (title.includes("flagpole")) {
      headerContent = {
        title: "America's #1 Flagpole Company",
        badges: [
          { label: "10+ Years in Business", image: "/10-years-badge.jpg" },
          { label: "BBB Accredited", image: "/generic-business-accreditation-logo.png" },
          { label: "1% For Veterans", image: "/veterans-badge.jpg" },
          {
            label: "Made in USA",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/madeinusabadge-y7lnHFiqBn1o0YpH7y5tKHymKkmgPA.jpg",
          },
        ],
      }
    }

    return (
      <DreamCloudMegaMenu
        title={item.title}
        menuItems={item.items || []}
        featuredProducts={products}
        onLinkClick={handleMenuClose}
        headerContent={headerContent}
      />
    )
  }

  const renderSecondaryMegaMenu = (menuKey: string) => {
    const promoContent = {
      reviews: {
        title: "What Our Customers Say",
        description: "Join thousands of satisfied customers who trust Atlantic Flagpole for their American pride.",
        buttonText: "Read Reviews",
        buttonHref: "/reviews",
        image: "/happy-customer-with-flagpole.jpg",
      },
      about: {
        title: "Our Story",
        description:
          "Atlantic Flagpole was founded to provide Americans with the highest quality flagpoles, backed by lifetime warranties and exceptional service.",
        buttonText: "Learn More",
        buttonHref: "/about",
        image: "/american-flag-workshop-manufacturing.jpg",
      },
      help: {
        title: "Get $100 Gift Card",
        description:
          "It's a win-win: Give friends $100 off their Atlantic Flagpole & you receive a $100 Visa or Amazon gift card.",
        buttonText: "Refer Now",
        buttonHref: "/refer",
        image: "/friends-celebrating-with-american-flag.jpg",
      },
    }

    if (menuKey === "compare") {
      return <CompareMegaMenu onLinkClick={handleMenuClose} />
    }

    if (menuKey === "info-center") {
      return <InfoCenterMegaMenu onLinkClick={handleMenuClose} />
    }

    if (menuKey === "reviews") {
      return (
        <InfoMegaMenu
          title="Reviews & Awards"
          subtitle="See what customers are saying"
          menuItems={[
            { id: "1", title: "Customer Reviews", url: "/reviews", items: [] },
            { id: "2", title: "Awards", url: "/awards", items: [] },
          ]}
          promoContent={promoContent.reviews}
          onLinkClick={handleMenuClose}
        />
      )
    }

    if (menuKey === "about") {
      return (
        <InfoMegaMenu
          title="About"
          subtitle="Learn about our mission"
          menuItems={[
            { id: "1", title: "Our Story", url: "/about", items: [] },
            { id: "2", title: "365 Night Trial", url: "/info-center/phoenix-365-day-home-trial", items: [] },
            { id: "3", title: "Lifetime Warranty", url: "/warranty", items: [] },
            { id: "4", title: "Awards", url: "/awards", items: [] },
          ]}
          promoContent={promoContent.about}
          onLinkClick={handleMenuClose}
        />
      )
    }

    if (menuKey === "help") {
      return (
        <InfoMegaMenu
          title="Help & Support"
          subtitle="We're here to assist you"
          menuItems={[
            { id: "1", title: "FAQ", url: "/faq", items: [] },
            { id: "2", title: "Financing", url: "/financing", items: [] },
            { id: "3", title: "Returns", url: "/returns", items: [] },
            { id: "4", title: "Refer a Friend", url: "/refer", items: [] },
          ]}
          promoContent={promoContent.help}
          onLinkClick={handleMenuClose}
        />
      )
    }

    return null
  }

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <Link href="/find-store" className="flex items-center gap-1 text-gray-600 hover:text-[#C8A55C]">
                <MapPin className="w-3 h-3" />
                <span className="hidden sm:inline">Find in Store</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/account" className="text-gray-600 hover:text-[#C8A55C]">
                My Account
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-4 h-16">
              <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
                <div className="w-8 h-8 bg-[#0B1C2C] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AF</span>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-bold text-[#0B1C2C] leading-tight tracking-wide">ATLANTIC</span>
                  <span className="text-xs font-bold text-[#0B1C2C] leading-tight tracking-wide">FLAGPOLE</span>
                </div>
              </Link>

              <nav className="hidden lg:flex items-center gap-0.5">
                {menuData?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredMenu(item.id)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <Link
                      href={item.url}
                      className="px-3 py-5 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] transition-colors inline-block border-b-2 border-transparent hover:border-[#C8A55C]"
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </nav>

              <div className="hidden lg:flex flex-1 max-w-md mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search flagpoles, accessories..."
                    className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[#C8A55C] focus:ring-1 focus:ring-[#C8A55C]"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8A55C]"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-[#C8A55C] transition-colors lg:hidden"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-[#C8A55C] transition-colors hidden lg:block">
                  <User className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-[#C8A55C] transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A55C] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    0
                  </span>
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-600 hover:text-[#C8A55C] lg:hidden"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="lg:hidden border-b border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-3">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search flagpoles, accessories..."
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[#C8A55C] focus:ring-1 focus:ring-[#C8A55C]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8A55C]"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="bg-[#F5F3EF] border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-end gap-5 h-10">
              <Link href="/quiz" className="text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C]">
                Take Flagpole Quiz
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setHoveredMenu("reviews")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link href="/reviews" className="text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C]">
                  Reviews
                </Link>
              </div>
              <div
                className="relative"
                onMouseEnter={() => setHoveredMenu("compare")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link href="/compare" className="text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C]">
                  Compare
                </Link>
              </div>
              <div
                className="relative"
                onMouseEnter={() => setHoveredMenu("about")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link href="/about" className="text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C]">
                  About
                </Link>
              </div>
              <div
                className="relative"
                onMouseEnter={() => setHoveredMenu("help")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link href="/help" className="text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C]">
                  Help
                </Link>
              </div>
              <div
                className="relative"
                onMouseEnter={() => setHoveredMenu("info-center")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link href="/info-center" className="text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C]">
                  Info Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mega Menu Dropdown Overlay */}
      {hoveredMenu && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onMouseEnter={() => setHoveredMenu(null)} />
      )}

      {hoveredMenu && (
        <div
          className="fixed left-0 right-0 z-50 bg-white shadow-2xl"
          style={{ top: isSearchOpen ? "176px" : "122px" }} // Adjusted for condensed header
          onMouseEnter={() => setHoveredMenu(hoveredMenu)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <div className="animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Check if it's a secondary nav item */}
            {["info-center", "reviews", "compare", "about", "help"].includes(hoveredMenu) ? (
              renderSecondaryMegaMenu(hoveredMenu)
            ) : (
              // Main nav mega menu
              <>
                {menuData?.items?.find((item) => item.id === hoveredMenu) &&
                  renderMegaMenu(menuData.items.find((item) => item.id === hoveredMenu)!)}
              </>
            )}
          </div>
        </div>
      )}

      {/* Judge.me Badge */}
      {judgemeBadge && <div className="hidden">{judgemeBadge}</div>}
    </>
  )
}
