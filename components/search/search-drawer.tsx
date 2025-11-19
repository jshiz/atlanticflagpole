"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, ArrowRight, Loader2, Package, Gift, Flag, Sparkles } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { getFeaturedProducts } from "@/app/actions/get-featured-products"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface SearchDrawerProps {
  isOpen: boolean
  onClose: () => void
  side?: "right" | "bottom"
}

export function SearchDrawer({ isOpen, onClose, side = "right" }: SearchDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={side} 
        className="p-0 flex flex-col z-[90] bg-white shadow-2xl transition-all duration-500 ease-in-out"
      >
        <SearchContent onClose={onClose} />
      </SheetContent>
    </Sheet>
  )
}

interface SearchContentProps {
  onClose: () => void
}

export function SearchContent({ onClose }: SearchContentProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (featuredProducts.length === 0) {
      setIsLoadingProducts(true)
      getFeaturedProducts().then((products) => {
        setFeaturedProducts(products)
        setIsLoadingProducts(false)
      })
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setIsSearching(true)
    router.push(`/search?q=${encodeURIComponent(query)}`)
    onClose()
    setIsSearching(false)
  }

  const quickCategories = [
    { name: "Flagpoles", href: "/collections/telescoping-flagpoles", icon: Package, color: "bg-blue-50 text-blue-600" },
    { name: "Bundles", href: "/collections/bundles", icon: Gift, color: "bg-purple-50 text-purple-600" },
    { name: "US Flags", href: "/collections/usa-flags", icon: Flag, color: "bg-red-50 text-red-600" },
    { name: "Accessories", href: "/collections/parts-accessories", icon: Sparkles, color: "bg-amber-50 text-amber-600" }
  ]

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="p-2 bg-[#0B1C2C] text-white shrink-0 border-b-2 border-[#C8A55C]/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Search className="w-3.5 h-3.5 text-[#C8A55C]" />
            Search
          </div>
          <button 
            onClick={onClose} 
            className="text-white hover:text-[#C8A55C] transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-8 pl-7 pr-4 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:ring-[#C8A55C] focus:border-[#C8A55C] text-xs"
            autoFocus
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <Button 
            type="submit" 
            className="absolute right-0.5 top-1/2 -translate-y-1/2 bg-[#C8A55C] hover:bg-[#B69446] text-white h-7 w-7 p-0 rounded-lg"
            disabled={!query.trim() || isSearching}
          >
            {isSearching ? <Loader2 className="w-3 h-3 animate-spin" /> : <ArrowRight className="w-3 h-3" />}
          </Button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-2 bg-white overscroll-contain touch-pan-y">
        <div className="max-w-md mx-auto space-y-3">
          <div>
            <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Quick Categories</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {quickCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={onClose}
                    className="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 hover:border-[#C8A55C] hover:shadow-sm transition-all group"
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#0B1C2C]">{category.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Featured Products</h3>
            {isLoadingProducts ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-5 h-5 animate-spin text-[#C8A55C]" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-1.5">
                {featuredProducts.map((product) => (
                  <Link
                    key={product.handle}
                    href={`/product/${product.handle}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-gray-200 hover:border-[#C8A55C] hover:shadow-sm transition-all group"
                  >
                    <div className="relative w-14 h-14 bg-gray-50 rounded-lg overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-0.5 left-0.5 bg-[#C8A55C] text-white text-[8px] font-bold px-1 py-0.5 rounded">
                        {product.badge}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#0B1C2C] line-clamp-2 mb-0.5">{product.title}</p>
                      <p className="text-xs font-bold text-[#C8A55C]">{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Popular Searches</h3>
            <div className="flex flex-wrap gap-1">
              {["Phoenix Flagpole", "US Flags", "Solar Lights", "Hardware", "State Flags", "Military Flags", "Eagle Toppers", "Flash Collars"].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term)
                    router.push(`/search?q=${encodeURIComponent(term)}`)
                    onClose()
                  }}
                  className="px-2 py-1 bg-gray-100 hover:bg-[#0B1C2C] hover:text-white text-gray-700 rounded-lg text-[9px] font-medium transition-all duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
