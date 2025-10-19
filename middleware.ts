// middleware.ts (Next.js App Router)
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Friendly slug -> actual tag(s) in Shopify.
// Comma = AND, pipe "|" = OR (your search builder already supports this).
const TAGS: Record<string, string> = {
  // Flagpoles
  telescoping: "telescoping",
  aluminum: "aluminum",
  indoor: "indoor",
  "20-ft": "20ft",
  "25-ft": "25ft",
  "30-plus": "30ft",
  bundles: "bundle|kit",
  kit: "kit",
  presidential: "presidential",
  "phoenix-patriot": "phoenix,patriot",

  // Flags
  american: "american|usa",
  state: "state-flag",
  military: "military",
  historical: "historical",

  // Accessories
  lighting: "light|lighting",
  mount: "mount|bracket",
  eagle: "eagle|topper",
  parts: "part|replacement",
}

function rewriteToProducts(req: NextRequest, type: "Flagpole" | "Flag" | "Accessory", tag?: string) {
  const url = req.nextUrl.clone()
  url.pathname = "/products"
  url.searchParams.set("type", type)
  if (tag) url.searchParams.set("tag", tag.toLowerCase())

  console.log("[v0] Middleware rewriting:", req.nextUrl.pathname, "→", url.pathname + url.search)
  return NextResponse.rewrite(url)
}

export function middleware(req: NextRequest) {
  try {
    // Middleware disabled - let Next.js handle routing naturally
    // Collections will be handled by app/collections/[handle]/page.tsx
    return NextResponse.next()
  } catch (error) {
    console.error("[v0] Middleware error:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [],
}
