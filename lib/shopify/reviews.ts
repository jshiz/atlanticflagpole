import { shopifyFetch } from "./index"
import { PRODUCT_REVIEWS_QUERY } from "./queries"

export interface ProductReview {
  id: string
  author: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  helpful: number
  images?: string[]
}

export interface ReviewsData {
  reviews: ProductReview[]
  averageRating: number
  totalReviews: number
  ratingDistribution: Array<{
    stars: number
    count: number
    percentage: number
  }>
}

export async function getProductReviews(productHandle: string): Promise<ReviewsData> {
  try {
    const result = await shopifyFetch<{
      product: {
        id: string
        title: string
        metafields: Array<{
          namespace: string
          key: string
          value: string
          type: string
        }>
      }
    }>({
      query: PRODUCT_REVIEWS_QUERY,
      variables: { handle: productHandle },
    })

    if (!result.data?.product) {
      console.log(`[v0] No product found for handle: ${productHandle}`)
      return getDefaultReviewsData()
    }

    const metafields = result.data.product.metafields || []

    // Parse Judge.me metafields
    const reviewsMetafield = metafields.find((m) => m?.namespace === "judgeme" && m?.key === "reviews")
    const ratingMetafield = metafields.find((m) => m?.namespace === "judgeme" && m?.key === "rating")
    const countMetafield = metafields.find((m) => m?.namespace === "judgeme" && m?.key === "review_count")

    let reviews: ProductReview[] = []
    let averageRating = 0
    let totalReviews = 0

    // Parse reviews from metafield
    if (reviewsMetafield?.value) {
      try {
        const parsedReviews = JSON.parse(reviewsMetafield.value)
        reviews = Array.isArray(parsedReviews) ? parsedReviews.slice(0, 10) : []
      } catch (e) {
        console.log(`[v0] Failed to parse reviews for ${productHandle}`)
      }
    }

    // Parse rating and count
    if (ratingMetafield?.value) {
      averageRating = Number.parseFloat(ratingMetafield.value) || 0
    }

    if (countMetafield?.value) {
      totalReviews = Number.parseInt(countMetafield.value, 10) || 0
    }

    // Calculate rating distribution
    const ratingCounts = [0, 0, 0, 0, 0]
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating - 1]++
      }
    })

    const ratingDistribution = [5, 4, 3, 2, 1].map((stars, index) => {
      const count = ratingCounts[5 - stars - 1] || 0
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
      return { stars, count, percentage }
    })

    // If no reviews found in metafields, return default data
    if (reviews.length === 0) {
      console.log(`[v0] No reviews found in metafields for ${productHandle}, using defaults`)
      return getDefaultReviewsData()
    }

    return {
      reviews,
      averageRating: averageRating || 4.9,
      totalReviews: totalReviews || reviews.length,
      ratingDistribution,
    }
  } catch (error) {
    console.error(`[v0] Error fetching reviews for ${productHandle}:`, error)
    return getDefaultReviewsData()
  }
}

function getDefaultReviewsData(): ReviewsData {
  return {
    reviews: [],
    averageRating: 4.9,
    totalReviews: 0,
    ratingDistribution: [
      { stars: 5, count: 0, percentage: 0 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ],
  }
}
