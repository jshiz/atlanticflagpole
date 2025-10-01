import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { ShopifyCollection } from "@/lib/shopify"
import { ArrowRight } from "lucide-react"

interface CollectionCardProps {
  collection: ShopifyCollection
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.handle}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          {collection.image ? (
            <Image
              src={collection.image.url || "/placeholder.svg"}
              alt={collection.image.altText || collection.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C8A55C]/20 to-[#0B1C2C]/10">
              <span className="text-4xl font-serif font-bold text-[#0B1C2C]/30">{collection.title.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                {collection.title}
              </h3>
              {collection.description && (
                <p className="text-sm text-[#0B1C2C]/70 line-clamp-2">{collection.description}</p>
              )}
            </div>
            <ArrowRight className="w-6 h-6 text-[#C8A55C] group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
