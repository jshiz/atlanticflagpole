"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, ChevronDown, User, Sparkles, MapPin, ChevronRight } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"
import { useGeo } from "@/lib/geo/context"
import { getStateCodeFromRegion } from "@/lib/geo/state-mapping"

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
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges?.length || 0
  const { location } = useGeo()
  const stateCode = location ? getStateCodeFromRegion(location.region) : null

  const shopifyAccountUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`

  useEffect(() => {
    console.log("[v0] 🎯 Header mounted with menu data:", menuData)
    if (menuData) {
      console.log(
        "[v0] ✅ Menu items:",
        menuData.items.map((item) => item.title),
      )
    } else {
      console.log("[v0] ❌ NO MENU DATA - this is the problem!")
    }
  }, [menuData])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = menuData?.items || []

  return (
    <>
      <header className="relative bg-white z-[100] border-b-2 border-gray-200">
        {/* Top Bar */}
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

        {/* Main Header */}
        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-24">
              <button className="lg:hidden text-[#0B1C2C]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                {menuItems.length === 0 && <div className="text-red-600 font-bold text-sm">NO MENU ITEMS LOADED</div>}

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
                  className="relative bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] hover:from-[#a88947] hover:to-[#C8A55C] px-6 py-2.5 rounded-md text-white font-semibold transition-all text-sm shadow-lg hover:shadow-xl group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Flagpole Finder
                  </span>
                  {/* Glowing effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                  {/* Animated shine */}
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
                    <span className="absolute -top-2 -right-2 bg-[#C8A55C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {mobileMenuOpen && (
              <>
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/50 z-[200] lg:hidden" onClick={() => setMobileMenuOpen(false)} />

                {/* Drawer */}
                <div className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[201] lg:hidden overflow-y-auto shadow-2xl">
                  {/* Header with Close Button */}
                  <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-[#F5F3EF]">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/favicon.png"
                        alt="Atlantic Flagpoles"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                      <span className="text-lg font-serif font-bold text-[#0B1C2C]">ATLANTIC</span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-[#0B1C2C] p-2">
                      <X className="w-7 h-7" />
                    </button>
                  </div>

                  {/* Hello, Sign In Section */}
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#0B1C2C] to-[#1a2f42]">
                    <a
                      href={shopifyAccountUrl}
                      className="flex items-center gap-3 text-white hover:text-[#C8A55C] transition-colors"
                    >
                      <div className="bg-white/10 p-3 rounded-full">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm text-white/80">Hello, Sign In</div>
                        <div className="text-lg font-semibold">My Account</div>
                      </div>
                      <ChevronRight className="w-5 h-5 ml-auto" />
                    </a>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-6 space-y-3 border-b border-gray-200">
                    <div className="text-xs font-semibold text-[#0B1C2C]/60 uppercase tracking-wider mb-3">
                      Quick Actions
                    </div>

                    {location && stateCode && (
                      <Link
                        href={`/capitals/${stateCode.toLowerCase()}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-4 bg-gradient-to-r from-[#0B1C2C] to-[#1a2f42] p-4 rounded-lg text-white hover:shadow-lg transition-all"
                      >
                        <div className="bg-white/10 p-2 rounded-lg">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-semibold">Shop by State</div>
                          <div className="text-sm text-white/80">{location.region} Flagpoles</div>
                        </div>
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    )}

                    <Link
                      href="/flagpole-finder"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] p-4 rounded-lg text-white hover:shadow-lg transition-all"
                    >
                      <div className="bg-white/10 p-2 rounded-lg">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-semibold">Flagpole Finder</div>
                        <div className="text-sm text-white/80">Find Your Perfect Pole</div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </Link>

                    <button
                      onClick={() => {
                        setQuizModalOpen(true)
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-4 bg-[#0B1C2C] p-4 rounded-lg text-white hover:bg-[#0B1C2C]/90 transition-all w-full"
                    >
                      <div className="bg-white/10 p-2 rounded-lg">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-base font-semibold">Flagpole Quiz</div>
                        <div className="text-sm text-white/80">Get Personalized Recommendations</div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Navigation Menu */}
                  <nav className="p-6 space-y-1">
                    <div className="text-xs font-semibold text-[#0B1C2C]/60 uppercase tracking-wider mb-3">
                      Shop Categories
                    </div>
                    {menuItems.map((item) => (
                      <div key={item.id}>
                        <Link
                          href={item.url}
                          className="flex items-center justify-between text-[#0B1C2C] hover:text-[#C8A55C] hover:bg-[#F5F3EF] transition-colors font-semibold py-3 px-3 rounded-lg text-base"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{item.title}</span>
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                        {item.items && item.items.length > 0 && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.id}
                                href={subItem.url}
                                className="block text-[#0B1C2C]/70 hover:text-[#C8A55C] hover:bg-[#F5F3EF] transition-colors py-2 px-3 rounded-lg text-sm"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Bottom Links */}
                  <div className="p-6 border-t border-gray-200 space-y-2 bg-[#F5F3EF]">
                    <Link
                      href="/guarantee"
                      className="block text-[#0B1C2C] hover:text-[#C8A55C] transition-colors py-2 text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Our Guarantee
                    </Link>
                    <Link
                      href="/about"
                      className="block text-[#0B1C2C] hover:text-[#C8A55C] transition-colors py-2 text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-[#0B1C2C] hover:text-[#C8A55C] transition-colors py-2 text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Sticky Header on Scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-gray-200 shadow-lg transition-all duration-300 ${
          isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/favicon.png"
                alt="Atlantic Flagpoles Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-serif font-bold text-[#0B1C2C] hidden sm:block">ATLANTIC FLAGPOLES</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-semibold text-sm"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

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

      <FlagpoleQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  )
}
