import { type NextRequest, NextResponse } from "next/server"
import { createSession } from "@/lib/auth/session"

const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL || ""
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Create customer access token using Storefront API
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
      return NextResponse.json({ error: error.message || "Invalid email or password" }, { status: 401 })
    }

    const { accessToken, expiresAt } = result.data.customerAccessTokenCreate.customerAccessToken

    // Fetch customer details
    const customerQuery = /* GraphQL */ `
      query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          email
          firstName
          lastName
        }
      }
    `

    const customerResponse = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: customerQuery,
        variables: {
          customerAccessToken: accessToken,
        },
      }),
    })

    const customerResult = await customerResponse.json()
    const customer = customerResult.data?.customer

    if (!customer) {
      return NextResponse.json({ error: "Failed to fetch customer details" }, { status: 500 })
    }

    // Create session with customer data
    await createSession({
      customerId: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      accessToken: accessToken,
      idToken: accessToken, // Using access token as ID token for compatibility
      expiresAt: new Date(expiresAt).getTime(),
    })

    return NextResponse.json({
      success: true,
      customer,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}
