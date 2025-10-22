"use client"

import { Hero } from "@/components/home/hero"
import { FeaturedProductsShowcase } from "@/components/home/featured-products-showcase"
import { QuickDeals } from "@/components/home/quick-deals"
import { StructuredData } from "@/components/seo/structured-data"
import dynamic from "next/dynamic"
import { Suspense } from "react"
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
  websiteSchema: any
}

export function HomePageClient({ judgemeStats, reviews, organizationSchema, websiteSchema }: HomePageClientProps) {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />

      <Hero judgemeStats={judgemeStats} />

      <FeaturedProductsShowcase />

      <QuickDeals />

      <Suspense fallback={<div className="h-96 bg-[#0B1C2C] animate-pulse" />}>
        <WhyPhoenixTrust />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <PhoenixVsCompetition />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-[#0A2740] animate-pulse" />}>
        <ExpandableReviews reviews={reviews} />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-[#F5F3EF] animate-pulse" />}>
        <CTAComponent />
      </Suspense>

      <HomeClientComponents />
    </div>
  )
}
