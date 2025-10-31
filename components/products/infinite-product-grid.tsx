"use client"

import { useState, useEffect, useRef } from "react"
import { ProductCard } from "./product-card"
import { Loader2 } from "lucide-react"
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll"

interface InfiniteProductGridProps {
  initialProducts: any[]
  searchParams: Record<string, string | undefined>
  totalCount?: number
}

export function InfiniteProductGrid({ initialProducts, searchParams }: InfiniteProductGridProps) {
  const [products, setProducts] = useState(initialProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialProducts.length >= 12)
  const [page, setPage] = useState(1)
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, page])

  const loadMore = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })
      params.set("page", String(page + 1))
      params.set("limit", "12")

      const response = await fetch(`/api/products/paginated?${params.toString()}`)
      const data = await response.json()

      if (data.products && data.products.length > 0) {
        setProducts((prev) => [...prev, ...data.products])
        setPage((prev) => prev + 1)
        setHasMore(data.hasMore)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("[v0] Error loading more products:", error)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <FadeInOnScroll key={product.id} delay={(index % 12) * 30}>
            <ProductCard product={product} />
          </FadeInOnScroll>
        ))}
      </div>

      {/* Loading indicator and intersection observer trigger */}
      <div ref={observerRef} className="flex justify-center py-8">
        {isLoading && (
          <div className="flex items-center gap-2 text-[#0B1C2C]/70">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading more products...</span>
          </div>
        )}
        {!hasMore && products.length > 0 && <p className="text-[#0B1C2C]/50 text-sm">You've reached the end</p>}
      </div>
    </>
  )
}
