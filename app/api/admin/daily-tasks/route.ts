import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Fetch real stats from various sources
    const [statsRes, inventoryRes, productsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/stats`).catch(() => null),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/inventory?threshold=10`).catch(() => null),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/products`).catch(() => null),
    ])

    const stats = statsRes?.ok ? await statsRes.json() : null
    const inventory = inventoryRes?.ok ? await inventoryRes.json() : null
    const products = productsRes?.ok ? await productsRes.json() : null

    const tasks = []

    // Task 1: Check inventory alerts
    if (inventory?.items) {
      const criticalCount = inventory.items.filter((i: any) => i.status === "critical").length
      const lowCount = inventory.items.filter((i: any) => i.status === "low").length

      if (criticalCount > 0) {
        tasks.push({
          priority: "high",
          task: "Restock Out-of-Stock Products",
          description: `${criticalCount} products are completely out of stock. Update inventory or mark as unavailable to prevent customer disappointment.`,
          metric: `${criticalCount} products`,
          action: "Go to Inventory page to review and restock",
          link: "/admin/inventory",
        })
      }

      if (lowCount > 0) {
        tasks.push({
          priority: "medium",
          task: "Review Low Stock Items",
          description: `${lowCount} products are running low on inventory. Consider reordering to prevent stockouts.`,
          metric: `${lowCount} products`,
          action: "Check inventory levels and place orders",
          link: "/admin/inventory",
        })
      }
    }

    // Task 2: Check for products without SEO
    if (products?.products) {
      const missingSEO = products.products.filter(
        (p: any) => !p.seo?.title || !p.seo?.description || p.seo.title.length > 60 || p.seo.description.length > 160,
      ).length

      if (missingSEO > 0) {
        tasks.push({
          priority: "medium",
          task: "Optimize Product SEO",
          description: `${missingSEO} products have missing or poorly optimized meta titles/descriptions. This affects search rankings and click-through rates.`,
          metric: `${missingSEO} products`,
          action: "Use SEO Bulk Editor to add meta titles and descriptions",
          link: "/admin/seo",
        })
      }
    }

    // Task 3: Check recent orders and sales trends
    if (stats?.recentOrders) {
      const last7Days = stats.recentOrders.filter((order: any) => {
        const orderDate = new Date(order.createdAt)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return orderDate >= weekAgo
      }).length

      if (last7Days < 5) {
        tasks.push({
          priority: "high",
          task: "Boost Sales Activity",
          description: `Only ${last7Days} orders in the past 7 days. Consider running a promotion, updating homepage banners, or sending email campaigns.`,
          metric: `${last7Days} orders this week`,
          action: "Create discount codes or update promotional content",
          link: "/admin/dashboard",
        })
      }
    }

    // Task 4: Performance optimization
    tasks.push({
      priority: "low",
      task: "Run Lighthouse Performance Test",
      description:
        "Regular performance testing helps identify optimization opportunities and maintain fast load times for better user experience and SEO.",
      metric: "Last tested: Today",
      action: "Run tests on key pages (Home, Products, Collections)",
      link: "/admin/analytics",
    })

    // Task 5: Content freshness
    tasks.push({
      priority: "low",
      task: "Update Blog Content",
      description:
        "Fresh content improves SEO and keeps customers engaged. Consider writing about seasonal products, installation guides, or customer stories.",
      metric: "Content marketing",
      action: "Create new blog post or update existing content",
      link: "/admin/blog",
    })

    // Task 6: Check for draft products
    if (products?.products) {
      const draftCount = products.products.filter((p: any) => p.status === "DRAFT").length

      if (draftCount > 0) {
        tasks.push({
          priority: "low",
          task: "Review Draft Products",
          description: `${draftCount} products are in draft status. Review and publish them to make them available for customers.`,
          metric: `${draftCount} drafts`,
          action: "Review draft products and publish when ready",
          link: "/admin/products",
        })
      }
    }

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("[v0] Failed to generate daily tasks:", error)
    return NextResponse.json({ tasks: [] })
  }
}
