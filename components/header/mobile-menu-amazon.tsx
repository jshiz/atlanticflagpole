"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ChevronRight, ChevronLeft, User, Sparkles, MapPin, Package } from "lucide-react"
import { navigationConfig, singleNavItems } from "@/lib/navigation-config"

interface MobileMenuAmazonProps {
  isOpen: boolean
  onClose: () => void
  location?: { region: string } | null
  stateCode?: string | null
  shopifyAccountUrl: string
  onQuizOpen: () => void
}

type PanelView = "main" | "category" | "subcategory"

interface PanelState {
  view: PanelView
  categoryIndex?: number
  subcategoryIndex?: number
  title?: string
}

export function MobileMenuAmazon({
  isOpen,
  onClose,
  location,
  stateCode,
  shopifyAccountUrl,
  onQuizOpen,
}: MobileMenuAmazonProps) {
  const [panelStack, setPanelStack] = useState<PanelState[]>([{ view: "main" }])
  const currentPanel = panelStack[panelStack.length - 1]

  useEffect(() => {
    if (!isOpen) {
      setPanelStack([{ view: "main" }])
    }
  }, [isOpen])

  useEffect(() => {
    console.log("[v0] Mobile menu isOpen:", isOpen)
  }, [isOpen])

  const navigateToCategory = (categoryIndex: number, title: string) => {
    setPanelStack([...panelStack, { view: "category", categoryIndex, title }])
  }

  const navigateToSubcategory = (subcategoryIndex: number, title: string) => {
    setPanelStack([...panelStack, { view: "subcategory", subcategoryIndex, title }])
  }

  const navigateBack = () => {
    if (panelStack.length > 1) {
      setPanelStack(panelStack.slice(0, -1))
    }
  }

  const handleClose = () => {
    setPanelStack([{ view: "main" }])
    onClose()
  }

  const handleLinkClick = () => {
    handleClose()
  }

  if (!isOpen) return null

  const selectedCategory =
    currentPanel.categoryIndex !== undefined ? navigationConfig[currentPanel.categoryIndex] : null
  const selectedSubcategory =
    selectedCategory && currentPanel.subcategoryIndex !== undefined
      ? selectedCategory.categories[currentPanel.subcategoryIndex]
      : null

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[200] animate-in fade-in duration-200" onClick={handleClose} />
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[201] overflow-hidden shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#232F3E] text-white shrink-0">
          {panelStack.length > 1 ? (
            <button
              onClick={navigateBack}
              className="flex items-center gap-2 text-white hover:text-[#C8A55C] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="font-semibold text-lg">Back</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <User className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold">Hello, Sign In</span>
            </div>
          )}
          <button onClick={handleClose} className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Panel */}
          {currentPanel.view === "main" && (
            <div className="animate-in slide-in-from-left duration-200">
              {/* Account Section */}
              <div className="p-4 border-b border-gray-200">
                <a
                  href={shopifyAccountUrl}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0B1C2C] to-[#1a2f42] rounded-lg text-white hover:shadow-lg transition-all"
                  onClick={handleLinkClick}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-lg">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-white/80">Hello, Sign In</div>
                      <div className="text-base font-semibold">My Account</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>

              {/* Featured Products */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-[#F5F3EF] to-white">
                <h3 className="text-lg font-bold text-[#0B1C2C] mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#C8A55C]" />
                  Featured Products
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle"
                    onClick={handleLinkClick}
                    className="flex items-start gap-3 p-3 bg-white hover:bg-[#F5F3EF] rounded-lg transition-all shadow-sm hover:shadow-md border border-gray-100"
                  >
                    <div className="relative w-16 h-16 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src="https://cdn.shopify.com/s/files/1/2133/9559/files/Phoenix_Telescoping_Flagpole_Premier_Kit_-_Starter_Bundle.png?v=1761115372"
                        alt="Phoenix Premier Kit"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#C8A55C] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          Most Popular
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#0B1C2C] mb-1">Phoenix Premier Kit</h4>
                      <p className="text-xs text-gray-600 mb-2">Complete bundle with all accessories included</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0B1C2C]">Starting at $779</span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/collections/telescoping-flagpoles"
                    onClick={handleLinkClick}
                    className="flex items-start gap-3 p-3 bg-white hover:bg-[#F5F3EF] rounded-lg transition-all shadow-sm hover:shadow-md border border-gray-100"
                  >
                    <div className="relative w-16 h-16 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src="https://cdn.shopify.com/s/files/1/2133/9559/files/phoenix-telescoping-flagpole-usa-flag.jpg?v=1735597814"
                        alt="Telescoping Flagpoles"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          Best Seller
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#0B1C2C] mb-1">Telescoping Flagpoles</h4>
                      <p className="text-xs text-gray-600 mb-2">Easy install, no ladders needed</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0B1C2C]">Shop Collection</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Trending / Quick Actions */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#0B1C2C] mb-3">Trending</h3>
                <div className="space-y-2">
                  {location && stateCode && (
                    <Link
                      href={`/capitals/${stateCode.toLowerCase()}`}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#C8A55C]" />
                        <span className="text-[#0B1C2C] font-medium">Shop {location.region}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  )}
                  <Link
                    href="/flagpole-finder"
                    onClick={handleLinkClick}
                    className="flex items-center justify-between p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-[#C8A55C]" />
                      <span className="text-[#0B1C2C] font-medium">Flagpole Finder</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                  <button
                    onClick={() => {
                      onQuizOpen()
                      handleClose()
                    }}
                    className="flex items-center justify-between p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors w-full"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-[#C8A55C]" />
                      <span className="text-[#0B1C2C] font-medium">Flagpole Quiz</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Shop by Department */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#0B1C2C] mb-3">Shop by Department</h3>
                <div className="space-y-1">
                  {navigationConfig.map((category, index) => (
                    <button
                      key={category.label}
                      onClick={() => navigateToCategory(index, category.label)}
                      className="flex items-center justify-between w-full p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors text-left"
                    >
                      <span className="text-[#0B1C2C] font-medium">{category.label}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                  {singleNavItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between w-full p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors"
                    >
                      <span className="text-[#0B1C2C] font-medium">{item.label}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Help & Settings */}
              <div className="p-4 border-t border-gray-200 bg-[#F5F3EF]">
                <h3 className="text-sm font-semibold text-[#0B1C2C]/60 uppercase tracking-wider mb-3">
                  Help & Settings
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/help-center"
                    onClick={handleLinkClick}
                    className="block text-[#0B1C2C] hover:text-[#C8A55C] transition-colors py-2 font-medium"
                  >
                    Help Center
                  </Link>
                  <Link
                    href="/guarantee"
                    onClick={handleLinkClick}
                    className="block text-[#0B1C2C] hover:text-[#C8A55C] transition-colors py-2 font-medium"
                  >
                    Our Guarantee
                  </Link>
                  <Link
                    href="/about"
                    onClick={handleLinkClick}
                    className="block text-[#0B1C2C] hover:text-[#C8A55C] transition-colors py-2 font-medium"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    onClick={handleLinkClick}
                    className="block text-[#0B1C2C] hover:text-[#C8A55C] transition-colors py-2 font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Category Panel */}
          {currentPanel.view === "category" && selectedCategory && (
            <div className="animate-in slide-in-from-right duration-200">
              {/* Category Header */}
              <div className="p-4 border-b border-gray-200 bg-[#F5F3EF]">
                <h2 className="text-xl font-bold text-[#0B1C2C]">{currentPanel.title}</h2>
                {selectedCategory.href && (
                  <Link
                    href={selectedCategory.href}
                    onClick={handleLinkClick}
                    className="text-sm text-[#C8A55C] hover:text-[#0B1C2C] font-semibold mt-1 inline-block"
                  >
                    View All {currentPanel.title}
                  </Link>
                )}
              </div>

              {/* Subcategories */}
              <div className="p-4">
                {selectedCategory.categories.map((subcategory, index) => (
                  <div key={subcategory.label} className="mb-4">
                    <button
                      onClick={() => navigateToSubcategory(index, subcategory.label)}
                      className="flex items-center justify-between w-full p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors text-left mb-2"
                    >
                      <span className="text-[#0B1C2C] font-semibold">{subcategory.label}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    {/* Show first 3 items as preview */}
                    <div className="ml-4 space-y-1">
                      {subcategory.items.slice(0, 3).map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={handleLinkClick}
                          className="block text-[#0B1C2C]/70 hover:text-[#C8A55C] hover:bg-[#F5F3EF] transition-colors py-2 px-3 rounded-lg text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                      {subcategory.items.length > 3 && (
                        <button
                          onClick={() => navigateToSubcategory(index, subcategory.label)}
                          className="block text-[#C8A55C] hover:text-[#0B1C2C] transition-colors py-2 px-3 text-sm font-semibold"
                        >
                          See all {subcategory.items.length} items →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subcategory Panel */}
          {currentPanel.view === "subcategory" && selectedCategory && selectedSubcategory && (
            <div className="animate-in slide-in-from-right duration-200">
              {/* Subcategory Header */}
              <div className="p-4 border-b border-gray-200 bg-[#F5F3EF]">
                <h2 className="text-xl font-bold text-[#0B1C2C]">{currentPanel.title}</h2>
              </div>

              {/* Items */}
              <div className="p-4">
                <div className="space-y-1">
                  {selectedSubcategory.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between p-3 hover:bg-[#F5F3EF] rounded-lg transition-colors"
                    >
                      <div>
                        <div className="text-[#0B1C2C] font-medium">{item.label}</div>
                        {item.description && <div className="text-xs text-[#0B1C2C]/60 mt-0.5">{item.description}</div>}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
