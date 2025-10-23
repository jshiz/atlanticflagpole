import { Hero } from "@/components/home/hero"
import { FeaturedProductsShowcase } from "@/components/home/featured-products-showcase"
import { QuickDeals } from "@/components/home/quick-deals"
import { getJudgemeStats, getJudgemeReviews } from "@/lib/judgeme"
import { generateOrganizationSchema } from "@/lib/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import { generateHomeMetadata } from "@/lib/seo/metadata"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll"
import { HomeClientComponents } from "./home-client"

const WhyPhoenixTrust = dynamic(
  () => import("@/components/home/why-phoenix-trust").then((mod) => ({ default: mod.WhyPhoenixTrust })),
  {
    loading: () => <div className="h-96 bg-[#0B1C2C] animate-pulse" />,
  },
)

const PhoenixVsCompetition = dynamic(
  () => import("@/components/home/phoenix-vs-competition").then((mod) => ({ default: mod.PhoenixVsCompetition })),
  {
    loading: () => <div className="h-96 bg-white animate-pulse" />,
  },
)

const ExpandableReviews = dynamic(
  () => import("@/components/home/expandable-reviews").then((mod) => ({ default: mod.ExpandableReviews })),
  {
    loading: () => <div className="h-96 bg-[#0A2740] animate-pulse" />,
  },
)

const CTAComponent = dynamic(() => import("@/components/home/cta").then((mod) => ({ default: mod.CTA })), {
  loading: () => <div className="h-64 bg-[#F5F3EF] animate-pulse" />,
})

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
    // Use fallback data if fetch fails during build
  }

  const organizationSchema = generateOrganizationSchema()

  return (
    <main className="min-h-screen">
      <StructuredData data={organizationSchema} />

      <Hero judgemeStats={judgemeStats} />

      <FadeInOnScroll>
        <FeaturedProductsShowcase />
      </FadeInOnScroll>

      <FadeInOnScroll delay={100}>
        <QuickDeals />
      </FadeInOnScroll>

      <FadeInOnScroll delay={150}>
        <Suspense fallback={<div className="h-96 bg-[#0B1C2C] animate-pulse" />}>
          <WhyPhoenixTrust />
        </Suspense>
      </FadeInOnScroll>

      <FadeInOnScroll delay={200}>
        <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
          <PhoenixVsCompetition />
        </Suspense>
      </FadeInOnScroll>

      <FadeInOnScroll delay={250}>
        <Suspense fallback={<div className="h-96 bg-[#0A2740] animate-pulse" />}>
          <ExpandableReviews reviews={reviews} />
        </Suspense>
      </FadeInOnScroll>

      <FadeInOnScroll delay={300}>
        <Suspense fallback={<div className="h-64 bg-[#F5F3EF] animate-pulse" />}>
          <CTAComponent />
        </Suspense>
      </FadeInOnScroll>

      <HomeClientComponents />
    </main>
  )
}
