import { NextResponse } from "next/server"
import { performanceTracker, cacheMetrics } from "@/lib/performance"

export const dynamic = "force-dynamic"

export async function GET() {
  const summary = performanceTracker.getSummary()
  const cacheStats = cacheMetrics.getStats()

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    performance: summary,
    cache: cacheStats,
    recommendations: generateRecommendations(summary, cacheStats),
  })
}

function generateRecommendations(
  summary: ReturnType<typeof performanceTracker.getSummary>,
  cacheStats: ReturnType<typeof cacheMetrics.getStats>,
): string[] {
  const recommendations: string[] = []

  // Check for slow operations
  if (summary.slowOperations.length > 0) {
    recommendations.push(
      `${summary.slowOperations.length} slow operations detected (>1000ms). Consider optimizing these queries or adding caching.`,
    )
  }

  // Check cache hit rate
  if (cacheStats.total > 10 && cacheStats.hitRate < 50) {
    recommendations.push(
      `Cache hit rate is ${cacheStats.hitRate.toFixed(1)}%. Consider increasing cache duration or improving cache key strategy.`,
    )
  }

  // Check average durations
  Object.entries(summary.averages).forEach(([name, avg]) => {
    if (avg > 500) {
      recommendations.push(`"${name}" operations average ${avg.toFixed(0)}ms. Consider optimization.`)
    }
  })

  if (recommendations.length === 0) {
    recommendations.push("All performance metrics are within acceptable ranges.")
  }

  return recommendations
}
