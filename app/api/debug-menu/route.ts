import { NextResponse } from "next/server"
import { getMenu } from "@/lib/menus"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const handle = process.env.NEXT_PUBLIC_SHOPIFY_MAIN_MENU_HANDLE ?? "main-menu"
    const raw = await getMenu(handle)

    return NextResponse.json(
      {
        handle,
        ok: true,
        raw,
        env: {
          SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
          SHOPIFY_API_VERSION: process.env.SHOPIFY_STOREFRONT_API_VERSION,
          MENU_HANDLE: handle,
        },
      },
      { status: 200 },
    )
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        error: e?.message ?? String(e),
        stack: e?.stack,
      },
      { status: 500 },
    )
  }
}
