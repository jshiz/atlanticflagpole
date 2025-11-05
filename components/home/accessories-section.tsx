import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { getCollectionProducts } from "@/lib/shopify"
import Image from "next/image"

export async function AccessoriesSection() {
  // Fetch products from the flagpole-lighting collection (which exists and has 5 products)
  const products = await getCollectionProducts({
    collection: "flagpole-lighting",
    limit: 4,
  })

  console.log("[v0] AccessoriesSection - Fetched products:", products.length)

  // Map Shopify products to accessories format
  const accessories =
    products.length > 0
      ? products.slice(0, 4).map((product, index) => {
          const hasValidImage = !!product.images?.[0]?.url
          return {
            name: product.title,
            price: `$${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`,
            description: product.description || "Premium flagpole accessory to enhance your display.",
            image: hasValidImage
              ? product.images[0].url
              : `https://placehold.co/400x400/f5f3ef/0b1c2c?text=${encodeURIComponent(product.title.substring(0, 20))}`,
            href: `/products/${product.handle}`,
            hasValidImage,
          }
        })
      : [
          // Fallback data if no products found
          {
            name: "Solar Flagpole Light",
            price: "$39.99",
            description:
              "Illuminate your flag with pride day and night using our premium solar-powered light. Features automatic dusk-to-dawn operation with no wiring required. Provides bright, respectful illumination that meets US Flag Code requirements.",
            image: "https://placehold.co/400x400/f5f3ef/0b1c2c?text=Solar+Light",
            href: "/products/solar-flagpole-light",
            hasValidImage: false,
          },
          {
            name: "Gold Eagle Topper",
            price: "$29.99",
            description:
              "Add a patriotic finishing touch with our stunning gold eagle ornament. Crafted from durable materials with a brilliant gold finish that won't fade. The perfect symbol of American pride for your flagpole display.",
            image: "https://placehold.co/400x400/f5f3ef/0b1c2c?text=Eagle+Topper",
            href: "/products/gold-eagle-topper",
            hasValidImage: false,
          },
          {
            name: "Flash Collar",
            price: "$19.99",
            description:
              "Create a professional, finished appearance at ground level with our premium flash collar. Conceals the ground sleeve opening for a clean, polished look. Easy to install and built to withstand all weather conditions.",
            image: "https://placehold.co/400x400/f5f3ef/0b1c2c?text=Flash+Collar",
            href: "/products/flash-collar",
            hasValidImage: false,
          },
          {
            name: "Engraved Nameplate",
            price: "$29.99",
            description:
              "Honor a veteran, hero, or loved one with a custom engraved nameplate. Precision laser engraving ensures lasting clarity and durability. A meaningful way to dedicate your flag display to someone special.",
            image: "https://placehold.co/400x400/f5f3ef/0b1c2c?text=Nameplate",
            href: "/products/engraved-nameplate",
            hasValidImage: false,
          },
        ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#0B1C2C] text-white px-4 py-2 mb-4 font-bold text-xs tracking-widest uppercase">
            COMPLETE YOUR DISPLAY
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2C] mb-3">Upgrade Your Installation</h2>
          <p className="text-base md:text-lg text-[#666666] max-w-2xl mx-auto">
            Premium accessories designed to enhance your flagpole display and honor the flag with pride
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {accessories.map((accessory, index) => (
            <Link
              key={index}
              href={accessory.href}
              className="group bg-[#F5F3EF] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#C8A55C]"
            >
              <div className="relative aspect-square bg-white overflow-hidden">
                {accessory.image ? (
                  <Image
                    src={accessory.image || "/placeholder.svg"}
                    alt={accessory.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized={!accessory.hasValidImage}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#0B1C2C] mb-2 line-clamp-1">{accessory.name}</h3>
                <p className="text-sm text-[#666666] mb-3 line-clamp-3">{accessory.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#0B1C2C]">{accessory.price}</span>
                  <div className="flex items-center gap-1 text-[#C8A55C] font-semibold text-sm">
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/collections/accessories"
            className="inline-flex items-center gap-2 bg-[#C8A55C] hover:bg-[#B8954C] text-[#0B1C2C] font-bold text-base py-3 px-8 rounded-md transition-colors shadow-lg hover:shadow-xl"
          >
            Shop All Accessories
          </Link>
        </div>
      </div>
    </section>
  )
}
