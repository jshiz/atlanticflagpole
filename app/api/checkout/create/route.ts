import { type NextRequest, NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cartId, email, shippingAddress } = body

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

    // Return the checkout URL with customer info as query params
    const checkoutUrl = new URL(data.cart.checkoutUrl)
    checkoutUrl.searchParams.set("checkout[email]", email)
    checkoutUrl.searchParams.set("checkout[shipping_address][first_name]", shippingAddress.firstName)
    checkoutUrl.searchParams.set("checkout[shipping_address][last_name]", shippingAddress.lastName)
    checkoutUrl.searchParams.set("checkout[shipping_address][address1]", shippingAddress.address1)
    if (shippingAddress.address2) {
      checkoutUrl.searchParams.set("checkout[shipping_address][address2]", shippingAddress.address2)
    }
    checkoutUrl.searchParams.set("checkout[shipping_address][city]", shippingAddress.city)
    checkoutUrl.searchParams.set("checkout[shipping_address][province]", shippingAddress.province)
    checkoutUrl.searchParams.set("checkout[shipping_address][zip]", shippingAddress.zip)
    checkoutUrl.searchParams.set("checkout[shipping_address][country]", shippingAddress.country)
    checkoutUrl.searchParams.set("checkout[shipping_address][phone]", shippingAddress.phone)

    return NextResponse.json({ checkoutUrl: checkoutUrl.toString() })
  } catch (error) {
    console.error("[v0] Checkout creation error:", error)
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 })
  }
}
