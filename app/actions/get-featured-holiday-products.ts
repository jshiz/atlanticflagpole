"use server"

import { getProduct } from "@/lib/shopify"

export async function getFeaturedHolidayProducts() {
  const productHandles = [
    "patriot-glo-4000-led-flagpole-christmas-tree-30-43",
    "phoenix-flagpole-christmas-tree-light-kit-for-20-25-poles",
    "american-flag-lights-420led-outdoor-waterproof-red-white-and-blue-led-american-flag-net-light-of-the-united-states-for-memorial-day-independence-day-national-day-veterans-day-decorplug-in",
  ]

  const products = await Promise.all(
    productHandles.map(async (handle) => {
      try {
        const product = await getProduct(handle)
        console.log(`[v0] 🎄 Featured holiday product fetched:`, {
          title: product?.title,
          hasImage: !!product?.featuredImage,
          imageUrl: product?.featuredImage?.url,
          hasVariants: !!product?.variants,
          variantCount: product?.variants?.edges?.length,
          firstVariantId: product?.variants?.edges?.[0]?.node?.id,
          availableForSale: product?.availableForSale,
        })
        return product
      } catch (error) {
        console.error(`[v0] ❌ Error fetching product ${handle}:`, error)
        return null
      }
    }),
  )

  const validProducts = products.filter((p) => p !== null)
  console.log(`[v0] 🎄 Total featured holiday products: ${validProducts.length}`)
  return validProducts
}
