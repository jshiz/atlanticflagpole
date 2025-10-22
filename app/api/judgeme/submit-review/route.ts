import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productHandle, rating, name, email, title, body: reviewBody } = body

    const apiToken = process.env.JUDGEME_API_TOKEN
    const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "atlantic-flag-and-pole-inc.myshopify.com"

    if (!apiToken) {
      return NextResponse.json({ error: "Judge.me not configured" }, { status: 500 })
    }

    // Submit review to Judge.me API
    const response = await fetch("https://judge.me/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shop_domain: shopDomain,
        api_token: apiToken,
        platform: "shopify",
        id: productHandle,
        email,
        name,
        rating,
        title,
        body: reviewBody,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Judge.me review submission failed:", errorText)
      return NextResponse.json({ error: "Failed to submit review" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json({ success: true, review: data })
  } catch (error) {
    console.error("[v0] Error submitting review:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
