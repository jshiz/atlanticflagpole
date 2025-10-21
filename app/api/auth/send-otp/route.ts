import { type NextRequest, NextResponse } from "next/server"
import { generateOTP, storeOTP } from "@/lib/auth/otp"

const SHOPIFY_STOREFRONT_API_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07"}/graphql.json`
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, type, firstName, lastName } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!type || !["login", "signup"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }

    // For login, check if customer exists
    if (type === "login") {
      const query = /* GraphQL */ `
        query checkCustomer($email: String!) {
          customer(customerAccessToken: "") {
            id
          }
        }
      `

      // Note: We can't directly check if a customer exists without authentication
      // So we'll just send the OTP and handle the error during verification
    }

    // For signup, validate required fields
    if (type === "signup" && (!firstName || !lastName)) {
      return NextResponse.json({ error: "First name and last name are required for signup" }, { status: 400 })
    }

    // Generate OTP
    const code = generateOTP()

    // Store OTP
    storeOTP(email, code, type, type === "signup" ? { firstName, lastName } : undefined)

    // Send OTP via email
    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, we'll just log it (in production, send actual email)
    console.log(`[v0] OTP for ${email}: ${code}`)

    // In development, return the OTP in the response (remove in production!)
    const isDevelopment = process.env.NODE_ENV === "development"

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email",
      ...(isDevelopment && { otp: code }), // Only in development
    })
  } catch (error) {
    console.error("[v0] Send OTP error:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
