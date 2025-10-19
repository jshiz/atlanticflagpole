"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Sparkles, X, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface SearchResult {
  type: "article" | "product" | "collection" | "action"
  title: string
  description: string
  url: string
  icon?: string
}

export function AISearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [aiResponse, setAiResponse] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setResults([])
    setAiResponse("")

    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      setResults(data.results || [])
      setAiResponse(data.aiResponse || "")
    } catch (error) {
      console.error("[v0] AI search error:", error)
      setAiResponse("Sorry, I encountered an error. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <>
      {/* Search Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative w-full max-w-sm bg-white/50 hover:bg-white/80 border-[#C8A55C]/20 text-[#0B1C2C]/60"
      >
        <Search className="w-4 h-4 mr-2" />
        <span className="text-sm">What can we help you find today?</span>
        <kbd className="ml-auto hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-[#C8A55C]/20 bg-white px-1.5 font-mono text-[10px] font-medium text-[#0B1C2C]/60">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Search Panel */}
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 flex-1">
                <Sparkles className="w-5 h-5 text-[#C8A55C]" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me anything... (e.g., 'How do I install my flagpole?')"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-0 focus-visible:ring-0 text-base"
                />
              </div>
              <Button size="sm" onClick={handleSearch} disabled={isSearching || !query.trim()}>
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* AI Response */}
              {aiResponse && (
                <div className="p-6 bg-gradient-to-r from-[#C8A55C]/5 to-transparent border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C8A55C] flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#0B1C2C] mb-2">AI Assistant</p>
                      <p className="text-sm text-[#0B1C2C]/80 leading-relaxed">{aiResponse}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Search Results */}
              {results.length > 0 && (
                <div className="p-4">
                  <p className="text-xs font-semibold text-[#0B1C2C]/60 uppercase tracking-wide mb-3">
                    Suggested Resources
                  </p>
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <Link
                        key={index}
                        href={result.url}
                        onClick={() => setIsOpen(false)}
                        className="block p-3 rounded-lg hover:bg-[#F5F3EF] transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          {result.icon && <span className="text-2xl">{result.icon}</span>}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors">
                              {result.title}
                            </p>
                            <p className="text-xs text-[#0B1C2C]/60 mt-1 line-clamp-2">{result.description}</p>
                            <span className="inline-flex items-center gap-1 text-xs text-[#C8A55C] mt-2">
                              {result.type === "article" && "Read Article"}
                              {result.type === "product" && "View Product"}
                              {result.type === "collection" && "Browse Collection"}
                              {result.type === "action" && "Get Started"}
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!isSearching && !aiResponse && results.length === 0 && query && (
                <div className="p-12 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm text-[#0B1C2C]/60">No results found. Try a different search term.</p>
                </div>
              )}

              {/* Initial State */}
              {!query && (
                <div className="p-6">
                  <p className="text-xs font-semibold text-[#0B1C2C]/60 uppercase tracking-wide mb-3">
                    Popular Searches
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { text: "How to install", icon: "🔧" },
                      { text: "Warranty information", icon: "🛡️" },
                      { text: "Flag etiquette", icon: "🇺🇸" },
                      { text: "Troubleshooting", icon: "🔍" },
                      { text: "Shipping info", icon: "📦" },
                      { text: "Product care", icon: "✨" },
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(item.text)
                          handleSearch()
                        }}
                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#F5F3EF] transition-colors text-left"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm text-[#0B1C2C]">{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
