import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import type { ShopifyProduct } from "@/lib/shopify/types"
import type { StateCapitalData } from "@/lib/capitals/data"
import { toNodes } from "@/lib/connection"
import { AddToCart } from "@/components/cart/add-to-cart"

interface StateAddOnsProps {
  addOns: ShopifyProduct[]
  stateData: StateCapitalData
}

export function StateAddOns({ addOns, stateData }: StateAddOnsProps) {
  return (
    <section className="py-16 bg-[#F5F3EF]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1C2C] mb-4 text-center">
            Complete Your {stateData.state} Flagpole Setup
          </h2>
          <p className="text-lg text-[#0B1C2C]/60 mb-12 text-center">
            Recommended add-ons for {stateData.capital} residents
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {addOns.slice(0, 8).map((product) => {
              const images = toNodes(product.images)
              const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/products/${product.handle}`}>
                    {images[0] && (
                      <div className="relative aspect-square">
                        <Image
                          src={images[0].url || "/placeholder.svg"}
                          alt={images[0].altText || product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${product.handle}`}>
                      <h3 className="font-semibold text-[#0B1C2C] text-sm mb-2 line-clamp-2 group-hover:text-[#C8A55C] transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-[#0B1C2C] mb-3">${price.toFixed(2)}</p>
                    <AddToCart
                      product={product}
                      size="sm"
                      className="w-full bg-[#C8A55C] hover:bg-[#B8954C] text-white"
                      iconOnly={false}
                      icon={<ShoppingCart className="w-4 h-4" />}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
