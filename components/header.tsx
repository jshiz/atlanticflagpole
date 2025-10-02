import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts } from "@/lib/shopify/catalog"
import { HeaderClient } from "@/components/header-client"

export async function Header() {
  const menuData = await getMenu("headless-menu")

  const megaMenuData: Record<string, any> = {}

  if (menuData?.items) {
    // Subcategories don't exist as collections in Shopify
    for (const item of menuData.items) {
      let collectionHandle: string | null = null

      // Try query string format first: /products?collection=handle
      const queryMatch = item.url.match(/[?&]collection=([^&]+)/)
      if (queryMatch) {
        collectionHandle = queryMatch[1]
      } else {
        // Try simple path format: /flagpoles -> flagpoles
        const pathMatch = item.url.match(/^\/([^/?]+)/)
        if (pathMatch) {
          collectionHandle = pathMatch[1]
        }
      }

      if (collectionHandle) {
        const collectionData = await getCollectionWithProducts(collectionHandle, 8)
        if (collectionData) {
          megaMenuData[collectionHandle] = collectionData
        }
      }
    }
  }

  return <HeaderClient menuData={menuData} megaMenuData={megaMenuData} />
}
