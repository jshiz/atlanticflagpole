import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createSession } from "@/lib/auth/session"
import { jwtDecode } from "jwt-decode"

const TOKEN_URL = process.env.SHOPIFY_CUSTOMER_ACCOUNT_TOKEN_URL || ""
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || ""
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code || !state) {
      return NextResponse.redirect(new URL("/account/login?error=missing_params", request.url))
    }

    // Verify state
    const cookieStore = await cookies()
    const storedState = cookieStore.get("oauth_state")?.value
    const codeVerifier = cookieStore.get("code_verifier")?.value

    if (!storedState || !codeVerifier || storedState !== state) {
      console.error("[v0] State mismatch or missing code verifier")
      return NextResponse.redirect(new URL("/account/login?error=invalid_state", request.url))
    }

    // Exchange code for tokens
    const tokenResponse = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code,
        code_verifier: codeVerifier,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("[v0] Token exchange failed:", errorText)
      return NextResponse.redirect(new URL("/account/login?error=token_exchange_failed", request.url))
    }

    const tokens = await tokenResponse.json()
    const { access_token, id_token, refresh_token, expires_in } = tokens

    // Decode ID token to get customer info
    const idTokenPayload: any = jwtDecode(id_token)

    console.log("[v0] ID token payload:", idTokenPayload)

    // Create session
    await createSession({
      customerId: idTokenPayload.sub,
      email: idTokenPayload.email,
      firstName: idTokenPayload.given_name,
      lastName: idTokenPayload.family_name,
      accessToken: access_token,
      idToken: id_token,
      refreshToken: refresh_token,
      expiresAt: Date.now() + expires_in * 1000,
    })

    // Clean up OAuth cookies
    cookieStore.delete("code_verifier")
    cookieStore.delete("oauth_state")
    cookieStore.delete("oauth_nonce")

    console.log("[v0] Session created successfully, redirecting to account")

    return NextResponse.redirect(new URL("/account", request.url))
  } catch (error) {
    console.error("[v0] Callback error:", error)
    return NextResponse.redirect(new URL("/account/login?error=callback_failed", request.url))
  }
}
