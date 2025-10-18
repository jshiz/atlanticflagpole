import { NextResponse } from "next/server"
import { getProducts } from "@/lib/shopify"
import { getMenu } from "@/lib/menus"
import { getCollectionWithProducts } from "@/lib/shopify/catalog"

export const dynamic = "force-dynamic"

export async function GET() {
  const startTime = Date.now()
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    checks: {
      shopify: { status: "unknown", responseTime: 0, error: null as string | null },
      menu: { status: "unknown", responseTime: 0, error: null as string | null },
      collections: { status: "unknown", responseTime: 0, error: null as string | null },
    },
    performance: {
      totalResponseTime: 0,
      apiCallCount: 0,
    },
  }

  let apiCallCount = 0

  // Check Shopify API
  try {
    const checkStart = Date.now()
    const products = await getProducts({ first: 1 })
    apiCallCount++
    health.checks.shopify = {
      status: products && products.length > 0 ? "healthy" : "degraded",
      responseTime: Date.now() - checkStart,
      error: null,
    }
  } catch (error) {
    health.checks.shopify = {
      status: "unhealthy",
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : "Unknown error",
    }
    health.status = "unhealthy"
  }

  // Check Menu API
  try {
    const checkStart = Date.now()
    const menu = await getMenu("ultimate-menu")
    apiCallCount++
    health.checks.menu = {
      status: menu?.items ? "healthy" : "degraded",
      responseTime: Date.now() - checkStart,
      error: null,
    }
  } catch (error) {
    health.checks.menu = {
      status: "unhealthy",
      responseTime: Date.now() - startTime, // Updated to use startTime instead of undeclared checkStart
      error: error instanceof Error ? error.message : "Unknown error",
    }
    health.status = "unhealthy"
  }

  // Check Collections API
  try {
    const checkStart = Date.now()
    const collection = await getCollectionWithProducts("telescoping-flagpoles", 1)
    apiCallCount++
    health.checks.collections = {
      status: collection?.products?.nodes ? "healthy" : "degraded",
      responseTime: Date.now() - checkStart,
      error: null,
    }
  } catch (error) {
    health.checks.collections = {
      status: "unhealthy",
      responseTime: Date.now() - startTime, // Updated to use startTime instead of undeclared checkStart
      error: error instanceof Error ? error.message : "Unknown error",
    }
    if (health.status === "healthy") {
      health.status = "degraded"
    }
  }

  health.performance.totalResponseTime = Date.now() - startTime
  health.performance.apiCallCount = apiCallCount

  const statusCode = health.status === "healthy" ? 200 : health.status === "degraded" ? 207 : 503

  return NextResponse.json(health, { status: statusCode })
}
