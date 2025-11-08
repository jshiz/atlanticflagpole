import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL || ""
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Sign in customer using Storefront API
    const query = /* GraphQL */ `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `

    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            email,
            password,
          },
        },
      }),
    })

    const result = await response.json()

    if (result.data?.customerAccessTokenCreate?.customerUserErrors?.length > 0) {
      const error = result.data.customerAccessTokenCreate.customerUserErrors[0]
      return NextResponse.json({ error: error.message, code: error.code }, { status: 401 })
    }

    const accessToken = result.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken

    if (!accessToken) {
      return NextResponse.json({ error: "Failed to sign in" }, { status: 401 })
    }

    // Set auth cookie
    const cookieStore = await cookies()
    const nextResponse = NextResponse.json({ success: true, accessToken })

    cookieStore.set("customer_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    return nextResponse
  } catch (error) {
    console.error("[v0] Sign in error:", error)
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}
