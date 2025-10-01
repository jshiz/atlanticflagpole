"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, ChevronDown, Search, User } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"

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
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)

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
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search flagpoles, flags, accessories..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-6 order-3">
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
                    <div className="absolute top-full left-0 mt-2 w-[700px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">By Type</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/flagpoles/telescoping"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Telescoping Flagpoles
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flagpoles/aluminum"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Aluminum Flagpoles
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flagpoles/indoor"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Indoor Flagpoles
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">
                            Kits & Bundles
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/flagpoles/kits"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Flagpole Kits
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flagpoles/presidential-package"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Presidential Package
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flagpoles/patriot-bundle"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Phoenix Patriot Bundle
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">By Height</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/flagpoles/20ft"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                20 ft Flagpoles
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flagpoles/25ft"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                25 ft Flagpoles
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flagpoles/30ft"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                30 ft+ Flagpoles
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
                  onMouseEnter={() => setActiveMegaMenu("flags")}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
                    Flags
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {activeMegaMenu === "flags" && (
                    <div className="absolute top-full left-0 mt-2 w-[800px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                      <div className="grid grid-cols-4 gap-6">
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">National</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/flags/american"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                American Flags
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flags/state"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                State Flags
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flags/international"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                International Flags
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Service</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/flags/military"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Military Flags
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flags/civil-service"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Civil Service Flags
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Historical</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/flags/historical"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Historical Flags
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">
                            Sports & More
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/flags/nfl"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                NFL Flags
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flags/ncaa"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                NCAA Flags
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flags/mlb"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                MLB Flags
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flags/nascar"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                NASCAR Flags
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flags/nba"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                NBA Flags
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/flags/windsocks"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block font-medium"
                              >
                                Windsocks
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
                    <div className="absolute top-full left-0 mt-2 w-[700px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Lighting</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/accessories/flagpole-lighting"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Flagpole Lighting
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Hardware</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/accessories/flagpole-mounts"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Flagpole Mounts
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/accessories/flagpole-toppers"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Flagpole Toppers
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Decorative</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/accessories/weathervanes"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Weathervanes
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/accessories/all"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block font-medium"
                              >
                                Shop All Accessories →
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/holiday"
                  className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm"
                >
                  Holiday & Seasonal
                </Link>

                <div
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu("resources")}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
                    Resources
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {activeMegaMenu === "resources" && (
                    <div className="absolute top-full left-0 mt-2 w-[400px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Learn</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/blog"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Blog
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/installation-guides"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Installation Guides
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/faq"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                FAQ
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Support</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/shipping"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Shipping & Returns
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/warranty"
                                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                              >
                                Warranty Info
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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
                </Link>
                <div className="hidden lg:flex items-center gap-4">
                  <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="lg:hidden py-4 border-t border-gray-200">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search flagpoles, flags, accessories..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent text-sm"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/flagpoles"
                    className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Flagpoles
                  </Link>
                  <Link
                    href="/flags"
                    className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Flags
                  </Link>
                  <Link
                    href="/accessories"
                    className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Accessories
                  </Link>
                  <Link
                    href="/holiday"
                    className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Holiday & Seasonal
                  </Link>
                  <Link
                    href="/resources"
                    className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resources
                  </Link>
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
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    autoFocus
                    onBlur={() => setSearchExpanded(false)}
                    className="w-full pl-3 pr-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent text-sm"
                  />
                </div>
              )}
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
                  <div className="absolute top-full left-0 mt-2 w-[700px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">By Type</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/flagpoles/telescoping"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Telescoping Flagpoles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flagpoles/aluminum"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Aluminum Flagpoles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flagpoles/indoor"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Indoor Flagpoles
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">
                          Kits & Bundles
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/flagpoles/kits"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Flagpole Kits
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flagpoles/presidential-package"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Presidential Package
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flagpoles/patriot-bundle"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Phoenix Patriot Bundle
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">By Height</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/flagpoles/20ft"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              20 ft Flagpoles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flagpoles/25ft"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              25 ft Flagpoles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flagpoles/30ft"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              30 ft+ Flagpoles
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
                onMouseEnter={() => setActiveMegaMenu("flags")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
                  Flags
                  <ChevronDown className="w-4 h-4" />
                </button>

                {activeMegaMenu === "flags" && (
                  <div className="absolute top-full left-0 mt-2 w-[800px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                    <div className="grid grid-cols-4 gap-6">
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">National</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/flags/american"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              American Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flags/state"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              State Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flags/international"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              International Flags
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Service</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/flags/military"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Military Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flags/civil-service"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Civil Service Flags
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Historical</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/flags/historical"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Historical Flags
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Sports & More</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/flags/nfl"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              NFL Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flags/ncaa"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              NCAA Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flags/mlb"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              MLB Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flags/nascar"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              NASCAR Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flags/nba"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              NBA Flags
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/flags/windsocks"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block font-medium"
                            >
                              Windsocks
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
                  <div className="absolute top-full left-0 mt-2 w-[700px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Lighting</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/accessories/flagpole-lighting"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Flagpole Lighting
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Hardware</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/accessories/flagpole-mounts"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Flagpole Mounts
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/accessories/flagpole-toppers"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Flagpole Toppers
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Decorative</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/accessories/weathervanes"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Weathervanes
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/accessories/all"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block font-medium"
                            >
                              Shop All Accessories →
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/holiday"
                className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm"
              >
                Holiday & Seasonal
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("resources")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
                  Resources
                  <ChevronDown className="w-4 h-4" />
                </button>

                {activeMegaMenu === "resources" && (
                  <div className="absolute top-full left-0 mt-2 w-[400px] bg-white border border-gray-200 rounded-lg shadow-xl p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Learn</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/blog"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Blog
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/installation-guides"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Installation Guides
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/faq"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              FAQ
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Support</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/shipping"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Shipping & Returns
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/warranty"
                              className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                            >
                              Warranty Info
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              <Link href="/account" className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors hidden md:block">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FlagpoleQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />
    </>
  )
}
