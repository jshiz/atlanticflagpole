export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { cookies } from "next/headers"

// Using cookies for wishlist storage (can be upgraded to Shopify metafields later)
const WISHLIST_COOKIE = "wishlist"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cookieStore = await cookies()
    const wishlistCookie = cookieStore.get(WISHLIST_COOKIE)
    const wishlist = wishlistCookie ? JSON.parse(wishlistCookie.value) : []

    // Fetch product details for wishlist items
    const items = await Promise.all(
      wishlist.map(async (productId: string) => {
        try {
          // Fetch product details from Shopify
          const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${productId}`)
          if (!response.ok) return null
          return await response.json()
        } catch {
          return null
        }
      }),
    )

    return NextResponse.json({ items: items.filter(Boolean) })
  } catch (error: any) {
    console.error("[v0] Error fetching wishlist:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch wishlist" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await request.json()

    const cookieStore = await cookies()
    const wishlistCookie = cookieStore.get(WISHLIST_COOKIE)
    const wishlist = wishlistCookie ? JSON.parse(wishlistCookie.value) : []

    if (!wishlist.includes(productId)) {
      wishlist.push(productId)
      cookieStore.set(WISHLIST_COOKIE, JSON.stringify(wishlist), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
      })
    }

    return NextResponse.json({ success: true, wishlist })
  } catch (error: any) {
    console.error("[v0] Error adding to wishlist:", error)
    return NextResponse.json({ error: error.message || "Failed to add to wishlist" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await request.json()

    const cookieStore = await cookies()
    const wishlistCookie = cookieStore.get(WISHLIST_COOKIE)
    const wishlist = wishlistCookie ? JSON.parse(wishlistCookie.value) : []

    const updatedWishlist = wishlist.filter((id: string) => id !== productId)

    cookieStore.set(WISHLIST_COOKIE, JSON.stringify(updatedWishlist), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    })

    return NextResponse.json({ success: true, wishlist: updatedWishlist })
  } catch (error: any) {
    console.error("[v0] Error removing from wishlist:", error)
    return NextResponse.json({ error: error.message || "Failed to remove from wishlist" }, { status: 500 })
  }
}
