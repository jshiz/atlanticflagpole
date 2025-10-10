import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts, searchProducts } from "@/lib/shopify/catalog"
import { HeaderClient } from "@/components/header-client"
import { getProducts } from "@/lib/shopify"

function extractCollectionHandle(url: string): string | null {
  // Try to extract from /collections/handle format
  const match = url.match(/\/collections\/([^/?]+)/)
  return match ? match[1] : null
}

export async function Header() {
  const menuData = await getMenu("ultimate-menu")

  const megaMenuData: Record<string, any> = {}
  const submenuProductsData: Record<string, any[]> = {}

  let nflFlagProducts: any[] = []
  try {
    const products = await getProducts({
      first: 12,
      query: "tag:nfl-flags",
    })
    nflFlagProducts = products || []
    console.log(`[v0] ✅ Found ${nflFlagProducts.length} NFL flag products`)
  } catch (error) {
    console.error("[v0] ❌ Error fetching NFL flag products:", error)
  }

  let christmasTreeProducts: any[] = []
  try {
    const products = await getProducts({
      first: 8,
      query: "tag:Christmas Tree",
    })
    christmasTreeProducts = products || []
    console.log(`[v0] ✅ Found ${christmasTreeProducts.length} Christmas tree products`)
  } catch (error) {
    console.error("[v0] ❌ Error fetching Christmas tree products:", error)
  }

  const christmasCollections = [
    "flagpole-christmas-trees",
    "warm-white-flagpole-trees",
    "multicolor-flagpole-trees",
    "smart-magic-flagpole-trees",
    "best-selling-christmas-trees",
    "flagpole-tree-accessories",
  ]

  for (const collectionHandle of christmasCollections) {
    try {
      const collection = await getCollectionWithProducts(collectionHandle, 4)
      if (collection?.products?.nodes && collection.products.nodes.length > 0) {
        submenuProductsData[collectionHandle] = collection.products.nodes
        console.log(
          `[v0] ✅ Found ${collection.products.nodes.length} products for Christmas collection "${collectionHandle}"`,
        )
      }
    } catch (error) {
      console.error(`[v0] ❌ Error fetching Christmas collection "${collectionHandle}":`, error)
    }
  }

  if (menuData?.items) {
    for (const item of menuData.items) {
      const title = item.title.toLowerCase()

      if (title.includes("christmas") && title.includes("tree")) {
        console.log(`[v0] ⏭️ Skipping "${item.title}" - using dedicated Christmas tree mega menu`)
        continue
      }

      if (item.items && item.items.length > 0) {
        for (const subItem of item.items) {
          const collectionHandle = extractCollectionHandle(subItem.url)
          if (collectionHandle) {
            try {
              const collection = await getCollectionWithProducts(collectionHandle, 4)
              if (collection?.products?.nodes && collection.products.nodes.length > 0) {
                submenuProductsData[subItem.id] = collection.products.nodes
                console.log(
                  `[v0] ✅ Found ${collection.products.nodes.length} products for submenu "${subItem.title}" (${collectionHandle})`,
                )
              }
            } catch (error) {
              console.log(`[v0] ⚠️ Could not fetch products for submenu "${subItem.title}"`)
            }
          }
        }
      }

      let collectionConfig: Array<{ handle: string; tags: string[] }> = []

      if (title.includes("flagpole") && !title.includes("kit")) {
        collectionConfig = [
          { handle: "telescoping-flagpoles", tags: ["telescoping", "telescoping flagpole"] },
          { handle: "aluminum-flagpoles", tags: ["aluminum", "aluminum flagpole", "Aluminum Flagpoles"] },
        ]
      } else if (title.includes("kit") || title.includes("bundle")) {
        collectionConfig = [
          { handle: "flagpole-kits", tags: ["kit", "bundle", "flagpole kit"] },
          { handle: "presidential-package", tags: ["presidential", "premium", "deluxe"] },
        ]
      } else if (title.includes("flag") && !title.includes("flagpole")) {
        collectionConfig = [
          { handle: "american-flags", tags: ["american flag", "usa flag", "us flag"] },
          { handle: "state-flags", tags: ["state flag", "state"] },
        ]
      } else if (title.includes("accessor")) {
        collectionConfig = [
          { handle: "flagpole-lighting", tags: ["light", "lighting", "solar light", "led light"] },
          { handle: "flagpole-mounts", tags: ["mount", "bracket", "wall mount"] },
          { handle: "flagpole-toppers", tags: ["topper", "finial", "eagle", "ball"] },
        ]
      } else if (title.includes("holiday") || title.includes("seasonal")) {
        collectionConfig = [
          {
            handle: "holiday-seasonal",
            tags: [
              "holiday",
              "seasonal",
              "christmas",
              "halloween",
              "thanksgiving",
              "easter",
              "4th of july",
              "memorial day",
              "veterans day",
              "patriotic",
            ],
          },
        ]
      }

      if (collectionConfig.length > 0) {
        const allProducts: any[] = []

        for (const config of collectionConfig) {
          try {
            const collection = await getCollectionWithProducts(config.handle, 2)
            if (collection?.products?.nodes && collection.products.nodes.length > 0) {
              allProducts.push(...collection.products.nodes)
              console.log(
                `[v0] ✅ Found ${collection.products.nodes.length} products from collection "${config.handle}" for "${item.title}"`,
              )
            } else {
              console.log(`[v0] 🔄 Collection "${config.handle}" not found, trying tag-based search...`)

              for (const tag of config.tags) {
                const tagResults = await searchProducts({ tag, first: 2 })
                if (tagResults?.nodes && tagResults.nodes.length > 0) {
                  allProducts.push(...tagResults.nodes)
                  console.log(`[v0] ✅ Found ${tagResults.nodes.length} products with tag "${tag}" for "${item.title}"`)
                  break
                }
              }
            }
          } catch (error) {
            console.error(`[v0] ❌ Error fetching products for "${config.handle}":`, error)
          }
        }

        if (allProducts.length > 0) {
          const uniqueProducts = Array.from(new Map(allProducts.map((p) => [p.id, p])).values())

          megaMenuData[item.id] = {
            products: {
              nodes: uniqueProducts.slice(0, 4),
            },
          }
          console.log(`[v0] ✅ Total ${uniqueProducts.length} unique products for "${item.title}" megamenu`)
        } else {
          console.log(`[v0] ⚠️ No products found for "${item.title}"`)
        }
      }
    }
  }

  return (
    <HeaderClient
      menuData={menuData}
      megaMenuData={megaMenuData}
      submenuProductsData={submenuProductsData}
      nflFlagProducts={nflFlagProducts}
      christmasTreeProducts={christmasTreeProducts}
    />
  )
}
