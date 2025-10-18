import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts, searchProducts } from "@/lib/shopify/catalog"
import { HeaderClient } from "@/components/header-client"
import { getProducts } from "@/lib/shopify"
import { getCached, setCache } from "@/lib/cache"

function extractCollectionHandle(url: string): string | null {
  const match = url.match(/\/collections\/([^/?]+)/)
  return match ? match[1] : null
}

export async function Header() {
  const cacheKey = "header-data"
  const cached = getCached<any>(cacheKey)

  if (cached) {
    console.log("[v0] ✅ Using cached header data")
    return (
      <HeaderClient
        menuData={cached.menuData}
        megaMenuData={cached.megaMenuData}
        submenuProductsData={cached.submenuProductsData}
        nflFlagProducts={cached.nflFlagProducts}
        christmasTreeProducts={cached.christmasTreeProducts}
      />
    )
  }

  console.log("[v0] 🔄 Fetching fresh header data...")
  const startTime = Date.now()

  const [menuData, nflFlagProducts, christmasTreeProducts] = await Promise.all([
    getMenu("ultimate-menu"),
    getProducts({ first: 12, query: "tag:nfl-flags" }).catch(() => []),
    getProducts({ first: 8, query: "tag:Christmas Tree" }).catch(() => []),
  ])

  console.log(`[v0] ✅ Found ${nflFlagProducts?.length || 0} NFL flag products`)
  console.log(`[v0] ✅ Found ${christmasTreeProducts?.length || 0} Christmas tree products`)

  const megaMenuData: Record<string, any> = {}
  const submenuProductsData: Record<string, any[]> = {}

  // Only fetch collections that actually exist in Shopify

  if (menuData?.items) {
    const fetchPromises: Promise<void>[] = []

    for (const item of menuData.items) {
      const title = item.title.toLowerCase()

      if (title.includes("christmas") && title.includes("tree")) {
        console.log(`[v0] ⏭️ Skipping "${item.title}" - using dedicated Christmas tree mega menu`)
        continue
      }

      // Fetch submenu products in parallel
      if (item.items && item.items.length > 0) {
        for (const subItem of item.items) {
          const collectionHandle = extractCollectionHandle(subItem.url)
          if (collectionHandle) {
            fetchPromises.push(
              getCollectionWithProducts(collectionHandle, 4)
                .then((collection) => {
                  if (collection?.products?.nodes && collection.products.nodes.length > 0) {
                    submenuProductsData[subItem.id] = collection.products.nodes
                    console.log(
                      `[v0] ✅ Found ${collection.products.nodes.length} products for submenu "${subItem.title}"`,
                    )
                  }
                })
                .catch(() => {
                  console.log(`[v0] ⚠️ Could not fetch products for submenu "${subItem.title}"`)
                }),
            )
          }
        }
      }

      let collectionConfig: Array<{ handle: string; tags: string[] }> = []

      if (title.includes("flagpole") && !title.includes("kit")) {
        collectionConfig = [
          { handle: "telescoping-flagpoles", tags: ["telescoping"] },
          { handle: "aluminum-flagpoles", tags: ["aluminum", "Aluminum Flagpoles"] },
        ]
      } else if (title.includes("flag") && !title.includes("flagpole")) {
        collectionConfig = [
          { handle: "american-flags", tags: ["american flag"] },
          { handle: "state-flags", tags: ["state flag"] },
        ]
      }

      if (collectionConfig.length > 0) {
        const collectionPromise = Promise.all(
          collectionConfig.map(async (config) => {
            try {
              const collection = await getCollectionWithProducts(config.handle, 2)
              if (collection?.products?.nodes && collection.products.nodes.length > 0) {
                console.log(
                  `[v0] ✅ Found ${collection.products.nodes.length} products from collection "${config.handle}"`,
                )
                return collection.products.nodes
              }

              // Fallback to tag search
              for (const tag of config.tags) {
                const tagResults = await searchProducts({ tag, first: 2 })
                if (tagResults?.nodes && tagResults.nodes.length > 0) {
                  console.log(`[v0] ✅ Found ${tagResults.nodes.length} products with tag "${tag}"`)
                  return tagResults.nodes
                }
              }
            } catch (error) {
              console.error(`[v0] ❌ Error fetching products for "${config.handle}"`)
            }
            return []
          }),
        ).then((results) => {
          const allProducts = results.flat()
          if (allProducts.length > 0) {
            const uniqueProducts = Array.from(new Map(allProducts.map((p) => [p.id, p])).values())
            megaMenuData[item.id] = {
              products: { nodes: uniqueProducts.slice(0, 4) },
            }
            console.log(`[v0] ✅ Total ${uniqueProducts.length} unique products for "${item.title}"`)
          }
        })

        fetchPromises.push(collectionPromise)
      }
    }

    await Promise.all(fetchPromises)
  }

  const endTime = Date.now()
  console.log(`[v0] ⚡ Header data fetched in ${endTime - startTime}ms`)

  const headerData = {
    menuData,
    megaMenuData,
    submenuProductsData,
    nflFlagProducts: nflFlagProducts || [],
    christmasTreeProducts: christmasTreeProducts || [],
  }
  setCache(cacheKey, headerData)

  return (
    <HeaderClient
      menuData={headerData.menuData}
      megaMenuData={headerData.megaMenuData}
      submenuProductsData={headerData.submenuProductsData}
      nflFlagProducts={headerData.nflFlagProducts}
      christmasTreeProducts={headerData.christmasTreeProducts}
    />
  )
}
