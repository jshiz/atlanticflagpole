"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { NFC_TEAMS, AFC_TEAMS } from "@/lib/nfl-teams"
import type { ShopifyProduct } from "@/lib/shopify/types"

interface NFLMenuClientProps {
  nflFlagProducts: ShopifyProduct[]
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

export function NFLMenuClient({ nflFlagProducts, onLinkClick }: NFLMenuClientProps) {
  const [randomProducts, setRandomProducts] = useState<ShopifyProduct[]>([])

  useEffect(() => {
    const shuffled = shuffleArray(nflFlagProducts).slice(0, 4)
    setRandomProducts(shuffled)
    console.log("[v0] 🎲 Randomized NFL flag products:", shuffled.length)
  }, [nflFlagProducts])

  useEffect(() => {
    console.log("[v0] 🏈 NFC Teams with logos:", NFC_TEAMS.filter((t) => !t.logo.includes("placeholder")).length)
    console.log("[v0] 🏈 AFC Teams with logos:", AFC_TEAMS.filter((t) => !t.logo.includes("placeholder")).length)
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* NFC Conference */}
        <div>
          <h3 className="text-sm font-bold mb-1.5 text-center text-[#0B1C2C]">NFC</h3>
          <div className="grid grid-cols-8 gap-0.5">
            {NFC_TEAMS.map((team) => (
              <Link
                key={team.name}
                href={`/collections/nfl-${team.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="aspect-square relative group"
                onClick={onLinkClick}
              >
                <Image
                  src={team.logo || "/placeholder.svg"}
                  alt={team.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 12.5vw, 5vw"
                  onError={() => console.log(`[v0] ❌ Failed to load logo for ${team.name}`)}
                  onLoad={() => console.log(`[v0] ✅ Loaded logo for ${team.name}`)}
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-0.5">
                  <span className="text-white text-[8px] font-semibold text-center leading-tight">{team.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AFC Conference */}
        <div>
          <h3 className="text-sm font-bold mb-1.5 text-center text-[#0B1C2C]">AFC</h3>
          <div className="grid grid-cols-8 gap-0.5">
            {AFC_TEAMS.map((team) => (
              <Link
                key={team.name}
                href={`/collections/nfl-${team.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="aspect-square relative group"
                onClick={onLinkClick}
              >
                <Image
                  src={team.logo || "/placeholder.svg"}
                  alt={team.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 12.5vw, 5vw"
                  onError={() => console.log(`[v0] ❌ Failed to load logo for ${team.name}`)}
                  onLoad={() => console.log(`[v0] ✅ Loaded logo for ${team.name}`)}
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-0.5">
                  <span className="text-white text-[8px] font-semibold text-center leading-tight">{team.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {randomProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-3">
          <h3 className="text-xs font-bold mb-2 text-center text-[#0B1C2C] uppercase tracking-wide">NFL Flags</h3>
          <div className="grid grid-cols-4 gap-3">
            {randomProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.handle}`} className="group" onClick={onLinkClick}>
                <div className="aspect-square relative mb-2 overflow-hidden rounded-lg bg-gray-100">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].url || "/placeholder.svg"}
                      alt={product.images[0].altText || product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 15vw"
                    />
                  )}
                </div>
                <h4 className="text-xs font-medium line-clamp-2 group-hover:text-[#C8A55C] transition-colors">
                  {product.title}
                </h4>
                <p className="text-xs font-bold mt-0.5 text-[#C8A55C]">${product.priceRange.minVariantPrice.amount}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
