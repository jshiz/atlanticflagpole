import Image from "next/image"
import Link from "next/link"
import { NFC_TEAMS, AFC_TEAMS } from "@/lib/nfl-teams"
import { getProducts } from "@/lib/shopify"

export async function NFLMegaMenu() {
  const nflFlagProducts = await getProducts({
    first: 4,
    query: "tag:nfl-flags",
  })

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* NFC Conference */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-center">NFC</h3>
          <div className="grid grid-cols-4 gap-0.5">
            {NFC_TEAMS.map((team) => (
              <Link
                key={team.name}
                href={`/collections/nfl-${team.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="aspect-square relative group hover:opacity-80 transition-opacity"
              >
                <Image
                  src={team.logo || "/placeholder.svg"}
                  alt={team.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-medium text-center px-1">{team.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AFC Conference */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-center">AFC</h3>
          <div className="grid grid-cols-4 gap-0.5">
            {AFC_TEAMS.map((team) => (
              <Link
                key={team.name}
                href={`/collections/nfl-${team.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="aspect-square relative group hover:opacity-80 transition-opacity"
              >
                <Image
                  src={team.logo || "/placeholder.svg"}
                  alt={team.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-medium text-center px-1">{team.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {nflFlagProducts.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold mb-4 text-center">NFL Flags</h3>
          <div className="grid grid-cols-4 gap-4">
            {nflFlagProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.handle}`} className="group">
                <div className="aspect-square relative mb-2 overflow-hidden rounded-lg">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].url || "/placeholder.svg"}
                      alt={product.images[0].altText || product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  )}
                </div>
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h4>
                <p className="text-sm font-bold mt-1">${product.priceRange.minVariantPrice.amount}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
