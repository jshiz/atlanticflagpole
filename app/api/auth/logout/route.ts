export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { deleteSession, getSession } from "@/lib/auth/session"

const LOGOUT_URL = process.env.SHOPIFY_CUSTOMER_ACCOUNT_LOGOUT_URL || ""

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()

    // Delete local session
    await deleteSession()

    // If we have an ID token, logout from Shopify as well
    if (session?.idToken && LOGOUT_URL) {
      const logoutUrl = new URL(LOGOUT_URL)
      logoutUrl.searchParams.set("id_token_hint", session.idToken)
      logoutUrl.searchParams.set("post_logout_redirect_uri", `${process.env.NEXT_PUBLIC_SITE_URL}/`)

      return NextResponse.redirect(logoutUrl.toString())
    }

    // Otherwise just redirect to home
    return NextResponse.redirect(new URL("/", request.url))
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.redirect(new URL("/", request.url))
  }
}
