import { NextResponse } from "next/server"
import { getCollectionWithProducts, searchProducts } from "@/lib/shopify/catalog"

export async function GET() {
  try {
    console.log("[v0] 🔄 Fetching mega menu data...")
    const megaMenuData: Record<string, any> = {}

    const menuConfigs: Record<string, Array<{ handle: string; tags: string[] }>> = {
      Flagpoles: [
        { handle: "phoenix-flagpoles", tags: ["phoenix", "phoenix flagpole"] },
        { handle: "telescoping-flagpoles", tags: ["telescoping", "telescoping flagpole"] },
        { handle: "commercial-grade-flagpoles", tags: ["commercial", "commercial grade"] },
        { handle: "residential-flagpoles", tags: ["residential", "residential flagpole"] },
        { handle: "indoor-flagpoles", tags: ["indoor", "indoor flagpole"] },
        { handle: "heavy-duty-flagpoles", tags: ["heavy duty", "heavy-duty"] },
      ],
      "Phoenix Parts and Accessories": [
        { handle: "phoenix-replacement-parts", tags: ["phoenix", "replacement", "parts"] },
        { handle: "solar-lights", tags: ["solar", "light", "lighting"] },
        { handle: "toppers-finials", tags: ["topper", "finial", "eagle", "ball"] },
        { handle: "flash-collars", tags: ["flash collar", "collar"] },
        { handle: "flagpole-covers", tags: ["cover", "flagpole cover"] },
        { handle: "mounting-hardware", tags: ["mount", "hardware", "bracket"] },
      ],
      Flags: [
        { handle: "high-quality-usa-flags", tags: ["usa", "american flag", "us flag"] },
        { handle: "state-flags", tags: ["state flag", "state"] },
        { handle: "sports-flags", tags: ["sports", "team"] },
        { handle: "civil-service", tags: ["civil service", "police", "fire"] },
        { handle: "military-flags", tags: ["military", "army", "navy", "marine", "air force"] },
        { handle: "outdoor-american-flags", tags: ["outdoor", "american"] },
        { handle: "indoor-american-flags", tags: ["indoor", "american"] },
      ],
      "Gift Ideas": [
        { handle: "veteran-gifts", tags: ["veteran", "gift"] },
        { handle: "homeowner-essentials", tags: ["homeowner", "essential"] },
        { handle: "christmas", tags: ["christmas", "holiday"] },
        { handle: "gift-bundles", tags: ["bundle", "gift"] },
        { handle: "under-100", tags: ["under 100", "affordable"] },
      ],
      "Info Center": [
        { handle: "featured", tags: ["featured", "popular", "best seller"] },
        { handle: "new-arrivals", tags: ["new", "latest"] },
        { handle: "telescoping-flagpoles", tags: ["telescoping", "flagpole"] },
        { handle: "american-flags", tags: ["american", "usa flag"] },
      ],
    }

    for (const [menuKey, collectionConfig] of Object.entries(menuConfigs)) {
      const allProducts: any[] = []

      for (const config of collectionConfig) {
        try {
          const collection = await getCollectionWithProducts(config.handle, 3)
          if (collection?.products?.nodes && collection.products.nodes.length > 0) {
            allProducts.push(...collection.products.nodes)
            console.log(`[v0] ✅ Found ${collection.products.nodes.length} products for collection "${config.handle}"`)
          } else {
            console.log(`[v0] 🔍 Trying tag search for "${config.handle}"...`)
            for (const tag of config.tags) {
              try {
                const tagResults = await searchProducts({ tag, first: 3 })
                if (tagResults?.nodes && tagResults.nodes.length > 0) {
                  allProducts.push(...tagResults.nodes)
                  console.log(`[v0] ✅ Found ${tagResults.nodes.length} products with tag "${tag}"`)
                  break
                }
              } catch (tagError) {
                console.log(`[v0] ⚠️ Tag search failed for "${tag}"`)
                continue
              }
            }
          }
        } catch (error) {
          console.log(`[v0] ⚠️ Error fetching "${config.handle}":`, error)
          continue
        }
      }

      if (allProducts.length > 0) {
        const uniqueProducts = Array.from(new Map(allProducts.map((p) => [p.id, p])).values())
        megaMenuData[menuKey] = {
          products: {
            nodes: uniqueProducts.slice(0, 8),
          },
        }
        console.log(`[v0] ✅ ${menuKey}: ${uniqueProducts.length} unique products`)
      } else {
        console.log(`[v0] ⚠️ ${menuKey}: No products found`)
      }
    }

    console.log("[v0] ✅ Mega menu data fetched successfully")
    return NextResponse.json(megaMenuData)
  } catch (error) {
    console.error("[v0] ❌ Error fetching mega menu data:", error)
    return NextResponse.json({}, { status: 500 })
  }
}
