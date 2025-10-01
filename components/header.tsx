import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts } from "@/lib/shopify/catalog"
import { HeaderClient } from "@/components/header-client"

export async function Header() {
  const menuData = await getMenu("headless-menu")

  const megaMenuData: Record<string, any> = {}

  if (menuData?.items) {
    console.log(
      "[v0] Menu items:",
      menuData.items.map((item) => ({ title: item.title, url: item.url })),
    )

    for (const item of menuData.items) {
      console.log(`[v0] Checking menu item: ${item.title}, URL: ${item.url}`)

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
        console.log(`[v0] Fetching collection: ${collectionHandle} for menu item: ${item.title}`)
        try {
          const collectionData = await getCollectionWithProducts(collectionHandle, 3)
          console.log(
            `[v0] Collection ${collectionHandle} has ${collectionData?.products?.nodes?.length || 0} products`,
          )
          if (collectionData?.products?.nodes) {
            console.log(`[v0] First product image:`, collectionData.products.nodes[0]?.featuredImage?.url)
          }
          if (collectionData) {
            megaMenuData[collectionHandle] = collectionData
          }
        } catch (error) {
          console.error(`[v0] Failed to fetch collection ${collectionHandle}:`, error)
        }
      } else {
        console.log(`[v0] No collection match for URL: ${item.url}`)
      }
    }
  }

  console.log("[v0] Final megaMenuData keys:", Object.keys(megaMenuData))

  return <HeaderClient menuData={menuData} megaMenuData={megaMenuData} />
}
