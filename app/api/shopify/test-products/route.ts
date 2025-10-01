import { NextResponse } from "next/server"
import { sf } from "@/lib/shopify"

export const dynamic = "force-dynamic"

const QUERY = /* GraphQL */ `
  query TestProducts($first: Int! = 5) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        availableForSale
        productType
        tags
      }
    }
  }
`

function errJson(e: unknown) {
  const msg = e instanceof Error ? e.message : String(e)
  return { ok: false, error: msg }
}

export async function GET() {
  try {
    const data = await sf<{ products?: { nodes?: any[] | null } | null }>(QUERY, { first: 5 })

    const nodes = data?.products?.nodes ?? []
    return NextResponse.json({ ok: true, count: nodes.length, sample: nodes }, { status: 200 })
  } catch (e) {
    // ALWAYS return a response, even on error
    return NextResponse.json(errJson(e), { status: 500 })
  }
}
