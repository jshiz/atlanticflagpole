import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createCart, addCartLines, getCart } from "@/lib/shopify"

const CART_COOKIE_NAME = "shopify_cart_id"

export async function POST(request: NextRequest) {
  try {
    const { merchandiseId, quantity = 1 } = await request.json()

    if (!merchandiseId) {
      return NextResponse.json({ error: "Missing merchandiseId" }, { status: 400 })
    }

    const cookieStore = await cookies()
    let cartId = cookieStore.get(CART_COOKIE_NAME)?.value

    let cart

    // If no cart exists, create one
    if (!cartId) {
      cart = await createCart()
      cartId = cart.id

      // Set cart cookie
      const response = NextResponse.json({ cart })
      response.cookies.set(CART_COOKIE_NAME, cartId, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      })

      // Add the item to the new cart
      cart = await addCartLines(cartId, [{ merchandiseId, quantity }])

      return NextResponse.json({ cart })
    }

    // Verify cart still exists
    const existingCart = await getCart(cartId)

    if (!existingCart) {
      // Cart expired, create new one
      cart = await createCart()
      cartId = cart.id

      const response = NextResponse.json({ cart })
      response.cookies.set(CART_COOKIE_NAME, cartId, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      })

      cart = await addCartLines(cartId, [{ merchandiseId, quantity }])
      return NextResponse.json({ cart })
    }

    // Add to existing cart
    cart = await addCartLines(cartId, [{ merchandiseId, quantity }])

    return NextResponse.json({ cart })
  } catch (error) {
    console.error("[v0] Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}
