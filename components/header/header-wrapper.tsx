import { searchProducts } from "@/lib/shopify/catalog"
import { Header } from "./header-client"
import { getMenu } from "@/lib/menus"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function HeaderWrapper() {
  const collectionsData: Record<string, { products: { nodes: any[] } }> = {}

  let menuData = null
  try {
    const menuHandle = "headless-menu"
    menuData = await getMenu(menuHandle)
    if (menuData) {
      console.log(`[v0] ✅ Successfully loaded ${menuHandle} from Shopify with ${menuData.items.length} items`)
    } else {
      console.error(`[v0] ⚠️ USING FALLBACK MENU - ${menuHandle} not found in Shopify`)
    }
  } catch (error) {
    console.error("[v0] ❌ Error fetching headless-menu:", error)
  }

  try {
    const allProductsResult = await searchProducts({ first: 250 })
    const allProducts = allProductsResult?.nodes || []

    const filterByTag = (products: any[], searchTags: string[]) => {
      return products.filter((product) => {
        const productTags = product.tags || []
        return searchTags.some((searchTag) =>
          productTags.some((tag: string) => tag.toLowerCase().includes(searchTag.toLowerCase())),
        )
      })
    }

    const flagpoleProducts = filterByTag(allProducts, [
      "flagpole",
      "flag-pole",
      "telescoping",
      "aluminum",
      "pole",
      "kit",
    ])
    if (flagpoleProducts.length > 0) {
      collectionsData["flagpoles"] = { products: { nodes: flagpoleProducts.slice(0, 8) } }
    }

    const flagProducts = filterByTag(allProducts, ["american-flag", "flag", "star-flag", "banner", "nylon", "stripes"])
    if (flagProducts.length > 0) {
      collectionsData["flags"] = { products: { nodes: flagProducts.slice(0, 8) } }
    }

    const accessoryProducts = filterByTag(allProducts, [
      "topper",
      "lighting",
      "mount",
      "hardware",
      "replacement",
      "eagle",
      "ball",
    ])
    if (accessoryProducts.length > 0) {
      collectionsData["accessories"] = { products: { nodes: accessoryProducts.slice(0, 8) } }
    }

    const holidayProducts = filterByTag(allProducts, ["holiday", "christmas", "halloween", "seasonal", "19th-hole"])
    if (holidayProducts.length > 0) {
      collectionsData["holiday"] = { products: { nodes: holidayProducts.slice(0, 8) } }
    }

    const subcategories = {
      telescoping: ["telescoping"],
      aluminum: ["aluminum"],
      indoor: ["indoor"],
      commercial: ["commercial"],
      residential: ["residential"],
      "american-flag": ["american-flag", "american"],
      "state-flag": ["state"],
      military: ["military", "naval", "navy", "marine"],
      international: ["international"],
      custom: ["custom"],
      lighting: ["lighting", "light"],
      mounts: ["mount"],
      toppers: ["topper", "eagle", "ball"],
      hardware: ["hardware", "replacement"],
      maintenance: ["maintenance"],
      christmas: ["christmas"],
      halloween: ["halloween"],
      patriotic: ["patriotic", "independence", "memorial", "veterans"],
      seasonal: ["seasonal"],
    }

    for (const [key, searchTags] of Object.entries(subcategories)) {
      const products = filterByTag(allProducts, searchTags)
      if (products.length > 0) {
        collectionsData[key] = { products: { nodes: products.slice(0, 6) } }
      }
    }
  } catch (error) {
    console.error("[v0] ❌ ERROR in HeaderWrapper:", error)
  }

  return <Header menuData={menuData} collectionsData={collectionsData} />
}
