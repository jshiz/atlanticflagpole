"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface MenuItem {
  id: string
  title: string
  url: string
  items?: MenuItem[]
}

interface Product {
  id: string
  handle: string
  title: string
  featuredImage?: {
    url: string
    altText?: string
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
}

interface MegaMenuWithProductsProps {
  title: string
  menuItems: MenuItem[]
  featuredProducts?: Product[]
  columns?: number
}

export function MegaMenuWithProducts({ title, menuItems, featuredProducts, columns = 3 }: MegaMenuWithProductsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasProducts = featuredProducts && featuredProducts.length > 0
  const gridCols = hasProducts ? "grid-cols-4" : `grid-cols-${columns}`

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1 text-[#0B1C2C] hover:text-[#C8A55C] transition-colors font-medium text-sm">
        {title}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 ${hasProducts ? "w-[900px]" : "w-[700px]"} bg-white border border-gray-200 rounded-lg shadow-xl p-6 z-50`}
        >
          <div className={`grid ${gridCols} gap-6`}>
            {menuItems.map((section) => (
              <div key={section.id}>
                <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items?.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.url}
                        className="text-[#0B1C2C] hover:text-[#C8A55C] transition-colors text-sm block"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {hasProducts && (
              <div>
                <h3 className="text-[#C8A55C] font-bold mb-3 text-xs uppercase tracking-wide">Featured Products</h3>
                <div className="space-y-3">
                  {featuredProducts.slice(0, 3).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      className="flex gap-2 group hover:bg-[#F5F3EF] p-2 rounded-md transition-colors"
                    >
                      {product.featuredImage && (
                        <Image
                          src={product.featuredImage.url || "/placeholder.svg"}
                          alt={product.featuredImage.altText || product.title}
                          width={60}
                          height={60}
                          className="w-14 h-14 object-cover rounded border border-gray-200"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2">
                          {product.title}
                        </p>
                        <p className="text-xs text-[#0B1C2C]/70 mt-1">
                          ${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
