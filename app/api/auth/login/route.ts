export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { generateCodeVerifier, generateCodeChallenge, generateState, generateNonce } from "@/lib/auth/pkce"
import { cookies } from "next/headers"

const AUTHORIZE_URL = process.env.SHOPIFY_CUSTOMER_ACCOUNT_AUTHORIZE_URL || ""
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || ""
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`

export async function GET(request: NextRequest) {
  try {
    // Generate PKCE parameters
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = generateCodeChallenge(codeVerifier)
    const state = generateState()
    const nonce = generateNonce()

    // Store code verifier and state in cookies for callback verification
    const cookieStore = await cookies()
    cookieStore.set("code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    })
    cookieStore.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    })
    cookieStore.set("oauth_nonce", nonce, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    })

    // Build authorization URL
    const authUrl = new URL(AUTHORIZE_URL)
    authUrl.searchParams.set("client_id", CLIENT_ID)
    authUrl.searchParams.set("response_type", "code")
    authUrl.searchParams.set("redirect_uri", REDIRECT_URI)
    authUrl.searchParams.set("scope", "openid email profile")
    authUrl.searchParams.set("state", state)
    authUrl.searchParams.set("nonce", nonce)
    authUrl.searchParams.set("code_challenge", codeChallenge)
    authUrl.searchParams.set("code_challenge_method", "S256")

    console.log("[v0] Redirecting to Shopify authorization:", authUrl.toString())

    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Failed to initiate login" }, { status: 500 })
  }
}
