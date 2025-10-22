import { getJudgemeStats, getJudgemeReviews } from "@/lib/judgeme"
import { generateOrganizationSchema } from "@/lib/seo/structured-data"
import { generateHomeMetadata } from "@/lib/seo/metadata"
import type { Metadata } from "next"
import { HomePageClient } from "./home-page-client"

export const metadata: Metadata = generateHomeMetadata()

export const revalidate = 3600

export default async function Home() {
  let judgemeStats = { average_rating: 4.8, total_reviews: 1250 }
  let reviews: any[] = []

  try {
    const [stats, reviewsData] = await Promise.all([
      getJudgemeStats(),
      getJudgemeReviews({ perPage: 12, minRating: 4 }),
    ])
    judgemeStats = stats
    reviews = reviewsData.reviews
  } catch (error) {
    console.error("[v0] Failed to fetch Judge.me data during build:", error)
  }

  const organizationSchema = generateOrganizationSchema()

  return <HomePageClient judgemeStats={judgemeStats} reviews={reviews} organizationSchema={organizationSchema} />
}
