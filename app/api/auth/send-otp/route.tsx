import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
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

    const isDevelopment = process.env.NODE_ENV === "development"

    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
          from: "Atlantic Flagpole <noreply@atlanticflagpole.com>",
          to: email,
          subject: `Your verification code: ${code}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                  <h1 style="color: white; margin: 0; font-size: 28px;">Atlantic Flagpole</h1>
                </div>
                
                <div style="background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
                  <h2 style="color: #1e3a8a; margin-top: 0;">Your Verification Code</h2>
                  
                  <p style="font-size: 16px; color: #4b5563;">
                    ${type === "signup" ? `Welcome to Atlantic Flagpole! ` : ""}
                    Use the code below to ${type === "signup" ? "complete your registration" : "sign in to your account"}:
                  </p>
                  
                  <div style="background: #f3f4f6; border: 2px dashed #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                    <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1e3a8a; font-family: 'Courier New', monospace;">
                      ${code}
                    </div>
                  </div>
                  
                  <p style="font-size: 14px; color: #6b7280;">
                    This code will expire in <strong>10 minutes</strong>.
                  </p>
                  
                  <p style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    If you didn't request this code, you can safely ignore this email.
                  </p>
                </div>
                
                <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
                  <p>© ${new Date().getFullYear()} Atlantic Flagpole. All rights reserved.</p>
                </div>
              </body>
            </html>
          `,
        })

        console.log(`[v0] ✅ OTP email sent to ${email}`)
      } else {
        // Fallback: Log to console if no email service configured
        console.log(`[v0] ⚠️ No RESEND_API_KEY configured. OTP for ${email}: ${code}`)
      }
    } catch (emailError) {
      console.error("[v0] ❌ Failed to send email:", emailError)
      // Continue anyway - in development, we'll return the OTP in response
      if (!isDevelopment) {
        return NextResponse.json({ error: "Failed to send verification email. Please try again." }, { status: 500 })
      }
    }

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
