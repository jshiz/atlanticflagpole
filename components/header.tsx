import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts } from "@/lib/shopify/catalog"
import { HeaderClient } from "@/components/header-client"

export async function Header() {
  const menuData = await getMenu("headless-menu")

  const megaMenuData: Record<string, any> = {}

  if (menuData?.items) {
    for (const item of menuData.items) {
      const title = item.title.toLowerCase()

      let collectionHandles: string[] = []

      if (title.includes("flagpole") && !title.includes("kit")) {
        // Flagpoles menu - show telescoping and aluminum flagpoles
        collectionHandles = ["telescoping-flagpoles", "aluminum-flagpoles"]
      } else if (title.includes("kit") || title.includes("bundle")) {
        // Flagpole Kits & Bundles
        collectionHandles = ["flagpole-kits", "presidential-package"]
      } else if (title.includes("flag") && !title.includes("flagpole")) {
        // Flags menu - show american flags and state flags
        collectionHandles = ["american-flags", "state-flags"]
      } else if (title.includes("accessor")) {
        // Accessories menu - show specific accessory categories
        collectionHandles = ["flagpole-lighting", "flagpole-mounts", "flagpole-toppers"]
      } else if (title.includes("holiday") || title.includes("seasonal")) {
        // Holiday & Seasonal
        collectionHandles = ["holiday-seasonal"]
      }

      if (collectionHandles.length > 0) {
        const allProducts: any[] = []

        for (const handle of collectionHandles) {
          try {
            const collection = await getCollectionWithProducts(handle, 2) // Get 2 products per collection
            if (collection?.products?.nodes) {
              allProducts.push(...collection.products.nodes)
              console.log(
                `[v0] ✅ Found ${collection.products.nodes.length} products from "${handle}" for "${item.title}"`,
              )
            }
          } catch (error) {
            console.error(`[v0] ❌ Error fetching collection "${handle}":`, error)
          }
        }

        if (allProducts.length > 0) {
          megaMenuData[item.id] = {
            products: {
              nodes: allProducts.slice(0, 4), // Limit to 4 total products
            },
          }
          console.log(`[v0] ✅ Total ${allProducts.length} products for "${item.title}" megamenu`)
        } else {
          console.log(`[v0] ⚠️ No products found for "${item.title}"`)
        }
      }
    }
  }

  return <HeaderClient menuData={menuData} megaMenuData={megaMenuData} />
}
