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
  const { pathname } = req.nextUrl

  // Parent category -> just type filter (no tag)
  if (/^\/flagpoles\/?$/.test(pathname)) return rewriteToProducts(req, "Flagpole")
  if (/^\/flags\/?$/.test(pathname)) return rewriteToProducts(req, "Flag")
  if (/^\/accessories\/?$/.test(pathname)) return rewriteToProducts(req, "Accessory")

  // /flagpoles/<slug>  (also supports /flagpoles/a/b as AND)
  let m = pathname.match(/^\/flagpoles\/([^/]+)(?:\/([^/]+))?$/i)
  if (m) {
    const slugs = [m[1], m[2]].filter(Boolean) as string[]
    const tag = slugs.map((s) => TAGS[s] ?? s).join(",") // comma = AND
    return rewriteToProducts(req, "Flagpole", tag)
  }

  // /flags/<slug>
  m = pathname.match(/^\/flags\/([^/]+)$/i)
  if (m) return rewriteToProducts(req, "Flag", TAGS[m[1]] ?? m[1])

  // /accessories/<slug>
  m = pathname.match(/^\/accessories\/([^/]+)$/i)
  if (m) return rewriteToProducts(req, "Accessory", TAGS[m[1]] ?? m[1])

  return NextResponse.next()
}

export const config = {
  matcher: ["/flagpoles/:path*", "/flags/:path*", "/accessories/:path*"],
}
