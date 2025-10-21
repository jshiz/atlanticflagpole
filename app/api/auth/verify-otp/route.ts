import { type NextRequest, NextResponse } from "next/server"
import { verifyOTP } from "@/lib/auth/otp"
import { createSession } from "@/lib/auth/session"
import { randomBytes } from "crypto"

const SHOPIFY_STOREFRONT_API_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07"}/graphql.json`
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""

function generateSecurePassword(): string {
  return randomBytes(32).toString("base64")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = body

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 })
    }

    // Verify OTP
    const otpData = verifyOTP(email, code)

    if (!otpData) {
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 401 })
    }

    // Handle based on type
    if (otpData.type === "signup") {
      // Create new customer with random password
      const password = generateSecurePassword()

      const createMutation = /* GraphQL */ `
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
              email
              firstName
              lastName
            }
            customerUserErrors {
              code
              field
              message
            }
          }
        }
      `

      const createResponse = await fetch(SHOPIFY_STOREFRONT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: createMutation,
          variables: {
            input: {
              email: otpData.email,
              password: password,
              firstName: otpData.userData?.firstName,
              lastName: otpData.userData?.lastName,
            },
          },
        }),
      })

      const createResult = await createResponse.json()

      if (createResult.data?.customerCreate?.customerUserErrors?.length > 0) {
        const error = createResult.data.customerCreate.customerUserErrors[0]
        return NextResponse.json({ error: error.message || "Failed to create account" }, { status: 400 })
      }

      // Now login with the created credentials
      const loginMutation = /* GraphQL */ `
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

      const loginResponse = await fetch(SHOPIFY_STOREFRONT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: loginMutation,
          variables: {
            input: {
              email: otpData.email,
              password: password,
            },
          },
        }),
      })

      const loginResult = await loginResponse.json()
      const { accessToken, expiresAt } = loginResult.data.customerAccessTokenCreate.customerAccessToken
      const customer = createResult.data.customerCreate.customer

      // Create session
      await createSession({
        customerId: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        accessToken: accessToken,
        idToken: accessToken,
        expiresAt: new Date(expiresAt).getTime(),
      })

      return NextResponse.json({
        success: true,
        customer,
      })
    } else {
      // Login existing customer
      // We need to use a different approach since we don't have the password
      // We'll use the customer's email to send a magic link or use multipass
      // For now, we'll create a temporary access token approach

      // Since Shopify requires password for login, we need to handle this differently
      // Option: Use Shopify's customer recover flow to send a password reset
      // Then the customer can set a new password

      // For this implementation, we'll return an error asking them to use password reset
      return NextResponse.json(
        {
          error: "For existing accounts, please use the 'Forgot Password' link to reset your password first.",
          needsPasswordReset: true,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("[v0] Verify OTP error:", error)
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 })
  }
}
