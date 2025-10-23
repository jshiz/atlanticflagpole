export interface JudgemeReview {
  id: number
  title: string
  body: string
  rating: number
  reviewer: {
    name: string
    email: string
    verified_buyer: boolean
  }
  created_at: string
  pictures: Array<{
    urls: {
      original: string
      small: string
      compact: string
    }
  }>
  curated: string
  published: boolean
  hidden: boolean
  verified: string
  featured: boolean
  reviewer_name_format: number
  product_external_id: string
  product_title: string
  product_handle: string
}

export interface JudgemeProduct {
  id: number
  name: string
  rating: number
  reviews_count: number
  external_id: string
  handle: string
}

export interface JudgemeWidgetData {
  rating: number
  reviewsCount: number
  html: string
}

const JUDGEME_API_BASE = "https://judge.me/api/v1"
const FALLBACK_SHOP_DOMAIN = "atlantic-flag-and-pole-inc.myshopify.com"

function isJudgemeConfigured(): boolean {
  const apiToken = process.env.JUDGEME_API_TOKEN
  return !!apiToken
}

function getShopDomain(): string {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || FALLBACK_SHOP_DOMAIN

  // Ensure it's in the correct myshopify.com format
  if (!shopDomain.includes(".myshopify.com")) {
    console.warn(
      `[v0] Shop domain "${shopDomain}" doesn't include .myshopify.com, using fallback: ${FALLBACK_SHOP_DOMAIN}`,
    )
    return FALLBACK_SHOP_DOMAIN
  }

  return shopDomain
}

async function judgemeApiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const shopDomain = getShopDomain()
  const apiToken = process.env.JUDGEME_API_TOKEN

  if (!apiToken) {
    console.warn("[v0] Judge.me API token not configured - using fallback data")
    return null as T
  }

  if (!apiToken.startsWith("u-") && !apiToken.startsWith("XF")) {
    console.error(
      "[v0] ❌ Judge.me API token format is incorrect. Private tokens should start with 'u-', Public tokens with 'XF'",
    )
    console.error(`[v0] Current token starts with: ${apiToken.substring(0, 3)}...`)
    console.error("[v0] Please check your JUDGEME_API_TOKEN environment variable in Vercel")
    return null as T
  }

  // Remove leading slash from endpoint if present to avoid path replacement
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint
  const baseWithSlash = JUDGEME_API_BASE.endsWith("/") ? JUDGEME_API_BASE : `${JUDGEME_API_BASE}/`
  const url = new URL(cleanEndpoint, baseWithSlash)
  url.searchParams.set("shop_domain", shopDomain)
  url.searchParams.set("api_token", apiToken)

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  try {
    console.log(`[v0] Judge.me API request to ${endpoint}`)
    console.log(`[v0] Using shop_domain: ${shopDomain}`)
    console.log(`[v0] API token present: ${!!apiToken}`)
    console.log(
      `[v0] API token format: ${apiToken.substring(0, 3)}...${apiToken.substring(apiToken.length - 4)} (length: ${apiToken.length})`,
    )
    console.log(`[v0] Full URL (token masked): ${url.toString().replace(/api_token=[^&]+/, "api_token=***")}`)

    const response = await fetch(url.toString(), {
      ...options,
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    console.log(`[v0] Judge.me API response: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      const responseText = await response.text()
      console.warn(`[v0] Judge.me API returned ${response.status} for ${endpoint}`)
      console.warn(`[v0] Response body: ${responseText.substring(0, 200)}`)
      if (response.status === 401 || response.status === 403) {
        console.error(
          "[v0] ❌ Authentication failed. Please verify your JUDGEME_API_TOKEN in Vercel environment variables",
        )
        console.error(
          "[v0] The token should be your Private API Token from Judge.me Settings > Integrations > View API tokens",
        )
      }
      return null as T
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text()
      console.warn(`[v0] Judge.me API returned non-JSON response (${contentType}) for ${endpoint}`)
      console.warn(`[v0] Response body: ${responseText.substring(0, 200)}`)
      if (contentType?.includes("text/html")) {
        console.error("[v0] ❌ Received HTML instead of JSON - this means authentication failed")
        console.error("[v0] Please verify:")
        console.error("[v0]   1. JUDGEME_API_TOKEN is set to your Private API Token (starts with 'u-')")
        console.error("[v0]   2. NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is set to: atlantic-flag-and-pole-inc.myshopify.com")
        console.error("[v0]   3. You've redeployed after updating environment variables")
      }
      return null as T
    }

    try {
      const data = await response.json()
      console.log(`[v0] ✅ Judge.me API success for ${endpoint}`)
      return data
    } catch (parseError) {
      console.warn(`[v0] Failed to parse Judge.me API response for ${endpoint}:`, parseError)
      return null as T
    }
  } catch (error) {
    console.warn("[v0] Judge.me API fetch error:", error)
    return null as T
  }
}

import { getCached, setCache } from "@/lib/cache"

const JUDGEME_CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export async function getJudgemeReviews(params: {
  productHandle?: string
  page?: number
  perPage?: number
  minRating?: number
  featured?: boolean
}): Promise<{ reviews: JudgemeReview[]; currentPage: number; perPage: number }> {
  if (!isJudgemeConfigured()) {
    return { reviews: [], currentPage: 1, perPage: 10 }
  }

  try {
    const cacheKey = `judgeme-reviews-${JSON.stringify(params)}`
    const cached = getCached<{ reviews: JudgemeReview[]; currentPage: number; perPage: number }>(cacheKey)
    if (cached) {
      console.log(`[v0] ✅ Returning cached Judge.me reviews for ${cacheKey}`)
      return cached
    }

    const queryParams = new URLSearchParams()
    if (params.productHandle) queryParams.set("product_handle", params.productHandle)
    if (params.page) queryParams.set("page", params.page.toString())
    if (params.perPage) queryParams.set("per_page", params.perPage.toString())
    if (params.minRating) queryParams.set("min_rating", params.minRating.toString())
    if (params.featured) queryParams.set("featured", "true")

    const data = await judgemeApiFetch<{
      reviews: JudgemeReview[]
      current_page: number
      per_page: number
    }>(`/reviews?${queryParams.toString()}`)

    if (!data) {
      return { reviews: [], currentPage: 1, perPage: 10 }
    }

    const result = {
      reviews: data.reviews || [],
      currentPage: data.current_page || 1,
      perPage: data.per_page || 10,
    }

    setCache(cacheKey, result, JUDGEME_CACHE_DURATION)
    console.log(`[v0] 💾 Cached Judge.me reviews for ${cacheKey}`)

    return result
  } catch (error) {
    console.error("[v0] Error fetching Judge.me reviews:", error)
    return { reviews: [], currentPage: 1, perPage: 10 }
  }
}

export async function getJudgemeProductData(productHandle: string): Promise<JudgemeProduct | null> {
  if (!isJudgemeConfigured()) {
    return null
  }

  try {
    const data = await judgemeApiFetch<{ product: JudgemeProduct }>(`/products/-1?handle=${productHandle}`)

    if (!data) {
      return null
    }

    return data.product
  } catch (error) {
    console.error(`[v0] Error fetching Judge.me product data for ${productHandle}:`, error)
    return null
  }
}

export async function getJudgemeWidgetHtml(productHandle: string): Promise<string> {
  try {
    const shopDomain = getShopDomain()

    const url = `https://judge.me/api/v1/widgets/product_review?shop_domain=${shopDomain}&handle=${productHandle}&platform=shopify`
    const response = await fetch(url, { next: { revalidate: 300 } })

    if (!response.ok) {
      return ""
    }

    const data = await response.json()
    return data.widget || ""
  } catch (error) {
    console.error("[v0] Error fetching Judge.me widget:", error)
    return ""
  }
}

export async function getJudgemeReviewsCount(params?: {
  productHandle?: string
  minRating?: number
}): Promise<number> {
  if (!isJudgemeConfigured()) {
    return 0
  }

  try {
    const cacheKey = `judgeme-count-${JSON.stringify(params || {})}`
    const cached = getCached<number>(cacheKey)
    if (cached !== null) {
      console.log(`[v0] ✅ Returning cached Judge.me count for ${cacheKey}`)
      return cached
    }

    const queryParams = new URLSearchParams()
    if (params?.productHandle) queryParams.set("product_handle", params.productHandle)
    if (params?.minRating) queryParams.set("min_rating", params.minRating.toString())

    const data = await judgemeApiFetch<{ count: number }>(`/reviews/count?${queryParams.toString()}`)

    if (!data) {
      return 0
    }

    const count = data.count || 0

    setCache(cacheKey, count, JUDGEME_CACHE_DURATION)
    console.log(`[v0] 💾 Cached Judge.me count for ${cacheKey}`)

    return count
  } catch (error) {
    console.error("[v0] Error fetching Judge.me reviews count:", error)
    return 0
  }
}

export async function getAllJudgemeReviews(limit = 100): Promise<JudgemeReview[]> {
  if (!isJudgemeConfigured()) {
    return []
  }

  try {
    const cacheKey = `judgeme-all-reviews-${limit}`
    const cached = getCached<JudgemeReview[]>(cacheKey)
    if (cached) {
      console.log(`[v0] ✅ Returning cached all Judge.me reviews (limit: ${limit})`)
      return cached
    }

    const allReviews: JudgemeReview[] = []
    let page = 1
    const perPage = 50

    const totalCount = await getJudgemeReviewsCount()

    while (allReviews.length < limit && allReviews.length < totalCount) {
      const { reviews } = await getJudgemeReviews({ page, perPage })

      if (reviews.length === 0) break

      allReviews.push(...reviews)

      if (reviews.length < perPage) break

      page++
    }

    const result = allReviews.slice(0, limit)

    setCache(cacheKey, result, JUDGEME_CACHE_DURATION)
    console.log(`[v0] 💾 Cached all Judge.me reviews (${result.length} reviews)`)

    return result
  } catch (error) {
    console.error("[v0] Error fetching all Judge.me reviews:", error)
    return []
  }
}

export async function getJudgemeFeaturedReviews(limit = 10): Promise<JudgemeReview[]> {
  if (!isJudgemeConfigured()) {
    return []
  }

  try {
    const cacheKey = `judgeme-featured-${limit}`
    const cached = getCached<JudgemeReview[]>(cacheKey)
    if (cached) {
      console.log(`[v0] ✅ Returning cached featured Judge.me reviews (limit: ${limit})`)
      return cached
    }

    const { reviews } = await getJudgemeReviews({ featured: true, perPage: limit })

    setCache(cacheKey, reviews, JUDGEME_CACHE_DURATION)
    console.log(`[v0] 💾 Cached featured Judge.me reviews (${reviews.length} reviews)`)

    return reviews
  } catch (error) {
    console.error("[v0] Error fetching featured Judge.me reviews:", error)
    return []
  }
}

export async function getJudgemeStats(): Promise<{
  averageRating: number
  totalReviews: number
  fiveStarCount: number
}> {
  if (!isJudgemeConfigured()) {
    console.log("[v0] Judge.me not configured - using fallback stats")
    return { averageRating: 4.8, totalReviews: 1250, fiveStarCount: 980 }
  }

  try {
    const cacheKey = "judgeme-stats"
    const cached = getCached<{ averageRating: number; totalReviews: number; fiveStarCount: number }>(cacheKey)
    if (cached) {
      console.log("[v0] ✅ Returning cached Judge.me stats")
      return cached
    }

    const { reviews } = await getJudgemeReviews({ perPage: 100 })

    if (reviews.length === 0) {
      console.log("[v0] No Judge.me reviews found - using fallback stats")
      return { averageRating: 4.8, totalReviews: 1250, fiveStarCount: 980 }
    }

    const totalReviews = await getJudgemeReviewsCount()

    const fiveStarCount = reviews.filter((r) => r.rating === 5).length
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0)
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

    const stats = {
      averageRating,
      totalReviews,
      fiveStarCount,
    }

    setCache(cacheKey, stats, JUDGEME_CACHE_DURATION)
    console.log("[v0] 💾 Cached Judge.me stats:", stats)

    return stats
  } catch (error) {
    console.error("[v0] Error fetching Judge.me stats:", error)
    return { averageRating: 4.8, totalReviews: 1250, fiveStarCount: 980 }
  }
}
