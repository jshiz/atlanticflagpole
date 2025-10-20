export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify"

export async function POST(request: NextRequest) {
  try {
    const { cartId } = await request.json()

    if (!cartId) {
      return NextResponse.json({ error: "Cart ID required" }, { status: 400 })
    }

    // Get the cart's checkout URL
    const { data } = await shopifyFetch<{
      cart: {
        checkoutUrl: string
      } | null
    }>({
      query: `
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
          }
        }
      `,
      variables: { cartId },
    })

    if (!data.cart?.checkoutUrl) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    return NextResponse.json({ checkoutUrl: data.cart.checkoutUrl })
  } catch (error) {
    console.error("[v0] Error getting checkout URL:", error)
    return NextResponse.json({ error: "Failed to get checkout URL" }, { status: 500 })
  }
}
