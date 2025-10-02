import { getMenu } from "@/lib/menus"
import { searchProducts } from "@/lib/shopify/catalog"
import { HeaderClient } from "@/components/header-client"

export async function Header() {
  const menuData = await getMenu("headless-menu")

  const megaMenuData: Record<string, any> = {}

  if (menuData?.items) {
    for (const item of menuData.items) {
      const title = item.title.toLowerCase()

      // Map menu items to product searches
      let searchQuery = ""

      if (title.includes("flagpole") && title.includes("kit")) {
        // Flagpole Kits & Bundles - search for bundle products
        searchQuery = "product_type:Bundle OR tag:kit OR tag:bundle"
      } else if (title.includes("flagpole")) {
        // Flagpoles - search for flagpole products
        searchQuery = "product_type:Flagpole"
      } else if (title.includes("flag")) {
        // Flags - search for flag products
        searchQuery = "product_type:Flag"
      } else if (title.includes("accessor")) {
        // Accessories - search for accessory products
        searchQuery = "product_type:Accessory OR product_type:Accessories"
      } else if (title.includes("holiday") || title.includes("seasonal")) {
        // Holiday & Seasonal - search for seasonal products
        searchQuery = "tag:holiday OR tag:seasonal OR tag:christmas OR tag:halloween"
      } else if (title.includes("resource")) {
        // Resources - search for guides or informational products
        searchQuery = "tag:guide OR tag:resource OR product_type:Guide"
      }

      if (searchQuery) {
        try {
          const products = await searchProducts({
            q: searchQuery,
            first: 4, // Limit to 4 products as requested
          })

          if (products?.nodes && products.nodes.length > 0) {
            megaMenuData[item.id] = {
              products: {
                nodes: products.nodes,
              },
            }
            console.log(`[v0] ✅ Found ${products.nodes.length} products for "${item.title}"`)
          } else {
            console.log(`[v0] ⚠️ No products found for "${item.title}" with query: ${searchQuery}`)
          }
        } catch (error) {
          console.error(`[v0] ❌ Error searching products for "${item.title}":`, error)
        }
      }
    }
  }

  return <HeaderClient menuData={menuData} megaMenuData={megaMenuData} />
}
