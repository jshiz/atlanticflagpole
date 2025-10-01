import { getMenuWithNormalizedUrls } from "@/lib/shopify/catalog"
import { searchProducts } from "@/lib/shopify/catalog"
import { Header } from "./header-client"

export async function HeaderWrapper() {
  let menuData = null
  const collectionsData: Record<string, any> = {}

  try {
    menuData = await getMenuWithNormalizedUrls("main-menu")

    // Fetch products for Flagpoles menu
    const flagpoleTags = ["telescoping-flag-pole", "american-made-flagpole", "flagpole", "best-flag-pole"]
    for (const tag of flagpoleTags) {
      const results = await searchProducts({ tag, first: 6 })
      if (results?.nodes?.length > 0) {
        collectionsData["flagpoles"] = { products: results }
        console.log(`[v0] ✓ Loaded ${results.nodes.length} products for Flagpoles menu using tag: ${tag}`)
        break
      }
    }

    // Fetch products for Flags menu
    const flagTags = ["american-flag", "15-star-flag", "historical-flag", "flag"]
    for (const tag of flagTags) {
      const results = await searchProducts({ tag, first: 6 })
      if (results?.nodes?.length > 0) {
        collectionsData["flags"] = { products: results }
        console.log(`[v0] ✓ Loaded ${results.nodes.length} products for Flags menu using tag: ${tag}`)
        break
      }
    }

    // Fetch products for Accessories menu
    const accessoryTags = ["flagpole-accessories", "toppers", "lighting", "mounts"]
    for (const tag of accessoryTags) {
      const results = await searchProducts({ tag, first: 6 })
      if (results?.nodes?.length > 0) {
        collectionsData["accessories"] = { products: results }
        console.log(`[v0] ✓ Loaded ${results.nodes.length} products for Accessories menu using tag: ${tag}`)
        break
      }
    }

    // Fetch products for Holiday menu
    const holidayTags = ["holiday-flag", "specialty-flag", "christmas", "halloween"]
    for (const tag of holidayTags) {
      const results = await searchProducts({ tag, first: 6 })
      if (results?.nodes?.length > 0) {
        collectionsData["holiday"] = { products: results }
        console.log(`[v0] ✓ Loaded ${results.nodes.length} products for Holiday menu using tag: ${tag}`)
        break
      }
    }

    // Also try to fetch products for specific subcategories
    const specificTags = {
      telescoping: ["telescoping-flag-pole", "telescoping"],
      aluminum: ["aluminum-flagpole", "aluminum"],
      indoor: ["indoor-flagpole", "indoor"],
      "american-flag": ["american-flag", "usa-flag"],
      "state-flag": ["state-flag"],
      military: ["military-flag", "naval-history"],
      lighting: ["flagpole-lighting", "lighting"],
      toppers: ["flagpole-toppers", "toppers", "gold-eagle-topper"],
    }

    for (const [key, tags] of Object.entries(specificTags)) {
      for (const tag of tags) {
        const results = await searchProducts({ tag, first: 6 })
        if (results?.nodes?.length > 0) {
          collectionsData[key] = { products: results }
          console.log(`[v0] ✓ Loaded ${results.nodes.length} products for ${key} using tag: ${tag}`)
          break
        }
      }
    }

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
