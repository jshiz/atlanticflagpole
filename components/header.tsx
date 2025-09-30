"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, ChevronDown, Search } from "lucide-react"

const promoMessages = [
  { text: "66% OFF + Free Shipping", discount: "66% OFF" },
  { text: "Save $599 on Accessories Bundle", discount: "SAVE $599" },
  { text: "Limited Time: 60% Off All Flagpoles", discount: "60% OFF" },
  { text: "30-Day Price Match Guarantee", discount: "PRICE MATCH" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

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

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-[#C8A55C] text-[#0B1C2C] py-2.5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative h-6 flex items-center justify-center">
            <div
              className={`transition-all duration-600 ease-in-out ${
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-sm font-bold tracking-wide text-center">{promoMessages[currentPromoIndex].text}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-1.5 flex justify-end gap-6 text-sm">
          <Link href="/find-store" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium">
            Find in Store
          </Link>
          <Link href="/account" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium">
            My Account
          </Link>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-serif font-bold text-[#0B1C2C] tracking-wide">ATLANTIC FLAGPOLES</span>
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

            <nav className="hidden lg:flex items-center gap-6">
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
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm"
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

              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("accessories")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
                  Accessories
                  <ChevronDown className="w-4 h-4" />
                </button>

                {activeMegaMenu === "accessories" && (
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-sm uppercase tracking-wide">Flags</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/accessories/flags/american"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              American Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/accessories/flags/state"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              State Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/accessories/flags/custom"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Custom Flags
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-sm uppercase tracking-wide">Hardware</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/accessories/hardware/clips"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Flag Clips
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/accessories/hardware/finials"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Finials
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/accessories/hardware/cleats"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Cleats
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-sm uppercase tracking-wide">Lighting</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/accessories/lighting/solar"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Solar Lights
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/accessories/lighting/led"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              LED Lights
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("bundles")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
                  Bundles
                  <ChevronDown className="w-4 h-4" />
                </button>

                {activeMegaMenu === "bundles" && (
                  <div className="absolute top-full left-0 mt-2 w-[500px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-sm uppercase tracking-wide">Complete Kits</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/bundles/starter"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Starter Bundle
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/bundles/deluxe"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Deluxe Bundle
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/bundles/premium"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Premium Bundle
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-sm uppercase tracking-wide">Seasonal</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/bundles/holiday"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Holiday Bundle
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/bundles/patriotic"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm"
                            >
                              Patriotic Bundle
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/quiz"
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-[#0B1C2C] font-medium transition-colors text-sm"
              >
                Take Flagpole Quiz
              </Link>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link href="/reviews" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm">
                Reviews
              </Link>
              <Link href="/compare" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm">
                Compare
              </Link>
              <Link href="/about" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm">
                About
              </Link>
              <Link href="/help" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm">
                Help
              </Link>
              <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </div>

            <button className="lg:hidden text-[#0B1C2C]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

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

      <div className="bg-[#0B1C2C] text-white py-1.5 text-center">
        <p className="text-xs font-medium">Atlantic Flagpoles Starting From $299</p>
      </div>
    </header>
  )
}
