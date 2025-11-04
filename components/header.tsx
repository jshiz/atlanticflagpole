import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts } from "@/lib/shopify/catalog"
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
                getCollectionWithProducts(collectionHandle, 24)
                  .then((collection) => {
                    if (collection?.products?.nodes && collection.products.nodes.length > 0) {
                      // Filter for available products only
                      const availableProducts = collection.products.nodes.filter((p: any) => {
                        const hasVariant = p.variants?.edges?.[0]?.node
                        return hasVariant?.availableForSale
                      })

                      submenuProductsData[subItem.id] = availableProducts
                      console.log(
                        `[v0] ✅ Found ${availableProducts.length} available products for submenu "${subItem.title}" (collection: ${collectionHandle})`,
                      )
                    } else {
                      console.log(
                        `[v0] ⚠️ No products found in collection "${collectionHandle}" for submenu "${subItem.title}"`,
                      )
                    }
                  })
                  .catch((error) => {
                    console.log(
                      `[v0] ❌ Error fetching collection "${collectionHandle}" for submenu "${subItem.title}":`,
                      error.message,
                    )
                  }),
              )
            }
          }
        }

        const collectionHandle = extractCollectionHandle(item.url)
        if (collectionHandle) {
          const collectionPromise = getCollectionWithProducts(collectionHandle, 30)
            .then((collection) => {
              if (collection?.products?.nodes && collection.products.nodes.length > 0) {
                // Filter for available products only
                const availableProducts = collection.products.nodes.filter((p: any) => {
                  const hasVariant = p.variants?.edges?.[0]?.node
                  return hasVariant?.availableForSale
                })

                const uniqueProducts = Array.from(new Map(availableProducts.map((p: any) => [p.id, p])).values())

                megaMenuData[item.id] = {
                  products: { nodes: uniqueProducts.slice(0, 24) },
                }
                console.log(
                  `[v0] ✅ Found ${uniqueProducts.length} available products for "${item.title}" (collection: ${collectionHandle})`,
                )
              } else {
                console.log(`[v0] ⚠️ No products found in collection "${collectionHandle}" for "${item.title}"`)
              }
            })
            .catch((error) => {
              console.log(`[v0] ❌ Error fetching collection "${collectionHandle}" for "${item.title}":`, error.message)
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
