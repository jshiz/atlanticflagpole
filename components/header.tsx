"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Menu, X, ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Announcement Bar with Navigation - Reduced padding */}
      <div className="bg-[#0B1C2C] text-white py-1.5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <p className="text-xs font-medium">30-Day Price Match Guarantee</p>
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Secondary Top Bar - Reduced padding */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-1.5 flex justify-end gap-6 text-xs">
          <Link href="/find-store" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium">
            Find in Store
          </Link>
          <Link href="/account" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium">
            My Account
          </Link>
        </div>
      </div>

      {/* Red Promo Banner */}
      <div className="bg-red-600 text-white py-0.5 text-center">
        <p className="text-xs font-bold tracking-wide">66% OFF</p>
      </div>

      {/* Main Header - Reduced height and added search */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-serif font-bold text-[#0B1C2C] tracking-wide">
                ATLANTIC FLAGPOLES
              </span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search flagpoles, accessories..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {/* Flagpoles Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("flagpoles")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
                  Flagpoles
                  <ChevronDown className="w-4 h-4" />
                </button>

                {activeMegaMenu === "flagpoles" && (
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-sm uppercase tracking-wide">By Height</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/products/flagpoles/20ft"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              20 ft Flagpoles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/flagpoles/25ft"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              25 ft Flagpoles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/flagpoles/30ft"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              30 ft Flagpoles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/flagpoles/35ft"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              35 ft+ Flagpoles
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-sm uppercase tracking-wide">By Type</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/products/flagpoles/residential"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Residential
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/flagpoles/commercial"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Commercial
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/flagpoles/telescoping"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Telescoping
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/flagpoles/all"
                              className="text-[#C8A55C] hover:text-[#0B1C2C] transition-colors font-medium text-sm"
                            >
                              View All →
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Nav Items */}
              <Link
                href="/accessories"
                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm"
              >
                Accessories
              </Link>
              <Link
                href="/bundles"
                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm"
              >
                Bundles
              </Link>
              <Link
                href="/quiz"
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-[#0B1C2C] font-medium transition-colors text-sm"
              >
                Take Flagpole Quiz
              </Link>
            </nav>

            {/* Right Side Nav */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/reviews" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-xs">
                Reviews
              </Link>
              <Link href="/compare" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-xs">
                Compare
              </Link>
              <Link href="/about" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-xs">
                About
              </Link>
              <Link href="/help" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-xs">
                Help
              </Link>
              <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-[#0B1C2C]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search flagpoles, accessories..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/products/flagpoles"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Flagpoles
                </Link>
                <Link
                  href="/products/accessories"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accessories
                </Link>
                <Link
                  href="/reviews"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reviews
                </Link>
                <Link
                  href="/about"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Black Promo Bar - Reduced padding */}
      <div className="bg-[#0B1C2C] text-white py-1.5 text-center">
        <p className="text-xs font-medium">Atlantic Flagpoles Starting From $299</p>
      </div>
    </header>
  )
}
