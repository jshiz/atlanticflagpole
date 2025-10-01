"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ShoppingCart, MenuIcon, X, ChevronDown, Search } from "lucide-react"
import { FlagpoleQuizModal } from "@/components/quiz/flagpole-quiz-modal"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { SearchBarWrapper } from "@/components/search/search-bar-wrapper"
import type { Menu } from "@/lib/menus"

interface HeaderClientProps {
  menuData: Menu | null
  megaMenuData?: Record<string, any>
}

export function HeaderClient({ menuData, megaMenuData = {} }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart?.lines?.edges ? cart.lines.edges.length : 0

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    console.log("[v0] HeaderClient received megaMenuData:", megaMenuData)
  }, [megaMenuData])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  if (!menuData || !menuData.items || menuData.items.length === 0) {
    console.error("[v0] No menu data available")
    return null
  }

  const menuItems = menuData.items

  const getCollectionHandle = (url: string) => {
    const queryMatch = url.match(/[?&]collection=([^&]+)/)
    if (queryMatch) return queryMatch[1]
    const pathMatch = url.match(/^\/([^/?]+)/)
    return pathMatch ? pathMatch[1] : null
  }

  const handleNavEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsMegaMenuOpen(true)
  }

  const handleNavLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false)
      setActiveDropdown(null)
    }, 150)
  }

  const handleItemHover = (itemId: string) => {
    setActiveDropdown(itemId)
    setIsMegaMenuOpen(true)
  }

  return (
    <>
      <header className="relative bg-white z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button className="lg:hidden text-[#0B1C2C]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
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
              <span className="text-2xl font-serif font-bold text-[#0B1C2C] tracking-wide hidden md:block">
                ATLANTIC FLAGPOLES
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <SearchBarWrapper className="w-full" />
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <div className="relative" onMouseEnter={handleNavEnter} onMouseLeave={handleNavLeave}>
                <nav className="flex items-center gap-6">
                  {menuItems.map((item) => {
                    const hasSubmenu = item.items && item.items.length > 0

                    if (!hasSubmenu) {
                      return (
                        <Link
                          key={item.id}
                          href={item.url}
                          className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-200 font-medium text-sm cursor-pointer"
                        >
                          {item.title}
                        </Link>
                      )
                    }

                    return (
                      <div key={item.id} className="relative" onMouseEnter={() => handleItemHover(item.id)}>
                        <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-all duration-200 font-medium text-sm py-6 cursor-pointer">
                          {item.title}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                              activeDropdown === item.id && isMegaMenuOpen ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>
                      </div>
                    )
                  })}
                </nav>

                {isMegaMenuOpen && activeDropdown && (
                  <div
                    className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg z-50"
                    style={{
                      minWidth: "800px",
                      marginLeft: "calc(-50vw + 50%)",
                      marginRight: "calc(-50vw + 50%)",
                    }}
                  >
                    {menuItems.map((item) => {
                      if (activeDropdown !== item.id) return null

                      const collectionHandle = getCollectionHandle(item.url)
                      const collectionData = collectionHandle ? megaMenuData[collectionHandle] : null

                      return (
                        <div key={item.id} className="container mx-auto px-4 py-6">
                          <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto">
                            {/* Left side - Menu items */}
                            <div className="col-span-3">
                              <h3 className="text-sm font-bold text-[#0B1C2C] mb-3 pb-2 border-b border-gray-200">
                                {item.title}
                              </h3>
                              <ul className="space-y-2">
                                {item.items?.map((subItem) => (
                                  <li key={subItem.id}>
                                    <Link
                                      href={subItem.url}
                                      className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-200 text-sm block py-0.5 relative group/link cursor-pointer"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <Link
                                href={item.url}
                                className="inline-flex items-center gap-1 mt-4 text-[#C8A55C] hover:text-[#a88947] font-semibold text-xs group/viewall transition-colors duration-200 cursor-pointer"
                              >
                                View All
                                <span className="inline-block group-hover/viewall:translate-x-1 transition-transform duration-300">
                                  →
                                </span>
                              </Link>
                            </div>

                            {/* Right side - Featured products */}
                            <div className="col-span-9">
                              {collectionData?.products?.nodes ? (
                                <div className="grid grid-cols-4 gap-4">
                                  {collectionData.products.nodes.slice(0, 4).map((product: any) => (
                                    <Link
                                      key={product.id}
                                      href={`/products/${product.handle}`}
                                      className="group/product cursor-pointer"
                                    >
                                      <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-2 shadow-sm group-hover/product:shadow-md transition-shadow duration-300">
                                        {product.featuredImage ? (
                                          <Image
                                            src={product.featuredImage.url || "/placeholder.svg"}
                                            alt={product.featuredImage.altText || product.title}
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-cover group-hover/product:scale-105 transition-transform duration-300"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Search className="w-8 h-8" />
                                          </div>
                                        )}
                                      </div>
                                      <h4 className="text-xs font-medium text-[#0B1C2C] group-hover/product:text-[#C8A55C] transition-colors duration-200 line-clamp-2 mb-1">
                                        {product.title}
                                      </h4>
                                      <p className="text-xs font-semibold text-gray-600">
                                        ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                                      </p>
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <div className="grid grid-cols-4 gap-4">
                                  {menuItems.map((item) => (
                                    <Link key={item.id} href={item.url} className="group/product cursor-pointer">
                                      <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-2 flex items-center justify-center shadow-sm group-hover/product:shadow-md transition-shadow duration-300">
                                        <span className="text-3xl">🏴</span>
                                      </div>
                                      <h4 className="text-xs font-medium text-[#0B1C2C] group-hover/product:text-[#C8A55C] transition-colors duration-200">
                                        {item.title}
                                      </h4>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => setQuizModalOpen(true)}
                className="bg-[#C8A55C] hover:bg-[#a88947] px-6 py-2.5 rounded-md text-white font-medium transition-all duration-200 hover:shadow-md text-sm cursor-pointer"
              >
                Take Quiz
              </button>
            </div>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-200 cursor-pointer"
            >
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
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <Link
                      href={item.url}
                      className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-200 font-medium block cursor-pointer"
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
                            className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-200 text-sm block cursor-pointer"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    setQuizModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="text-left bg-[#C8A55C] hover:bg-[#a88947] px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 cursor-pointer"
                >
                  Take Flagpole Quiz
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md transition-all duration-300 ease-out ${
          isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/images/favicon.png"
                alt="Atlantic Flagpoles Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-serif font-bold text-[#0B1C2C] tracking-wide hidden md:block">
                ATLANTIC FLAGPOLES
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              <div className="relative" onMouseEnter={handleNavEnter} onMouseLeave={handleNavLeave}>
                <nav className="flex items-center gap-6">
                  {menuItems.map((item) => {
                    const hasSubmenu = item.items && item.items.length > 0

                    if (!hasSubmenu) {
                      return (
                        <Link
                          key={item.id}
                          href={item.url}
                          className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-200 font-medium text-sm cursor-pointer"
                        >
                          {item.title}
                        </Link>
                      )
                    }

                    return (
                      <div key={item.id} className="relative" onMouseEnter={() => handleItemHover(item.id)}>
                        <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-all duration-200 font-medium text-sm py-6 cursor-pointer">
                          {item.title}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                              activeDropdown === item.id && isMegaMenuOpen ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>
                      </div>
                    )
                  })}
                </nav>

                {isMegaMenuOpen && activeDropdown && (
                  <div
                    className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg z-50"
                    style={{
                      minWidth: "800px",
                      marginLeft: "calc(-50vw + 50%)",
                      marginRight: "calc(-50vw + 50%)",
                    }}
                  >
                    {menuItems.map((item) => {
                      if (activeDropdown !== item.id) return null

                      const collectionHandle = getCollectionHandle(item.url)
                      const collectionData = collectionHandle ? megaMenuData[collectionHandle] : null

                      return (
                        <div key={item.id} className="container mx-auto px-4 py-6">
                          <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto">
                            {/* Left side - Menu items */}
                            <div className="col-span-3">
                              <h3 className="text-sm font-bold text-[#0B1C2C] mb-3 pb-2 border-b border-gray-200">
                                {item.title}
                              </h3>
                              <ul className="space-y-2">
                                {item.items?.map((subItem) => (
                                  <li key={subItem.id}>
                                    <Link
                                      href={subItem.url}
                                      className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-200 text-sm block py-0.5 relative group/link cursor-pointer"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <Link
                                href={item.url}
                                className="inline-flex items-center gap-1 mt-4 text-[#C8A55C] hover:text-[#a88947] font-semibold text-xs group/viewall transition-colors duration-200 cursor-pointer"
                              >
                                View All
                                <span className="inline-block group-hover/viewall:translate-x-1 transition-transform duration-300">
                                  →
                                </span>
                              </Link>
                            </div>

                            {/* Right side - Featured products */}
                            <div className="col-span-9">
                              {collectionData?.products?.nodes ? (
                                <div className="grid grid-cols-4 gap-4">
                                  {collectionData.products.nodes.slice(0, 4).map((product: any) => (
                                    <Link
                                      key={product.id}
                                      href={`/products/${product.handle}`}
                                      className="group/product cursor-pointer"
                                    >
                                      <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-2 shadow-sm group-hover/product:shadow-md transition-shadow duration-300">
                                        {product.featuredImage ? (
                                          <Image
                                            src={product.featuredImage.url || "/placeholder.svg"}
                                            alt={product.featuredImage.altText || product.title}
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-cover group-hover/product:scale-105 transition-transform duration-300"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Search className="w-8 h-8" />
                                          </div>
                                        )}
                                      </div>
                                      <h4 className="text-xs font-medium text-[#0B1C2C] group-hover/product:text-[#C8A55C] transition-colors duration-200 line-clamp-2 mb-1">
                                        {product.title}
                                      </h4>
                                      <p className="text-xs font-semibold text-gray-600">
                                        ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                                      </p>
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <div className="grid grid-cols-4 gap-4">
                                  {menuItems.map((item) => (
                                    <Link key={item.id} href={item.url} className="group/product cursor-pointer">
                                      <div className="aspect-square bg-gray-50 rounded overflow-hidden mb-2 flex items-center justify-center shadow-sm group-hover/product:shadow-md transition-shadow duration-300">
                                        <span className="text-3xl">🏴</span>
                                      </div>
                                      <h4 className="text-xs font-medium text-[#0B1C2C] group-hover/product:text-[#C8A55C] transition-colors duration-200">
                                        {item.title}
                                      </h4>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => setQuizModalOpen(true)}
                className="bg-[#C8A55C] hover:bg-[#a88947] px-6 py-2.5 rounded-md text-white font-medium transition-all duration-200 hover:shadow-md text-sm cursor-pointer"
              >
                Take Quiz
              </button>
            </div>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative text-[#0B1C2C] hover:text-[#C8A55C] transition-colors duration-200 cursor-pointer"
            >
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
