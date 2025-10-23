"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, ChevronDown, User, Sparkles } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"

interface MenuItem {
  id: string
  title: string
  url: string
  items?: MenuItem[]
}

interface HeaderProps {
  menuData: {
    items: MenuItem[]
  } | null
  collectionsData: Record<string, { products: { nodes: any[] } }>
}

export function Header({ menuData, collectionsData }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges?.length || 0

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
      <header className="relative bg-white z-50 border-b-2 border-gray-200">
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
            <div className="flex gap-4 items-center">
              <a
                href={shopifyAccountUrl}
                className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
              >
                <User className="w-3.5 h-3.5" />
                My Account
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Mobile Menu Button */}
              <button className="lg:hidden text-[#0B1C2C]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/favicon.png"
                  alt="Atlantic Flagpoles Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-2xl font-serif font-bold text-[#0B1C2C] tracking-wide hidden sm:block">
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
                        <div className="absolute top-full left-0 pt-2 z-50">
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

              {/* Cart Icon */}
              <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C8A55C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden py-4 border-t border-gray-200">
                <div className="mb-4">
                  <SearchBarWrapper />
                </div>
                <nav className="flex flex-col gap-3">
                  {menuItems.length === 0 && (
                    <div className="text-red-600 font-bold text-sm p-4 bg-red-50 rounded">
                      NO MENU ITEMS - Check console for details
                    </div>
                  )}

                  {menuItems.map((item) => (
                    <div key={item.id}>
                      <Link
                        href={item.url}
                        className="block text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-semibold py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                      {item.items && item.items.length > 0 && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.url}
                              className="block text-[#0B1C2C]/70 hover:text-[#C8A55C] transition-colors text-sm py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <Link
                    href="/flagpole-finder"
                    onClick={() => setMobileMenuOpen(false)}
                    className="relative bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] px-4 py-3 rounded-md text-white font-semibold transition-all mt-4 shadow-lg flex items-center justify-center gap-2 overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Find Your Perfect Flagpole
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] opacity-0 group-active:opacity-100 blur-xl transition-opacity duration-300" />
                  </Link>

                  <button
                    onClick={() => {
                      setQuizModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className="text-left bg-[#0B1C2C] hover:bg-[#0B1C2C]/90 px-4 py-3 rounded-md text-white font-semibold transition-colors"
                  >
                    Flagpole Quiz
                  </button>
                </nav>
              </div>
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
