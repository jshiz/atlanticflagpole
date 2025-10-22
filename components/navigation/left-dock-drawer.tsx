"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Search, ShoppingCart, HelpCircle, Package, Sparkles, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface LeftDockDrawerProps {
  cartCount?: number
  menuItems: Array<{
    title: string
    href?: string
    submenu?: Array<{ title: string; href: string }>
  }>
}

export function LeftDockDrawer({ cartCount = 0, menuItems }: LeftDockDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<"browse" | "search" | "help" | "ai">("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [aiQuery, setAiQuery] = useState("")

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return (
    <>
      {/* Glowing Docked Bar */}
      <div
        className={`fixed left-0 top-0 h-full w-16 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-[10000] transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6">
          {/* Logo/Home Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 flex items-center justify-center group relative"
          >
            <Home className="w-6 h-6 text-white" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {isOpen ? "Close Menu" : "Open Menu"}
            </div>
          </button>

          {/* AI Finder Button */}
          <button
            onClick={() => {
              setIsOpen(true)
              setActiveSection("ai")
            }}
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 flex items-center justify-center group relative animate-pulse"
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              AI Flagpole Finder
            </div>
          </button>

          {/* Browse Products Button */}
          <button
            onClick={() => {
              setIsOpen(true)
              setActiveSection("browse")
            }}
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 flex items-center justify-center group relative"
          >
            <Package className="w-6 h-6 text-white" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Browse Products
            </div>
          </button>

          {/* Search Button */}
          <button
            onClick={() => {
              setIsOpen(true)
              setActiveSection("search")
            }}
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 flex items-center justify-center group relative"
          >
            <Search className="w-6 h-6 text-white" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Search
            </div>
          </button>

          {/* Help Center Button */}
          <button
            onClick={() => {
              setIsOpen(true)
              setActiveSection("help")
            }}
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 flex items-center justify-center group relative"
          >
            <HelpCircle className="w-6 h-6 text-white" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Help Center
            </div>
          </button>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 flex items-center justify-center group relative mt-auto"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                {cartCount}
              </Badge>
            )}
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Cart ({cartCount})
            </div>
          </Link>
        </div>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]" onClick={() => setIsOpen(false)} />
      )}

      {/* Drawer Content */}
      <div
        className={`fixed left-16 top-0 h-full bg-white dark:bg-gray-900 shadow-2xl z-[10001] transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-[90vw] sm:w-[400px] md:w-[500px] lg:w-[600px]`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeSection === "ai" && "✨ AI Flagpole Finder"}
              {activeSection === "browse" && "📦 Browse Products"}
              {activeSection === "search" && "🔍 Search"}
              {activeSection === "help" && "❓ Help Center"}
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* AI Flagpole Finder Section */}
            {activeSection === "ai" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Find Your Perfect Flagpole
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Tell me what you're looking for and I'll help you find the perfect flagpole!
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="e.g., 'I need a 20ft flagpole for my front yard'"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      className="bg-white dark:bg-gray-800"
                    />
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Ask AI
                    </Button>
                  </div>
                </div>

                {/* Quick Suggestions */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quick Questions:</h4>
                  {[
                    "What size flagpole do I need?",
                    "Best flagpole for windy areas?",
                    "Residential vs commercial flagpoles?",
                    "How to install a flagpole?",
                  ].map((question) => (
                    <button
                      key={question}
                      onClick={() => setAiQuery(question)}
                      className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Browse Products Section */}
            {activeSection === "browse" && (
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.title} className="space-y-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white">{item.title}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                      </Link>
                    ) : (
                      <>
                        <div className="font-semibold text-gray-900 dark:text-white p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          {item.title}
                        </div>
                        {item.submenu && (
                          <div className="pl-4 space-y-1">
                            {item.submenu.map((subitem) => (
                              <Link
                                key={subitem.href}
                                href={subitem.href}
                                onClick={() => setIsOpen(false)}
                                className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                              >
                                {subitem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Search Section */}
            {activeSection === "search" && (
              <div className="space-y-4">
                <Input
                  placeholder="Search products, collections, help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 dark:text-gray-400">Start typing to search...</div>
              </div>
            )}

            {/* Help Center Section */}
            {activeSection === "help" && (
              <div className="space-y-4">
                {[
                  { title: "Installation Guides", href: "/help-center/installation" },
                  { title: "Product Care", href: "/help-center/care" },
                  { title: "Warranty Information", href: "/help-center/warranty" },
                  { title: "Shipping & Returns", href: "/help-center/shipping" },
                  { title: "Contact Support", href: "/help-center/contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer - Quick Actions */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex gap-3">
              <Link href="/cart" className="flex-1" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Cart ({cartCount})
                </Button>
              </Link>
              <Link href="/checkout" className="flex-1" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-green-600 hover:bg-green-700">Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
