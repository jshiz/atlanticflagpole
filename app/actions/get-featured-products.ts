"use server"

import { getProduct, getProductImage } from "@/lib/shopify"

export async function getFeaturedProducts() {
  try {
    const productHandles = [
      "phoenix-telescoping-flagpole-premier-kit-starter-bundle",
      "poly-extra-us-flag",
      "12-natural-eagle-flagpole-topper"
    ]

    const products = await Promise.all(
      productHandles.map(async (handle) => {
        const product = await getProduct(handle)
        if (!product) return null

        const imageUrl = getProductImage(product)
        const price = product.priceRange?.minVariantPrice?.amount || "0"
        const formattedPrice = `$${parseFloat(price).toFixed(2)}`

        return {
          title: product.title,
          handle: product.handle,
          price: formattedPrice,
          image: imageUrl || "/placeholder.svg",
          badge: product.productType || "Product"
        }
      })
    )

    return products.filter(Boolean)
  } catch (error) {
    console.error("[v0] Error fetching featured products:", error)
    return []
  }
}
