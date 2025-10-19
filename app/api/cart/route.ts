import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getCart } from "@/lib/shopify"

const CART_COOKIE_NAME = "shopify_cart_id"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const cartId = cookieStore.get(CART_COOKIE_NAME)?.value

    if (!cartId) {
      return NextResponse.json({ cart: null })
    }

    const cart = await getCart(cartId)

    return NextResponse.json({ cart })
  } catch (error) {
    console.error("[v0] Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}
