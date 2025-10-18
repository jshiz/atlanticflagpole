"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface SearchBarProps {
  className?: string
  placeholder?: string
  autoFocus?: boolean
  onBlur?: () => void
}

export function SearchBar({
  className,
  placeholder = "Search flagpoles, flags, accessories...",
  autoFocus,
  onBlur,
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(searchParams.get("q") || "")
  }, [searchParams])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim() || query.trim().length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const json = await res.json()
        setResults(json.items || [])
        setIsOpen(true)
      } catch (error) {
        console.error("[v0] Search fetch error:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className={className}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onBlur={onBlur}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 text-sm h-9 sm:h-10"
          />
          <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-7 sm:w-7"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          )}
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[70vh] sm:max-h-96 overflow-y-auto">
          {results.slice(0, 8).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 cursor-pointer"
              onClick={() => {
                setIsOpen(false)
                setQuery("")
              }}
            >
              {product.image ? (
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={48}
                  height={48}
                  className="rounded object-cover flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12"
                />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#0B1C2C] truncate text-xs sm:text-sm">{product.title}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1 sm:gap-2">
                  {product.productType && <span className="truncate">{product.productType}</span>}
                  {product.price && (
                    <span className="font-semibold text-[#C8A55C] flex-shrink-0">
                      ${Number.parseFloat(product.price.amount).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
          {results.length > 8 && (
            <button
              onClick={() => {
                setIsOpen(false)
                router.push(`/search?q=${encodeURIComponent(query.trim())}`)
              }}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-[#C8A55C] hover:bg-gray-50 font-medium transition-colors cursor-pointer"
            >
              View all {results.length} results →
            </button>
          )}
        </div>
      )}

      {isOpen && isLoading && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-3 sm:p-4">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-gray-300 border-t-[#C8A55C] rounded-full animate-spin" />
            Searching...
          </div>
        </div>
      )}

      {isOpen && !isLoading && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-3 sm:p-4">
          <div className="text-xs sm:text-sm text-gray-500 text-center">No products found for "{query}"</div>
        </div>
      )}
    </div>
  )
}
