import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts } from "@/lib/shopify/catalog"
import { getProducts, getProduct } from "@/lib/shopify"
import { getCached, setCache } from "@/lib/cache"
import { JudgemeBadge } from "@/components/judgeme/judgeme-badge"
import { navigationConfig, singleNavItems } from "@/lib/navigation-config"
import { HeaderClient } from "@/components/header-client"

function findCollectionHandle(menuTitle: string): string | null {
  const normalizedTitle = menuTitle.toLowerCase().trim()

  console.log(`[v0] 🔍 Looking for collection handle for menu: "${menuTitle}"`)

  for (const item of singleNavItems) {
    if (item.label.toLowerCase() === normalizedTitle) {
      console.log(`[v0] ✅ Found in singleNavItems: ${item.collection}`)
      return item.collection || null
    }
  }

  for (const menu of navigationConfig) {
    if (menu.label.toLowerCase() === normalizedTitle) {
      if (menu.categories && menu.categories.length > 0) {
        const firstItem = menu.categories[0].items[0]
        console.log(`[v0] ✅ Found in navigationConfig: ${firstItem?.collection}`)
        return firstItem?.collection || null
      }
    }

    for (const category of menu.categories) {
      for (const item of category.items) {
        if (item.label.toLowerCase() === normalizedTitle) {
          console.log(`[v0] ✅ Found in category items: ${item.collection}`)
          return item.collection || null
        }
      }
    }
  }

  console.log(`[v0] ❌ No collection handle found for "${menuTitle}"`)
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

    const featuredHolidayHandles = [
      "patriot-glo-4000-led-flagpole-christmas-tree-30-43",
      "phoenix-flagpole-christmas-tree-light-kit-for-20-25-poles",
      "american-flag-lights-420led-outdoor-waterproof-red-white-and-blue-led-american-flag-net-light-of-the-united-states-for-memorial-day-independence-day-national-day-veterans-day-decorplug-in",
    ]

    const [menuData, nflFlagProducts, christmasTreeProducts, featuredHolidayProducts, partsProducts] =
      await Promise.all([
        getMenu("main-menu-new"),
        getProducts({ first: 12, query: "tag:nfl-flags" }).catch(() => []),
        getProducts({ first: 8, query: "tag:Christmas Tree" }).catch(() => []),
        Promise.all(featuredHolidayHandles.map((handle) => getProduct(handle).catch(() => null))).then((products) =>
          products.filter((p) => p !== null),
        ),
        getProducts({ first: 8, query: "tag:phoenix OR tag:parts OR tag:accessories" }).catch(() => []),
      ])

    console.log(`[v0] ✅ Found ${nflFlagProducts?.length || 0} NFL flag products`)
    console.log(`[v0] ✅ Found ${christmasTreeProducts?.length || 0} Christmas tree products`)
    console.log(`[v0] ✅ Found ${featuredHolidayProducts?.length || 0} featured holiday products`)
    console.log(`[v0] ✅ Found ${partsProducts?.length || 0} parts products`)

    const megaMenuData: Record<string, any> = {}
    const submenuProductsData: Record<string, any[]> = {}

    if (menuData?.items) {
      for (const item of menuData.items) {
        const title = item.title.toLowerCase()

        if (title.includes("christmas") && title.includes("tree")) {
          console.log(`[v0] ⏭️ Skipping "${item.title}" - using dedicated Christmas tree mega menu`)
          continue
        }

        if (title.includes("holiday") && title.includes("seasonal")) {
          if (featuredHolidayProducts && featuredHolidayProducts.length > 0) {
            megaMenuData[item.id] = {
              products: { nodes: featuredHolidayProducts },
            }
            console.log(
              `[v0] ✅ Added ${featuredHolidayProducts.length} featured holiday products for "${item.title}" menu`,
            )
          }
          continue
        }

        if (title.includes("parts") && title.includes("accessories")) {
          if (partsProducts && partsProducts.length > 0) {
            megaMenuData[item.id] = {
              products: { nodes: partsProducts },
            }
            console.log(`[v0] ✅ Added ${partsProducts.length} parts products for "${item.title}" menu`)
          }
          continue
        }

        const collectionHandle = findCollectionHandle(item.title)

        if (collectionHandle) {
          try {
            const collection = await getCollectionWithProducts(collectionHandle, 8, "PRICE", true)
            if (collection?.products?.nodes && collection.products.nodes.length > 0) {
              megaMenuData[item.id] = {
                products: { nodes: collection.products.nodes },
              }
              console.log(
                `[v0] ✅ Found ${collection.products.nodes.length} products for "${item.title}" menu (${collectionHandle})`,
              )
            }
          } catch (error: any) {
            console.log(`[v0] ❌ Error fetching collection "${collectionHandle}" for "${item.title}":`, error.message)
          }
        }
      }
    }

    const endTime = Date.now()
    console.log(`[v0] ⚡ Header data fetched in ${endTime - startTime}ms`)

    const headerData = {
      menuData,
      megaMenuData,
      submenuProductsData,
      nflFlagProducts: nflFlagProducts || [],
      christmasTreeProducts: christmasTreeProducts || [],
      holidayProducts: featuredHolidayProducts || [],
      partsProducts: partsProducts || [],
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
          holidayProducts={headerData.holidayProducts}
          partsProducts={headerData.partsProducts}
          judgemeBadge={<JudgemeBadge />}
        />
      </>
    )
  } catch (error) {
    console.error("[v0] ❌ Error in Header component:", error)
    return (
      <HeaderClient
        menuData={{ items: [] }}
        megaMenuData={{}}
        submenuProductsData={{}}
        nflFlagProducts={[]}
        christmasTreeProducts={[]}
        holidayProducts={[]}
        partsProducts={[]}
        judgemeBadge={<JudgemeBadge />}
      />
    )
  }
}
