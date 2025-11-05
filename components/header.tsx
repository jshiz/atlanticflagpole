import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts } from "@/lib/shopify/catalog"
import { HeaderClient } from "@/components/header-client"
import { getProducts } from "@/lib/shopify"
import { getCached, setCache } from "@/lib/cache"
import { JudgemeBadge } from "@/components/judgeme/judgeme-badge"
import { navigationConfig } from "@/lib/navigation-config"

function findCollectionHandle(menuTitle: string): string | null {
  const normalizedTitle = menuTitle.toLowerCase().trim()

  for (const menu of navigationConfig) {
    if (menu.label.toLowerCase() === normalizedTitle) {
      // For top-level menus, use the first category's first item's collection
      if (menu.categories && menu.categories.length > 0) {
        const firstItem = menu.categories[0].items[0]
        return firstItem?.collection || null
      }
    }

    // Check categories and items
    for (const category of menu.categories) {
      for (const item of category.items) {
        if (item.label.toLowerCase() === normalizedTitle) {
          return item.collection || null
        }
      }
    }
  }

  return null
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
      for (const item of menuData.items) {
        const title = item.title.toLowerCase()

        if (title.includes("christmas") && title.includes("tree")) {
          console.log(`[v0] ⏭️ Skipping "${item.title}" - using dedicated Christmas tree mega menu`)
          continue
        }

        const collectionHandle = findCollectionHandle(item.title)

        if (collectionHandle) {
          try {
            const collection = await getCollectionWithProducts(collectionHandle, 5, "PRICE", true)
            if (collection?.products?.nodes && collection.products.nodes.length > 0) {
              megaMenuData[item.id] = {
                products: { nodes: collection.products.nodes },
              }
              console.log(
                `[v0] ✅ Found ${collection.products.nodes.length} products for "${item.title}" menu (${collectionHandle}, sorted by price)`,
              )
            } else {
              console.log(`[v0] ⚠️ No products in collection "${collectionHandle}" for "${item.title}"`)
            }
          } catch (error) {
            console.log(`[v0] ❌ Error fetching collection "${collectionHandle}" for "${item.title}":`, error.message)
          }
        } else {
          console.log(`[v0] ⚠️ No collection handle found for menu item "${item.title}"`)
        }

        // Submenu products can be fetched on-demand when user hovers
      }
    }

    const endTime = Date.now()
    console.log(`[v0] ⚡ Header data fetched in ${endTime - startTime}ms`)
    console.log(`[v0] 📊 Mega menu data summary:`, {
      menuItemsWithProducts: Object.keys(megaMenuData).length,
      totalProducts: Object.values(megaMenuData).reduce(
        (sum: number, item: any) => sum + (item.products?.nodes?.length || 0),
        0,
      ),
    })

    const headerData = {
      menuData,
      megaMenuData,
      submenuProductsData,
      nflFlagProducts: nflFlagProducts || [],
      christmasTreeProducts: christmasTreeProducts || [],
    }
    setCache(cacheKey, headerData, 21600000)

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
