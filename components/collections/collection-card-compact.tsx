import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import type { ShopifyCollection } from "@/lib/shopify"

interface CollectionCardCompactProps {
  collection: ShopifyCollection
}

export function CollectionCardCompact({ collection }: CollectionCardCompactProps) {
  return (
    <Link href={`/collections/${collection.handle}`}>
      <Card className="group overflow-hidden hover:shadow-md transition-all duration-300 h-full">
        <div className="relative aspect-square overflow-hidden bg-white">
          {collection.image ? (
            <Image
              src={collection.image.url || "/placeholder.svg"}
              alt={collection.image.altText || collection.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C8A55C]/20 to-[#0B1C2C]/10">
              <span className="text-2xl font-serif font-bold text-[#0B1C2C]/30">{collection.title.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-xs line-clamp-2">{collection.description || "View collection"}</p>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2">
            {collection.title}
          </h3>
        </div>
      </Card>
    </Link>
  )
}
