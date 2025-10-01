import { getMenuWithNormalizedUrls } from "@/lib/shopify/catalog"
import { searchProducts } from "@/lib/shopify/catalog"
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

    console.log("[v0] 🔍 Fetching all products to check what's available...")
    const allProducts = await searchProducts({ first: 250 })
    console.log(`[v0] 📦 Total products found: ${allProducts?.nodes?.length || 0}`)

    if (allProducts?.nodes && allProducts.nodes.length > 0) {
      // Log first few products to see their structure
      console.log("[v0] 📋 Sample products:")
      allProducts.nodes.slice(0, 3).forEach((product: any) => {
        console.log(`  - ${product.title}`)
        console.log(`    Tags: ${product.tags?.join(", ") || "none"}`)
        console.log(`    Handle: ${product.handle}`)
      })
    }

    const productTags = [
      "telescoping",
      "aluminum",
      "indoor",
      "commercial",
      "residential",
      "american-flag",
      "state-flag",
      "military",
      "lighting",
      "mounts",
      "toppers",
      "christmas",
      "halloween",
      "patriotic",
    ]

    console.log("[v0] 🏷️  Searching for products by tags...")
    await Promise.all(
      productTags.map(async (tag) => {
        try {
          const results = await searchProducts({ tag, first: 6 })
          if (results && results.nodes && results.nodes.length > 0) {
            collectionsData[tag] = { products: results }
            console.log(`[v0] ✓ Loaded products for tag: ${tag} (${results.nodes.length} products)`)
          } else {
            console.log(`[v0] ⚠️  No products found for tag: ${tag}`)
          }
        } catch (error) {
          console.error(`[v0] ✗ Error fetching products for tag ${tag}:`, error)
        }
      }),
    )

    // Also fetch general products for main categories
    const mainCategories = ["flagpoles", "flags", "accessories", "holiday"]
    await Promise.all(
      mainCategories.map(async (tag) => {
        try {
          const results = await searchProducts({ tag, first: 6 })
          if (results && results.nodes && results.nodes.length > 0) {
            collectionsData[tag] = { products: results }
            console.log(`[v0] ✓ Loaded products for category: ${tag} (${results.nodes.length} products)`)
          }
        } catch (error) {
          console.error(`[v0] ✗ Error fetching products for category ${tag}:`, error)
        }
      }),
    )

    console.log("[v0] 📊 Final collectionsData keys:", Object.keys(collectionsData))
    console.log("[v0] 📊 Total collections with products:", Object.keys(collectionsData).length)
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
