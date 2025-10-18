import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts } from "@/lib/shopify/catalog"
import { getProducts } from "@/lib/shopify"

export interface DiagnosticResult {
  status: "success" | "warning" | "error"
  message: string
  details?: string
  timestamp: number
}

export interface DiagnosticReport {
  apiHealth: {
    shopifyConnection: DiagnosticResult
    menuFetch: DiagnosticResult
    productFetch: DiagnosticResult
    collectionFetch: DiagnosticResult
  }
  collections: {
    name: string
    handle: string
    status: "exists" | "missing"
    productCount?: number
    message: string
  }[]
  performance: {
    totalLoadTime: number
    apiCallCount: number
    cacheHitRate: number
    recommendations: string[]
  }
  siteStructure: {
    totalMenuItems: number
    megaMenus: number
    totalProducts: number
    missingCollections: number
  }
  recommendations: {
    priority: "high" | "medium" | "low"
    category: string
    issue: string
    solution: string
  }[]
}

export async function runDiagnostics(): Promise<DiagnosticReport> {
  const startTime = Date.now()
  let apiCallCount = 0

  const report: DiagnosticReport = {
    apiHealth: {
      shopifyConnection: {
        status: "success",
        message: "Not tested",
        timestamp: Date.now(),
      },
      menuFetch: {
        status: "success",
        message: "Not tested",
        timestamp: Date.now(),
      },
      productFetch: {
        status: "success",
        message: "Not tested",
        timestamp: Date.now(),
      },
      collectionFetch: {
        status: "success",
        message: "Not tested",
        timestamp: Date.now(),
      },
    },
    collections: [],
    performance: {
      totalLoadTime: 0,
      apiCallCount: 0,
      cacheHitRate: 0,
      recommendations: [],
    },
    siteStructure: {
      totalMenuItems: 0,
      megaMenus: 0,
      totalProducts: 0,
      missingCollections: 0,
    },
    recommendations: [],
  }

  // Test Shopify Connection
  try {
    const testProducts = await getProducts({ first: 1 })
    apiCallCount++
    report.apiHealth.shopifyConnection = {
      status: "success",
      message: "Shopify API connection successful",
      details: `Retrieved ${testProducts?.length || 0} products`,
      timestamp: Date.now(),
    }
  } catch (error) {
    report.apiHealth.shopifyConnection = {
      status: "error",
      message: "Failed to connect to Shopify API",
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    }
    report.recommendations.push({
      priority: "high",
      category: "API Connection",
      issue: "Cannot connect to Shopify API",
      solution: "Check environment variables: SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    })
  }

  // Test Menu Fetch
  try {
    const menu = await getMenu("ultimate-menu")
    apiCallCount++
    if (menu?.items) {
      report.apiHealth.menuFetch = {
        status: "success",
        message: "Menu fetch successful",
        details: `Found ${menu.items.length} menu items`,
        timestamp: Date.now(),
      }
      report.siteStructure.totalMenuItems = menu.items.length
      report.siteStructure.megaMenus = menu.items.filter((item) => item.items && item.items.length > 0).length
    } else {
      report.apiHealth.menuFetch = {
        status: "warning",
        message: "Menu exists but has no items",
        timestamp: Date.now(),
      }
    }
  } catch (error) {
    report.apiHealth.menuFetch = {
      status: "error",
      message: "Failed to fetch menu",
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    }
  }

  // Test Product Fetch
  try {
    const products = await getProducts({ first: 10 })
    apiCallCount++
    report.apiHealth.productFetch = {
      status: "success",
      message: "Product fetch successful",
      details: `Retrieved ${products?.length || 0} products`,
      timestamp: Date.now(),
    }
    report.siteStructure.totalProducts = products?.length || 0
  } catch (error) {
    report.apiHealth.productFetch = {
      status: "error",
      message: "Failed to fetch products",
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    }
  }

  // Test Collections
  const collectionsToTest = [
    { name: "NFL Flags", handle: "nfl-flags" },
    { name: "Christmas Trees", handle: "led-flagpole-christmas-trees" },
    { name: "Telescoping Flagpoles", handle: "telescoping-flagpoles" },
    { name: "Aluminum Flagpoles", handle: "aluminum-flagpoles" },
    { name: "American Flags", handle: "american-flags" },
    { name: "State Flags", handle: "state-flags" },
    { name: "Flagpole Christmas Trees", handle: "flagpole-christmas-trees" },
    { name: "Warm White Trees", handle: "warm-white-flagpole-trees" },
    { name: "Multicolor Trees", handle: "multicolor-flagpole-trees" },
    { name: "Smart Magic Trees", handle: "smart-magic-flagpole-trees" },
    { name: "Best Selling Trees", handle: "best-selling-christmas-trees" },
    { name: "Tree Accessories", handle: "flagpole-tree-accessories" },
  ]

  for (const collection of collectionsToTest) {
    try {
      const result = await getCollectionWithProducts(collection.handle, 1)
      apiCallCount++
      if (result?.products?.nodes && result.products.nodes.length > 0) {
        report.collections.push({
          name: collection.name,
          handle: collection.handle,
          status: "exists",
          productCount: result.products.nodes.length,
          message: `Collection exists with products`,
        })
      } else {
        report.collections.push({
          name: collection.name,
          handle: collection.handle,
          status: "missing",
          message: "Collection not found or has no products",
        })
        report.siteStructure.missingCollections++
        report.recommendations.push({
          priority: "medium",
          category: "Collections",
          issue: `Collection "${collection.name}" (${collection.handle}) is missing`,
          solution: `Create collection in Shopify admin or update menu to use existing collection handle`,
        })
      }
    } catch (error) {
      report.collections.push({
        name: collection.name,
        handle: collection.handle,
        status: "missing",
        message: error instanceof Error ? error.message : "Error checking collection",
      })
      report.siteStructure.missingCollections++
    }
  }

  report.apiHealth.collectionFetch = {
    status: report.siteStructure.missingCollections > 0 ? "warning" : "success",
    message: `${report.collections.filter((c) => c.status === "exists").length}/${collectionsToTest.length} collections found`,
    details: `${report.siteStructure.missingCollections} collections missing`,
    timestamp: Date.now(),
  }

  // Performance Analysis
  const endTime = Date.now()
  report.performance.totalLoadTime = endTime - startTime
  report.performance.apiCallCount = apiCallCount

  if (report.performance.totalLoadTime > 3000) {
    report.performance.recommendations.push("Load time exceeds 3 seconds - consider implementing caching")
    report.recommendations.push({
      priority: "high",
      category: "Performance",
      issue: "Slow API response times",
      solution: "Implement Redis caching or increase cache duration for frequently accessed data",
    })
  }

  if (apiCallCount > 15) {
    report.performance.recommendations.push("High number of API calls - optimize with batching or caching")
    report.recommendations.push({
      priority: "medium",
      category: "Performance",
      issue: `Making ${apiCallCount} API calls during diagnostics`,
      solution: "Reduce API calls by batching requests or using GraphQL fragments",
    })
  }

  if (report.siteStructure.missingCollections > 5) {
    report.recommendations.push({
      priority: "high",
      category: "Site Structure",
      issue: `${report.siteStructure.missingCollections} collections are missing`,
      solution: "Create missing collections in Shopify or update menu links to existing collections",
    })
  }

  // Additional recommendations
  if (report.siteStructure.totalProducts < 10) {
    report.recommendations.push({
      priority: "medium",
      category: "Content",
      issue: "Low product count detected",
      solution: "Add more products to your Shopify store to populate mega menus",
    })
  }

  return report
}
