import { type NextRequest, NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { cartId, discountCode } = await request.json()

    if (!cartId || !discountCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Apply discount code to cart using Shopify's cartDiscountCodesUpdate mutation
    const { data, errors } = await shopifyFetch<{
      cartDiscountCodesUpdate: {
        cart: {
          id: string
          discountCodes: Array<{ code: string }>
        }
        userErrors: Array<{ field: string[]; message: string }>
      }
    }>({
      query: `
        mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
          cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
            cart {
              id
              discountCodes {
                code
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        cartId,
        discountCodes: [discountCode],
      },
    })

    if (errors || data.cartDiscountCodesUpdate.userErrors.length > 0) {
      const errorMessage = data.cartDiscountCodesUpdate.userErrors[0]?.message || "Invalid discount code"
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      cart: data.cartDiscountCodesUpdate.cart,
    })
  } catch (error: any) {
    console.error("[v0] Error applying discount:", error)
    return NextResponse.json({ error: error.message || "Failed to apply discount" }, { status: 500 })
  }
}
