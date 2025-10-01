import { NextResponse } from "next/server"
import { sf } from "@/lib/shopify"

export const dynamic = "force-dynamic"

const QUERY = /* GraphQL */ `
  query TestCollections($first: Int! = 5) {
    collections(first: $first) {
      nodes { id title handle }
    }
  }
`

function errJson(e: unknown) {
  const msg = e instanceof Error ? e.message : String(e)
  return { ok: false, error: msg }
}

export async function GET() {
  try {
    const data = await sf<{ collections?: { nodes?: any[] | null } | null }>(QUERY, { first: 5 })
    const nodes = data?.collections?.nodes ?? []
    return NextResponse.json({ ok: true, count: nodes.length, sample: nodes }, { status: 200 })
  } catch (e) {
    // ALWAYS return a response, even on error
    return NextResponse.json(errJson(e), { status: 500 })
  }
}
