"use client"

import { Hero } from "@/components/home/hero"
import { FeaturedProductsShowcase } from "@/components/home/featured-products-showcase"
import { QuickDeals } from "@/components/home/quick-deals"
import { StructuredData } from "@/components/seo/structured-data"
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

interface HomePageClientProps {
  judgemeStats: { average_rating: number; total_reviews: number }
  reviews: any[]
  organizationSchema: any
}

export function HomePageClient({ judgemeStats, reviews, organizationSchema }: HomePageClientProps) {
  return (
    <div className="min-h-screen bg-white">
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
    </div>
  )
}
