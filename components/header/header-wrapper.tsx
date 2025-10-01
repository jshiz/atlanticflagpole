import { getMenuWithNormalizedUrls, getCollectionWithProducts } from "@/lib/shopify/catalog"
import { Header } from "./header-client"

export async function HeaderWrapper() {
  let menuData = null
  const collectionsData: Record<string, any> = {}

  try {
    menuData = await getMenuWithNormalizedUrls("main-menu")

    if (!menuData) {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      console.log("⚠️  MENU NOT FOUND IN SHOPIFY")
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      console.log("")
      console.log("Your menu links are using a fallback menu structure.")
      console.log("")
      console.log("To fix this:")
      console.log("1. Go to Shopify Admin → Online Store → Navigation")
      console.log("2. Create a new menu called 'main-menu' (exact name)")
      console.log("3. Add menu items that link to your collections")
      console.log("")
      console.log("For detailed instructions, visit: /debug-menu")
      console.log("")
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    } else {
      console.log("[v0] ✓ Successfully loaded Shopify menu with", menuData.items?.length || 0, "items")
    }

    // Fetch featured products for key collections to show in megamenus
    const collectionHandles = ["flagpoles", "flags", "accessories", "holiday-seasonal"]

    await Promise.all(
      collectionHandles.map(async (handle) => {
        try {
          const collection = await getCollectionWithProducts(handle, 4)
          if (collection) {
            collectionsData[handle] = collection
            console.log(`[v0] ✓ Loaded collection: ${handle} (${collection.products?.nodes?.length || 0} products)`)
          } else {
            console.log(`[v0] ⚠️  Collection not found: ${handle}`)
            console.log(`[v0]    Create this collection in Shopify Admin → Products → Collections`)
          }
        } catch (error) {
          console.error(`[v0] ✗ Error fetching collection ${handle}:`, error)
          console.log(`[v0]    This collection may not exist in your Shopify store`)
        }
      }),
    )
  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.error("❌ ERROR LOADING MENU")
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.error(error)
    console.error("")
    console.error("Possible causes:")
    console.error("• Shopify store domain is incorrect")
    console.error("• Shopify API token is missing or invalid")
    console.error("• Network connection issue")
    console.error("")
    console.error("Check your environment variables:")
    console.error("• NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN")
    console.error("• SHOPIFY_STOREFRONT_TOKEN")
    console.error("")
    console.error("For help, visit: /debug-menu")
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  }

  return <Header menuData={menuData} collectionsData={collectionsData} />
}
