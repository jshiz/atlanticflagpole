import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "Missing authorization code" }, { status: 400 })
    }

    const clientId = process.env.JUDGEME_CLIENT_ID
    const clientSecret = process.env.JUDGEME_CLIENT_SECRET
    const redirectUri = process.env.JUDGEME_REDIRECT_URI

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json({ error: "Missing OAuth credentials" }, { status: 500 })
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://judge.me/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error("[v0] Judge.me OAuth token exchange failed:", error)
      return NextResponse.json({ error: "Token exchange failed" }, { status: tokenResponse.status })
    }

    const tokenData = await tokenResponse.json()

    console.log("[v0] Judge.me OAuth successful! Access token received:", {
      hasAccessToken: !!tokenData.access_token,
      tokenType: tokenData.token_type,
      scope: tokenData.scope,
    })

    // In a production app, you would store this token securely
    // For now, we'll redirect to a success page with instructions
    return NextResponse.redirect(new URL("/judgeme/success", request.url))
  } catch (error) {
    console.error("[v0] Judge.me OAuth callback error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
