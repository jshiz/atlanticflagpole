import { NextResponse } from "next/server"
import { getMenuWithNormalizedUrls, getCollectionWithProducts } from "@/lib/shopify/catalog"

export const dynamic = "force-dynamic"
export const revalidate = 3600

const fallbackMenu = {
  items: [
    {
      id: "flagpoles",
      title: "Flagpoles",
      url: "/collections/flagpoles",
      items: [
        { id: "telescoping", title: "Telescoping Flagpoles", url: "/collections/telescoping-flagpoles", items: [] },
        { id: "aluminum", title: "Aluminum Flagpoles", url: "/collections/aluminum-flagpoles", items: [] },
        { id: "indoor", title: "Indoor Flagpoles", url: "/collections/indoor-flagpoles", items: [] },
      ],
    },
    {
      id: "flags",
      title: "Flags",
      url: "/collections/flags",
      items: [
        { id: "american", title: "American Flags", url: "/collections/american-flags", items: [] },
        { id: "state", title: "State Flags", url: "/collections/state-flags", items: [] },
        { id: "military", title: "Military Flags", url: "/collections/military-flags", items: [] },
      ],
    },
    {
      id: "accessories",
      title: "Accessories",
      url: "/collections/accessories",
      items: [
        { id: "lighting", title: "Flagpole Lighting", url: "/collections/flagpole-lighting", items: [] },
        { id: "mounts", title: "Flagpole Mounts", url: "/collections/flagpole-mounts", items: [] },
        { id: "toppers", title: "Flagpole Toppers", url: "/collections/flagpole-toppers", items: [] },
      ],
    },
    {
      id: "holiday",
      title: "Holiday & Seasonal",
      url: "/collections/holiday-seasonal",
      items: [
        { id: "christmas", title: "Christmas", url: "/collections/christmas", items: [] },
        { id: "halloween", title: "Halloween", url: "/collections/halloween", items: [] },
        { id: "patriotic", title: "Patriotic Holidays", url: "/collections/patriotic-holidays", items: [] },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      url: "/resources",
      items: [
        { id: "blog", title: "Blog", url: "/blog", items: [] },
        { id: "guides", title: "Installation Guides", url: "/installation-guides", items: [] },
        { id: "faq", title: "FAQ", url: "/faq", items: [] },
      ],
    },
  ],
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const handle = searchParams.get("handle") || "main-menu"
  const withProducts = searchParams.get("withProducts") === "true"
  const collectionHandle = searchParams.get("collection")

  try {
    if (withProducts && collectionHandle) {
      const collection = await getCollectionWithProducts(collectionHandle, 6)
      return NextResponse.json({ collection })
    }

    let menu = null
    try {
      menu = await getMenuWithNormalizedUrls(handle)

      if (!menu) {
        console.log("[v0] No menu found in Shopify with handle:", handle)
        console.log("[v0] Using fallback menu structure")
        console.log("[v0] To fix: Create a menu called 'main-menu' in Shopify Admin → Online Store → Navigation")
        return NextResponse.json({
          menu: null,
          fallbackMenu,
          usingFallback: true,
          message: "No Shopify menu found - using fallback",
        })
      }

      console.log("[v0] Successfully loaded Shopify menu:", handle)
      console.log("[v0] Menu has", menu.items?.length || 0, "top-level items")
      return NextResponse.json({ menu, usingFallback: false })
    } catch (menuError: any) {
      console.error("[v0] Error fetching Shopify menu:", menuError.message)
      console.log("[v0] Using fallback menu structure")
      return NextResponse.json({
        menu: null,
        fallbackMenu,
        usingFallback: true,
        error: menuError.message,
        message: "Failed to fetch Shopify menu - using fallback",
      })
    }
  } catch (error) {
    console.error("[v0] Error in menu API route:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch menu",
        fallbackMenu,
        usingFallback: true,
      },
      { status: 500 },
    )
  }
}
