import { NextResponse } from "next/server"
import { shopifyAdminFetch } from "@/lib/shopify/admin-api"

export const dynamic = "force-dynamic"

const UPDATE_VARIANT_PRICE_MUTATION = `
  mutation UpdateVariantPrice($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      productVariant {
        id
        price
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function POST(request: Request) {
  try {
    const { updates } = await request.json()

    const results = []
    for (const update of updates) {
      const data = await shopifyAdminFetch({
        query: UPDATE_VARIANT_PRICE_MUTATION,
        variables: {
          input: {
            id: update.variantId,
            price: update.newPrice,
          },
        },
      })

      if (data.productVariantUpdate.userErrors.length > 0) {
        results.push({ success: false, error: data.productVariantUpdate.userErrors[0].message })
      } else {
        results.push({ success: true })
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Failed to update prices:", error)
    return NextResponse.json({ error: "Failed to update prices" }, { status: 500 })
  }
}
