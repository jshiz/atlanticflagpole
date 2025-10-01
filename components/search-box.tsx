"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

export function SearchBox() {
  const [query, setQuery] = useState("")
  const [items, setItems] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setItems([])
        setIsOpen(false)
        return
      }

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const json = await res.json()
        setItems(json.items || [])
        setIsOpen(true)
      } catch (error) {
        console.error("[v0] Search fetch error:", error)
        setItems([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0B1C2C]/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => items.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search flagpoles..."
          className="w-full pl-10 pr-4 py-2 border border-[#0B1C2C]/20 rounded-lg bg-white/80 backdrop-blur-sm text-[#0B1C2C] placeholder:text-[#0B1C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent transition-all"
        />
      </div>

      {isOpen && items.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-[#0B1C2C]/20 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {items.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F3EF] transition-colors border-b border-[#0B1C2C]/10 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {product.image && (
                <img
                  src={product.image || "/placeholder.svg"}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#0B1C2C] truncate">{product.title}</div>
                <div className="text-sm text-[#0B1C2C]/60">
                  {product.productType || product.vendor}
                  {product.price && (
                    <span className="ml-2 font-semibold text-[#C41E3A]">
                      ${Number.parseFloat(product.price.amount).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
