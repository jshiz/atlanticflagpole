import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { getProduct, getProductImage } from "@/lib/shopify"
import Image from "next/image"

export async function AccessoriesSection() {
  const productHandles = [
    "commanders-accessory-kit-solar-light-gold-eagle-flash-collar",
    "800-series-led-solar-light-executive-telepatriot-phoenix",
    "12-natural-eagle-flagpole-topper",
    "poly-extra-us-flag",
  ]

  const productPromises = productHandles.map((handle) => getProduct(handle).catch(() => null))
  const productResults = await Promise.all(productPromises)
  const products = productResults.filter((p) => p !== null && p !== undefined && p.title)

  const accessories =
    products.length > 0
      ? products.map((product, index) => {
          const imageUrl = getProductImage(product)
          const hasValidImage = !!imageUrl
          return {
            name: product.title,
            price: `$${Number.parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`,
            description: product.description || "Premium flagpole accessory to enhance your display.",
            image:
              imageUrl ||
              `https://placehold.co/400x400/f5f3ef/0b1c2c?text=${encodeURIComponent(product.title.substring(0, 20))}`,
            href: `/products/${product.handle}`,
            hasValidImage,
          }
        })
      : []

  if (accessories.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0B1C2C] to-[#0A2740]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-[#C8A55C] text-[#0B1C2C] px-4 py-2 mb-3 font-bold text-xs tracking-widest uppercase">
              COMPLETE YOUR DISPLAY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Upgrade Your Installation</h2>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Premium accessories to enhance your display
            </p>
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

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0B1C2C] to-[#0A2740]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#C8A55C] text-[#0B1C2C] px-4 py-2 mb-3 font-bold text-xs tracking-widest uppercase">
            COMPLETE YOUR DISPLAY
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Upgrade Your Installation</h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Premium accessories to enhance your display
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-8">
          {accessories.map((accessory, index) => (
            <Link
              key={index}
              href={accessory.href}
              className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#C8A55C]"
            >
              <div className="relative aspect-square bg-white overflow-hidden">
                <Image
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized={!accessory.hasValidImage}
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-[#0B1C2C] mb-2 line-clamp-2">{accessory.name}</h3>
                <p className="text-sm text-[#666666] mb-3 line-clamp-2">{accessory.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#0B1C2C]">{accessory.price}</span>
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
