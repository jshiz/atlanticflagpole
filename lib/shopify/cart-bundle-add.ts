// Bundle-aware cart operations
// Adds bundle products with Premier Kit items automatically

import { getBundleData } from "./bundles"
import { addCartLines } from "./index"

interface CartLineInput {
  merchandiseId: string
  quantity: number
  attributes?: Array<{ key: string; value: string }>
}

export async function addBundleToCart(
  productHandle: string,
  variantId: string,
  cartId: string,
  quantity = 1,
): Promise<any> {
  console.log(`[v0] Adding bundle to cart: ${productHandle}`)

  console.log("[v0] Analytics: bundle_add_to_cart", {
    product: productHandle,
    variantId,
    quantity,
  })

  // Get bundle data to check if it includes Premier Kit
  const bundleData = await getBundleData(productHandle)

  const linesToAdd: CartLineInput[] = []

  // Always add the main product
  linesToAdd.push({
    merchandiseId: variantId,
    quantity,
  })

  // If this bundle includes Premier Kit, add the included items
  if (bundleData.includesPremier && bundleData.components.length > 0) {
    console.log(`[v0] Adding ${bundleData.components.length} Premier Kit items`)

    console.log("[v0] Analytics: premier_kit_items_added", {
      count: bundleData.components.length,
      components: bundleData.components.map((c) => c.title),
    })

    for (const component of bundleData.components) {
      // Find the default variant for each component
      // In a real implementation, you'd fetch the variant ID from Shopify
      // For now, we'll use the component ID as a placeholder
      linesToAdd.push({
        merchandiseId: component.id, // This should be the variant ID
        quantity,
        attributes: [
          {
            key: "IncludedIn",
            value: "Premier Kit",
          },
          {
            key: "BundleParent",
            value: variantId,
          },
        ],
      })
    }
  }

  console.log(`[v0] Adding ${linesToAdd.length} line items to cart`)

  // Add all lines to cart
  const updatedCart = await addCartLines(cartId, linesToAdd)

  return updatedCart
}
