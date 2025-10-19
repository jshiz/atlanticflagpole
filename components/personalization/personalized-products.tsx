import { getPersonalizedRecommendations } from "@/lib/personalization/recommendations"
import type { PersonalizationData } from "@/lib/personalization/recommendations"
import Link from "next/link"
import Image from "next/image"

interface PersonalizedProductsProps {
  personalizationData: PersonalizationData
  title?: string
}

export async function PersonalizedProducts({
  personalizationData,
  title = "Recommended For You",
}: PersonalizedProductsProps) {
  const products = await getPersonalizedRecommendations(personalizationData, 8)

  if (products.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-[#0B1C2C]">{title}</h2>
        {personalizationData.location && (
          <span className="text-sm text-gray-600">Popular in {personalizationData.location.state}</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => {
          const variant = product.variants?.edges?.[0]?.node
          const price = variant?.price?.amount
          const image = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url

          return (
            <Link key={product.id} href={`/products/${product.handle}`} className="group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                {image && (
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <h3 className="text-sm font-medium text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-1">
                {product.title}
              </h3>
              {price && <p className="text-sm font-bold text-[#C8A55C]">${Number.parseFloat(price).toFixed(2)}</p>}
            </Link>
          )
        })}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/collections/all"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8A55C] hover:text-[#a88947] transition-colors"
        >
          View All Products
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
