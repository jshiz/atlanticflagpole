"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, ArrowRight, Loader2, Package, Gift, Flag, Sparkles } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'

interface SearchDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setIsSearching(true)
    router.push(`/search?q=${encodeURIComponent(query)}`)
    onClose()
    setIsSearching(false)
  }

  const featuredProducts = [
    {
      title: "Phoenix Premier Kit",
      handle: "phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      price: "$399.99",
      image: "/phoenix-flagpole-kit.jpg",
      badge: "Bundle"
    },
    {
      title: "Commander's Accessory Kit",
      handle: "commanders-accessory-kit-solar-light-gold-eagle-flash-collar",
      price: "$199.99",
      image: "/solar-light-eagle-topper.jpg",
      badge: "Accessories"
    },
    {
      title: "Poly Extra US Flag",
      handle: "poly-extra-us-flag",
      price: "$29.99",
      image: "/american-flag.png",
      badge: "Flag"
    }
  ]

  const quickCategories = [
    { name: "Flagpoles", href: "/collections/telescoping-flagpoles", icon: Package, color: "bg-blue-50 text-blue-600" },
    { name: "Bundles", href: "/collections/bundles", icon: Gift, color: "bg-purple-50 text-purple-600" },
    { name: "US Flags", href: "/collections/usa-flags", icon: Flag, color: "bg-red-50 text-red-600" },
    { name: "Accessories", href: "/collections/parts-accessories", icon: Sparkles, color: "bg-amber-50 text-amber-600" }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[90vw] max-w-md h-full p-0 flex flex-col border-l-4 border-[#C8A55C] z-[200] rounded-l-3xl"
      >
        <SheetHeader className="p-3 bg-[#0B1C2C] text-white shrink-0 rounded-tl-3xl border-b-2 border-[#C8A55C]/30">
          <div className="flex items-center justify-between mb-2">
            <SheetTitle className="text-white flex items-center gap-2 text-base font-bold">
              <Search className="w-4 h-4 text-[#C8A55C]" />
              Search
            </SheetTitle>
            <button 
              onClick={onClose} 
              className="text-white hover:text-[#C8A55C] transition-colors p-1.5 hover:bg-white/10 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-9 pl-8 pr-4 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:ring-[#C8A55C] focus:border-[#C8A55C] text-xs"
              autoFocus
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <Button 
              type="submit" 
              className="absolute right-0.5 top-1/2 -translate-y-1/2 bg-[#C8A55C] hover:bg-[#B69446] text-white h-8 w-8 p-0 rounded-lg"
              disabled={!query.trim() || isSearching}
            >
              {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Button>
          </form>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-3 bg-white">
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={onClose}
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:border-[#C8A55C] hover:shadow-sm transition-all group"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-[#0B1C2C]">{category.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Featured Products</h3>
              <div className="grid grid-cols-1 gap-2">
                {featuredProducts.map((product) => (
                  <Link
                    key={product.handle}
                    href={`/product/${product.handle}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded-xl border border-gray-200 hover:border-[#C8A55C] hover:shadow-sm transition-all group"
                  >
                    <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-1 left-1 bg-[#C8A55C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {product.badge}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0B1C2C] line-clamp-2 mb-0.5">{product.title}</p>
                      <p className="text-sm font-bold text-[#C8A55C]">{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Popular Searches</h3>
              <div className="flex flex-wrap gap-1.5">
                {["Phoenix Flagpole", "US Flags", "Solar Lights", "Hardware", "State Flags", "Military Flags", "Eagle Toppers", "Flash Collars"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term)
                      router.push(`/search?q=${encodeURIComponent(term)}`)
                      onClose()
                    }}
                    className="px-2.5 py-1 bg-gray-100 hover:bg-[#0B1C2C] hover:text-white text-gray-700 rounded-lg text-[10px] font-medium transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
