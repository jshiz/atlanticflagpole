import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts, searchProducts } from "@/lib/shopify/catalog"
import { HeaderClient } from "@/components/header-client"
import { getProducts } from "@/lib/shopify"
import { getCached, setCache } from "@/lib/cache"
import { JudgemeBadge } from "@/components/judgeme/judgeme-badge"

function extractCollectionHandle(url: string): string | null {
  const match = url.match(/\/collections\/([^/?]+)/)
  return match ? match[1] : null
}

export async function Header() {
  try {
    const cacheKey = "header-data"
    const cached = getCached<any>(cacheKey)

    if (cached) {
      console.log("[v0] ✅ Using cached header data")
      return (
        <>
          <HeaderClient
            menuData={cached.menuData}
            megaMenuData={cached.megaMenuData}
            submenuProductsData={cached.submenuProductsData}
            nflFlagProducts={cached.nflFlagProducts}
            christmasTreeProducts={cached.christmasTreeProducts}
            judgemeBadge={<JudgemeBadge />}
          />
        </>
      )
    }

    console.log("[v0] 🔄 Fetching fresh header data...")
    const startTime = Date.now()

    const [menuData, nflFlagProducts, christmasTreeProducts] = await Promise.all([
      getMenu("main-menu-new"),
      getProducts({ first: 12, query: "tag:nfl-flags" }).catch(() => []),
      getProducts({ first: 8, query: "tag:Christmas Tree" }).catch(() => []),
    ])

    console.log(`[v0] ✅ Found ${nflFlagProducts?.length || 0} NFL flag products`)
    console.log(`[v0] ✅ Found ${christmasTreeProducts?.length || 0} Christmas tree products`)

    const megaMenuData: Record<string, any> = {}
    const submenuProductsData: Record<string, any[]> = {}

    if (menuData?.items) {
      const fetchPromises: Promise<void>[] = []

      for (const item of menuData.items) {
        const title = item.title.toLowerCase()

        if (title.includes("christmas") && title.includes("tree")) {
          console.log(`[v0] ⏭️ Skipping "${item.title}" - using dedicated Christmas tree mega menu`)
          continue
        }

        if (item.items && item.items.length > 0) {
          for (const subItem of item.items) {
            const collectionHandle = extractCollectionHandle(subItem.url)
            if (collectionHandle) {
              fetchPromises.push(
                (async () => {
                  try {
                    const collection = await getCollectionWithProducts(collectionHandle, 24)
                    if (collection?.products?.nodes && collection.products.nodes.length > 0) {
                      submenuProductsData[subItem.title] = collection.products.nodes
                      console.log(
                        `[v0] ✅ Found ${collection.products.nodes.length} products for submenu "${subItem.title}"`,
                      )
                    } else {
                      // Fallback to tag search if collection is empty or not found
                      const tagResults = await searchProducts({ tag: subItem.title, first: 24 })
                      if (tagResults?.nodes && tagResults.nodes.length > 0) {
                        submenuProductsData[subItem.title] = tagResults.nodes
                        console.log(
                          `[v0] ✅ Found ${tagResults.nodes.length} products via tag for submenu "${subItem.title}"`,
                        )
                      }
                    }
                  } catch (error) {
                    console.log(`[v0] ⚠️ Could not fetch products for submenu "${subItem.title}"`)
                  }
                })(),
              )
            }
          }
        }

        let collectionConfig: Array<{ handle: string; tags: string[] }> = []

        if (title.includes("flagpole") && !title.includes("kit")) {
          collectionConfig = [{ handle: "flagpoles", tags: ["telescoping", "flagpole", "Aluminum Flagpoles"] }]
        } else if (title.includes("flag") && !title.includes("flagpole")) {
          collectionConfig = [{ handle: "flags", tags: ["american flag", "state flag", "nfl", "nfl-flags"] }]
        } else if (title.includes("part") || title.includes("accessor")) {
          collectionConfig = [
            {
              handle: "parts-and-accessories",
              tags: ["accessory", "accessories", "light", "lighting", "topper", "finial", "mount", "bracket"],
            },
          ]
        } else if (title.includes("holiday") || title.includes("seasonal")) {
          collectionConfig = [{ handle: "holiday-seasonal", tags: ["holiday", "seasonal", "christmas", "halloween"] }]
        } else if (title.includes("info") || title.includes("help") || title.includes("support")) {
          collectionConfig = [{ handle: "featured", tags: ["featured", "popular", "best seller"] }]
        } else if (title.includes("affiliate") || title.includes("partner")) {
          collectionConfig = [{ handle: "all-products", tags: ["flagpole", "flag", "accessory"] }]
        } else {
          collectionConfig = [{ handle: "featured", tags: ["featured", "popular"] }]
        }

        if (collectionConfig.length > 0) {
          const collectionPromise = (async () => {
            try {
              const results = await Promise.all(
                collectionConfig.map(async (config) => {
                  try {
                    const collection = await getCollectionWithProducts(config.handle, 30)
                    if (collection?.products?.nodes && collection.products.nodes.length > 0) {
                      console.log(
                        `[v0] ✅ Found ${collection.products.nodes.length} products from collection "${config.handle}"`,
                      )
                      return collection.products.nodes
                    }

                    for (const tag of config.tags) {
                      try {
                        const tagResults = await searchProducts({ tag, first: 30 })
                        if (tagResults?.nodes && tagResults.nodes.length > 0) {
                          console.log(`[v0] ✅ Found ${tagResults.nodes.length} products with tag "${tag}"`)
                          return tagResults.nodes
                        }
                      } catch (tagError) {
                        console.log(`[v0] ⚠️ Tag search failed for "${tag}"`)
                      }
                    }
                  } catch (error) {
                    console.log(`[v0] ⚠️ Could not fetch products for "${config.handle}"`)
                  }
                  return []
                }),
              )

              const allProducts = results.flat()
              if (allProducts.length > 0) {
                console.log(`[v0] 🔍 Checking ${allProducts.length} products for "${item.title}"`)
                if (allProducts[0]) {
                  console.log(`[v0] 🔍 Sample product structure:`, {
                    id: allProducts[0].id,
                    title: allProducts[0].title,
                    hasVariantsEdges: !!allProducts[0].variants?.edges,
                    hasVariantsNodes: !!allProducts[0].variants?.nodes,
                    variantsEdgesLength: allProducts[0].variants?.edges?.length,
                    variantsNodesLength: allProducts[0].variants?.nodes?.length,
                    firstVariant: allProducts[0].variants?.edges?.[0]?.node || allProducts[0].variants?.nodes?.[0],
                  })
                }

                const activeProducts = allProducts.filter((p) => {
                  // Include product if it has an ID and title (basic validation)
                  if (!p.id || !p.title) {
                    console.log(`[v0] ❌ Product missing ID or title`)
                    return false
                  }

                  console.log(`[v0] ✅ Product "${p.title}" included`)
                  return true
                })

                const uniqueProducts = Array.from(new Map(activeProducts.map((p) => [p.id, p])).values())
                submenuProductsData[item.title] = uniqueProducts.slice(0, 24)
                megaMenuData[item.id] = {
                  products: { nodes: uniqueProducts.slice(0, 24) },
                }
                console.log(`[v0] ✅ Total ${uniqueProducts.length} unique active products for "${item.title}"`)
              } else {
                console.log(`[v0] ⚠️ No products found for "${item.title}"`)
              }
            } catch (error) {
              console.log(`[v0] ⚠️ Error processing products for "${item.title}"`)
            }
          })()

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
    setCache(cacheKey, headerData, 3600000)

    return (
      <>
        <HeaderClient
          menuData={headerData.menuData}
          megaMenuData={headerData.megaMenuData}
          submenuProductsData={headerData.submenuProductsData}
          nflFlagProducts={headerData.nflFlagProducts}
          christmasTreeProducts={headerData.christmasTreeProducts}
          judgemeBadge={<JudgemeBadge />}
        />
      </>
    )
  } catch (error) {
    console.error("[v0] ❌ Error in Header component:", error)
    return (
      <HeaderClient
        menuData={null}
        megaMenuData={{}}
        submenuProductsData={{}}
        nflFlagProducts={[]}
        christmasTreeProducts={[]}
        judgemeBadge={<JudgemeBadge />}
      />
    )
  }
}
