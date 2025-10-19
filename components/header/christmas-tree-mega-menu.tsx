"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { ProductDetailPanel } from "./product-detail-panel"

interface ChristmasTreeMegaMenuProps {
  products: ShopifyProduct[]
  submenuProductsData?: Record<string, any[]>
  onLinkClick?: () => void
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function ChristmasTreeMegaMenu({ products, submenuProductsData = {}, onLinkClick }: ChristmasTreeMegaMenuProps) {
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null)
  const [displayProducts, setDisplayProducts] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null)
  const [panelPosition, setPanelPosition] = useState<{ top: number; left: number } | undefined>(undefined)
  const productRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const menuLinks = [
    {
      title: "Shop All Christmas Tree Kits",
      href: "/collections/flagpole-christmas-trees",
      collection: "flagpole-christmas-trees",
    },
    { title: "Shop by Height", href: "/pages/christmas-trees-by-height", collection: null },
    {
      title: "Warm White Collection",
      href: "/collections/warm-white-flagpole-trees",
      collection: "warm-white-flagpole-trees",
    },
    {
      title: "Multicolor Collection",
      href: "/collections/multicolor-flagpole-trees",
      collection: "multicolor-flagpole-trees",
    },
    {
      title: "Smart Magic Light Kits",
      href: "/collections/smart-magic-flagpole-trees",
      collection: "smart-magic-flagpole-trees",
    },
    {
      title: "Best Sellers",
      href: "/collections/best-selling-christmas-trees",
      collection: "best-selling-christmas-trees",
    },
    {
      title: "Christmas Tree Accessories",
      href: "/collections/flagpole-tree-accessories",
      collection: "flagpole-tree-accessories",
    },
  ]

  useEffect(() => {
    const sourceProducts =
      hoveredCollection && submenuProductsData[hoveredCollection] ? submenuProductsData[hoveredCollection] : products

    const shuffled = shuffleArray(sourceProducts)
    setDisplayProducts(shuffled)
    console.log(`[v0] 🎄 Shuffled ${shuffled.length} Christmas tree products`)
  }, [hoveredCollection, products, submenuProductsData])

  const handleProductClick = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    const productElement = productRefs.current.get(product.id)
    if (productElement) {
      const rect = productElement.getBoundingClientRect()
      setPanelPosition({
        top: rect.top + window.scrollY,
        left: rect.right + 20,
      })
    }
    setSelectedProduct(product as ShopifyProduct)
  }

  return (
    <>
      <div className="relative">
        {/* Festive background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 20 L50 20 L38 28 L43 43 L30 35 L17 43 L22 28 L10 20 L25 20 Z' fill='%23166534' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Subtle snow overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-snow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative grid grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Sidebar - Navigation Links */}
          <div className="col-span-3 border-r border-green-100/50 pr-8">
            <div className="sticky top-4">
              <h3 className="text-lg font-serif font-bold text-green-800 mb-4 pb-3 border-b-2 border-green-600">
                Shop Christmas Trees
              </h3>
              <ul className="space-y-3">
                {menuLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      onClick={onLinkClick}
                      onMouseEnter={() => link.collection && setHoveredCollection(link.collection)}
                      onMouseLeave={() => setHoveredCollection(null)}
                      className="group flex items-center gap-2 text-green-900 hover:text-green-600 transition-all duration-300 text-sm py-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/collections/flagpole-christmas-trees"
                onClick={onLinkClick}
                className="inline-flex items-center gap-2 mt-6 text-green-600 hover:text-green-700 font-bold text-sm group transition-colors"
              >
                View All LED Flagpole Christmas Trees
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>

          {/* Right Side - Featured Products with responsive grid */}
          <div className="col-span-9">
            <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="text-lg">🎄</span>
              {hoveredCollection
                ? `${menuLinks.find((l) => l.collection === hoveredCollection)?.title || "Featured"}`
                : "Featured Christmas Trees"}
            </h4>
            {displayProducts && displayProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayProducts.slice(0, 4).map((product: any) => (
                  <button
                    key={product.id}
                    onClick={(e) => handleProductClick(e, product)}
                    className="group relative text-left w-full"
                    ref={(el) => {
                      if (el) productRefs.current.set(product.id, el)
                    }}
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-green-50 to-red-50 rounded-xl overflow-hidden mb-3 shadow-sm group-hover:shadow-xl transition-all duration-300 border border-green-100">
                      {product.featuredImage ? (
                        <Image
                          src={product.featuredImage.url || "/placeholder.svg"}
                          alt={product.featuredImage.altText || product.title}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-green-300">
                          <span className="text-4xl">🎄</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h5 className="text-sm font-semibold text-green-900 group-hover:text-green-600 transition-colors line-clamp-2 mb-1.5">
                      {product.title}
                    </h5>
                    <p className="text-sm font-bold text-green-700">
                      ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-green-600">
                <p className="text-lg">🎄 Christmas tree products coming soon!</p>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes snow {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) translateX(20px);
              opacity: 0;
            }
          }
          .animate-snow {
            animation: snow linear infinite;
          }
        `}</style>
      </div>

      <ProductDetailPanel
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        position={panelPosition}
      />
    </>
  )
}
