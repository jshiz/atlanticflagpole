"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, ChevronDown, User, Sparkles, MapPin, Search, X } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"
import { useGeo } from "@/lib/geo/context"
import { getStateCodeFromRegion } from "@/lib/geo/state-mapping"
import { MobileMenuAmazon } from "@/components/header/mobile-menu-amazon"

interface MenuItem {
  id: string
  title: string
  url: string
  items?: MenuItem[]
}

interface HeaderClientProps {
  menuData: {
    items: MenuItem[]
  } | null
  megaMenuData: any
  submenuProductsData: any
  nflFlagProducts: any
  christmasTreeProducts: any
  judgemeBadge: any
}

export function HeaderClient({
  menuData,
  megaMenuData,
  submenuProductsData,
  nflFlagProducts,
  christmasTreeProducts,
  judgemeBadge,
}: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges?.length || 0
  const { location } = useGeo()
  const stateCode = location ? getStateCodeFromRegion(location.region) : null

  const shopifyAccountUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      console.log("[v0] Mobile header scroll position:", window.scrollY, "isScrolled:", scrolled)
      setIsScrolled(scrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = menuData?.items || []

  console.log("[v0] HeaderClient rendering - isScrolled:", isScrolled, "cartItemCount:", cartItemCount)

  return (
    <>
      <div
        className={`md:hidden fixed top-8 left-0 right-0 z-[999] bg-white border-b-2 border-[#C8A55C] shadow-2xl transition-all duration-200 ${
          isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between h-10 px-2">
          {/* Hamburger */}
          <button className="text-[#0B1C2C] p-1" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo + Text */}
          <Link href="/" className="flex items-center gap-1">
            <Image src="/images/favicon.png" alt="Logo" width={20} height={20} className="w-5 h-5" />
            <span className="text-[10px] font-bold text-[#0B1C2C] tracking-wider whitespace-nowrap">
              ATLANTIC FLAGPOLE
            </span>
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-0.5">
            <button className="text-[#0B1C2C] p-1" onClick={() => setMobileSearchOpen(true)} aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <a href={shopifyAccountUrl} className="text-[#0B1C2C] p-1" aria-label="Account">
              <User className="w-5 h-5" />
            </a>
            <Link href="/cart" className="relative text-[#0B1C2C] p-1" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="md:hidden fixed inset-0 z-[99999] bg-white">
          <div className="flex flex-col h-full">
            {/* Search Header */}
            <div className="flex items-center gap-3 p-3 border-b-2 border-[#C8A55C] bg-white shadow-md">
              <button onClick={() => setMobileSearchOpen(false)} className="text-[#0B1C2C] p-1" aria-label="Close">
                <X className="w-6 h-6" />
              </button>
              <div className="flex-1">
                <SearchBarWrapper className="w-full" autoFocus />
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-4 space-y-2 overflow-y-auto">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Popular Searches</p>
              <Link
                href="/collections/residential-flagpoles"
                onClick={() => setMobileSearchOpen(false)}
                className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-semibold text-[#0B1C2C]"
              >
                Residential Flagpoles
              </Link>
              <Link
                href="/collections/commercial-flagpoles"
                onClick={() => setMobileSearchOpen(false)}
                className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-semibold text-[#0B1C2C]"
              >
                Commercial Flagpoles
              </Link>
              <Link
                href="/flagpole-finder"
                onClick={() => setMobileSearchOpen(false)}
                className="block px-4 py-3 bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] rounded-lg text-sm font-semibold text-white flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Flagpole Finder
              </Link>
            </div>
          </div>
        </div>
      )}

      <header className="relative bg-white z-50 border-b-2 border-gray-200">
        {/* Desktop Top Bar */}
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
            </div>
            <div className="flex gap-6 items-center">
              <a
                href={shopifyAccountUrl}
                className="flex items-center gap-2 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
              >
                <User className="w-4 h-4" />
                My Account
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="md:hidden">
              <div className="flex items-center justify-between h-11 py-1.5">
                {/* Hamburger */}
                <button className="text-[#0B1C2C] p-1" onClick={() => setMobileMenuOpen(true)} aria-label="Menu">
                  <Menu className="w-5 h-5" />
                </button>

                {/* Logo + Brand Text */}
                <Link href="/" className="flex items-center gap-1.5">
                  <Image src="/images/favicon.png" alt="Logo" width={24} height={24} className="w-6 h-6" />
                  <span className="text-[11px] font-bold text-[#0B1C2C] tracking-wider whitespace-nowrap">
                    ATLANTIC FLAGPOLE
                  </span>
                </Link>

                {/* Icons: Search, Account, Cart */}
                <div className="flex items-center gap-0.5">
                  <button className="text-[#0B1C2C] p-1" onClick={() => setMobileSearchOpen(true)} aria-label="Search">
                    <Search className="w-5 h-5" />
                  </button>
                  <a href={shopifyAccountUrl} className="text-[#0B1C2C] p-1" aria-label="Account">
                    <User className="w-5 h-5" />
                  </a>
                  <Link href="/cart" className="relative text-[#0B1C2C] p-1" aria-label="Cart">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-between h-24">
              <button className="lg:hidden text-[#0B1C2C]" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-8 h-8" />
              </button>

              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="/images/favicon.png"
                  alt="Atlantic Flagpoles Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
                <span className="text-4xl font-serif font-bold text-[#0B1C2C] tracking-wide hidden sm:block">
                  ATLANTIC FLAGPOLES
                </span>
              </Link>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-lg mx-8">
                <SearchBarWrapper className="w-full" />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6">
                {menuItems.map((item) => {
                  const hasSubItems = item.items && item.items.length > 0

                  if (!hasSubItems) {
                    return (
                      <Link
                        key={item.id}
                        href={item.url}
                        className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-semibold text-sm whitespace-nowrap"
                      >
                        {item.title}
                      </Link>
                    )
                  }

                  return (
                    <div
                      key={item.id}
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-semibold text-sm whitespace-nowrap">
                        {item.title}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === item.id && (
                        <div className="absolute top-full left-0 pt-2 z-[90]">
                          <div className="bg-white border-2 border-[#C8A55C]/30 rounded-lg shadow-xl min-w-[240px] py-2">
                            <div className="px-4 py-2 border-b border-gray-200">
                              <Link href={item.url} className="text-[#C8A55C] hover:text-[#0B1C2C] font-bold text-sm">
                                View All {item.title}
                              </Link>
                            </div>
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.id}
                                href={subItem.url}
                                className="block px-4 py-2 text-[#0B1C2C] hover:bg-[#F5F3EF] hover:text-[#C8A55C] transition-colors text-sm"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {location && stateCode && (
                  <Link
                    href={`/capitals/${stateCode.toLowerCase()}`}
                    className="relative bg-gradient-to-r from-[#0B1C2C] to-[#1a2f42] hover:from-[#0B1C2C]/90 hover:to-[#1a2f42]/90 px-6 py-2.5 rounded-md text-white font-semibold transition-all text-sm shadow-lg hover:shadow-xl group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Shop {location.region}
                    </span>
                  </Link>
                )}

                <Link
                  href="/flagpole-finder"
                  className="relative bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] hover:from-[#a88947] hover:to-[#C8A55C] px-6 py-2.5 rounded-md text-white font-semibold transition-colors text-sm shadow-lg hover:shadow-xl group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Flagpole Finder
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </Link>

                <button
                  onClick={() => setQuizModalOpen(true)}
                  className="bg-[#0B1C2C] hover:bg-[#0B1C2C]/90 px-6 py-2.5 rounded-md text-white font-semibold transition-colors text-sm"
                >
                  Flagpole Quiz
                </button>
              </nav>

              <div className="flex items-center gap-6">
                <a
                  href={shopifyAccountUrl}
                  className="hidden lg:flex items-center gap-2 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors"
                >
                  <User className="w-6 h-6" />
                </a>

                <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors">
                  <ShoppingCart className="w-7 h-7" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <MobileMenuAmazon
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              location={location}
              stateCode={stateCode}
              shopifyAccountUrl={shopifyAccountUrl}
              onQuizOpen={() => setQuizModalOpen(true)}
            />
          </div>
        </div>
      </header>

      <FlagpoleQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  )
}
