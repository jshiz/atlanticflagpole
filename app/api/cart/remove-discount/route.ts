import { type NextRequest, NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { cartId } = await request.json()

    if (!cartId) {
      return NextResponse.json({ error: "Missing cart ID" }, { status: 400 })
    }

    // Remove all discount codes from cart
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
        discountCodes: [],
      },
    })

    if (errors || data.cartDiscountCodesUpdate.userErrors.length > 0) {
      return NextResponse.json({ error: "Failed to remove discount" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      cart: data.cartDiscountCodesUpdate.cart,
    })
  } catch (error: any) {
    console.error("[v0] Error removing discount:", error)
    return NextResponse.json({ error: error.message || "Failed to remove discount" }, { status: 500 })
  }
}
