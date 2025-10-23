"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Sparkles, HelpCircle } from "lucide-react"
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
  placeholder = "What can we help you with today?",
  autoFocus,
  onBlur,
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
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
        setShowAIAssistant(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      setShowAIAssistant(false)
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    setShowAIAssistant(false)
  }

  const aiSuggestions = [
    { icon: "🏛️", text: "What flagpole height do I need?", query: "flagpole height guide" },
    { icon: "🇺🇸", text: "How to install a residential flagpole?", query: "residential flagpole installation" },
    {
      icon: "⚡",
      text: "What's the difference between aluminum and fiberglass?",
      query: "aluminum vs fiberglass flagpoles",
    },
    { icon: "🎯", text: "Which flag size for my flagpole?", query: "flag size guide" },
  ]

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
            onFocus={() => {
              if (results.length > 0) setIsOpen(true)
              if (!query) setShowAIAssistant(true)
            }}
            className="w-full pl-9 pr-20 text-xs md:text-sm h-8 md:h-9 text-center md:text-left bg-gray-50 border-gray-300 focus:bg-white focus:border-[#C8A55C] transition-all rounded-full shadow-sm"
          />
          <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />

          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="h-6 w-6 hover:bg-gray-100 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="h-6 w-6 hover:bg-[#C8A55C]/10 rounded-full group"
              title="AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8A55C] group-hover:scale-110 transition-transform" />
            </Button>
            <Link
              href="/help-center"
              className="h-6 w-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              title="Help Center"
            >
              <HelpCircle className="w-3.5 h-3.5 text-gray-500 hover:text-[#0B1C2C]" />
            </Link>
          </div>
        </div>
      </form>

      {showAIAssistant && !query && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 md:p-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#C8A55C]" />
            <h3 className="font-semibold text-[#0B1C2C]">How can we help you today?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(suggestion.query)
                  setShowAIAssistant(false)
                  router.push(`/search?q=${encodeURIComponent(suggestion.query)}`)
                }}
                className="flex items-start gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 hover:border-[#C8A55C] group"
              >
                <span className="text-2xl flex-shrink-0">{suggestion.icon}</span>
                <span className="text-sm text-gray-700 group-hover:text-[#0B1C2C] leading-tight">
                  {suggestion.text}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
            <Link
              href="/help-center"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-[#0B1C2C] hover:text-[#C8A55C] transition-colors rounded-lg hover:bg-gray-50"
            >
              <HelpCircle className="w-4 h-4" />
              Visit Help Center
            </Link>
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm bg-[#C8A55C] text-white hover:bg-[#a88947] transition-colors rounded-lg font-medium"
            >
              Contact Support
            </Link>
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {results.slice(0, 8).map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
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
                  className="rounded object-cover flex-shrink-0 w-12 h-12"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#0B1C2C] truncate text-sm">{product.title}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
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
              className="w-full px-4 py-3 text-sm text-[#C8A55C] hover:bg-gray-50 font-medium transition-colors"
            >
              View all {results.length} results →
            </button>
          )}
        </div>
      )}

      {isOpen && isLoading && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-[#C8A55C] rounded-full animate-spin" />
            Searching...
          </div>
        </div>
      )}

      {isOpen && !isLoading && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-6">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-3">No products found for "{query}"</div>
            <button
              onClick={() => {
                setShowAIAssistant(true)
                setIsOpen(false)
              }}
              className="text-sm text-[#C8A55C] hover:text-[#a88947] font-medium flex items-center gap-1 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              Try AI Assistant for help
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
