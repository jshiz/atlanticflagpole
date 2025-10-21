import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  // Check admin authentication
  const cookieStore = await cookies()
  const adminToken = cookieStore.get("admin_token")

  if (!adminToken || adminToken.value !== "admin_authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { url } = await request.json()

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"
    const fullUrl = `${siteUrl}${url}`

    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(fullUrl)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile${apiKey ? `&key=${apiKey}` : ""}`

    console.log("[v0] Running Lighthouse test for:", fullUrl)

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`PageSpeed API returned ${response.status}`)
    }

    const data = await response.json()

    // Extract Lighthouse scores from the response
    const lighthouseResult = data.lighthouseResult
    const categories = lighthouseResult.categories

    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      recommendations: [],
      metrics: {
        fcp: lighthouseResult.audits["first-contentful-paint"]?.displayValue || "N/A",
        lcp: lighthouseResult.audits["largest-contentful-paint"]?.displayValue || "N/A",
        tbt: lighthouseResult.audits["total-blocking-time"]?.displayValue || "N/A",
        cls: lighthouseResult.audits["cumulative-layout-shift"]?.displayValue || "N/A",
        si: lighthouseResult.audits["speed-index"]?.displayValue || "N/A",
      },
    }

    // Extract top recommendations from audits
    const audits = lighthouseResult.audits
    const recommendations: any[] = []

    // Get opportunities (things that can improve performance)
    Object.entries(audits).forEach(([key, audit]: [string, any]) => {
      if (audit.score !== null && audit.score < 0.9 && audit.details?.overallSavingsMs > 100) {
        recommendations.push({
          title: audit.title,
          description: audit.description,
          savings: audit.displayValue || `${Math.round(audit.details.overallSavingsMs / 1000)}s`,
        })
      }
    })

    // Sort by potential savings and take top 5
    scores.recommendations = recommendations.slice(0, 5)

    console.log("[v0] Lighthouse test completed:", scores)

    return NextResponse.json(scores)
  } catch (error) {
    console.error("[v0] Lighthouse API error:", error)
    return NextResponse.json({ error: "Failed to run Lighthouse test. Please try again." }, { status: 500 })
  }
}
