"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-[#0B1C2C] border-b border-[#C8A55C]/20">
      {/* Top Bar */}
      <div className="bg-[#C8A55C] text-[#0B1C2C] py-2 text-center text-sm font-medium">
        <p>Forever Warranty* | Free Shipping | Made in USA</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-serif font-bold text-[#C8A55C] tracking-wide">
              ATLANTIC FLAGPOLES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Flagpoles Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu("flagpoles")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1 text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium">
                Flagpoles
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeMegaMenu === "flagpoles" && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-[#0B1C2C] border border-[#C8A55C]/20 rounded-lg shadow-xl p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-[#C8A55C] font-bold mb-3 text-sm uppercase tracking-wide">By Height</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/products/flagpoles/20ft"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            20 ft Flagpoles
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/flagpoles/25ft"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            25 ft Flagpoles
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/flagpoles/30ft"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            30 ft Flagpoles
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/flagpoles/35ft"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
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
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            Residential
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/flagpoles/commercial"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            Commercial
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/flagpoles/telescoping"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            Telescoping
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/flagpoles/all"
                            className="text-[#C8A55C] hover:text-white transition-colors font-medium"
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

            {/* Accessories Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu("accessories")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1 text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium">
                Accessories
                <ChevronDown className="w-4 h-4" />
              </button>

              {activeMegaMenu === "accessories" && (
                <div className="absolute top-full left-0 mt-2 w-[500px] bg-[#0B1C2C] border border-[#C8A55C]/20 rounded-lg shadow-xl p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/products/accessories/flags"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            American Flags
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/accessories/finials"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            Finials & Toppers
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/accessories/lights"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            Solar Lights
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/products/accessories/hardware"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            Hardware Kits
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/accessories/ground-sleeves"
                            className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
                          >
                            Ground Sleeves
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/accessories/all"
                            className="text-[#C8A55C] hover:text-white transition-colors font-medium"
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

            <Link href="/reviews" className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium">
              Reviews
            </Link>
            <Link href="/about" className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative text-[#F5F3EF] hover:text-[#C8A55C] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#C8A55C] text-[#0B1C2C] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <button
              className="lg:hidden text-[#F5F3EF] hover:text-[#C8A55C] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#C8A55C]/20">
            <nav className="flex flex-col gap-4">
              <Link
                href="/products/flagpoles"
                className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Flagpoles
              </Link>
              <Link
                href="/products/accessories"
                className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link
                href="/reviews"
                className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/about"
                className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-[#F5F3EF] hover:text-[#C8A55C] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
