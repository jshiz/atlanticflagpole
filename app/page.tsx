import { Hero } from "@/components/home/hero"
import { FeaturedProductsShowcase } from "@/components/home/featured-products-showcase"
import { WhyPhoenixTrust } from "@/components/home/why-phoenix-trust"
import { PhoenixVsCompetition } from "@/components/home/phoenix-vs-competition"
import { ExpandableReviews } from "@/components/home/expandable-reviews"
import { CTA } from "@/components/home/cta"
import { QuickDeals } from "@/components/home/quick-deals"
import { TicketPopup } from "@/components/home/ticket-popup"
import { getJudgemeStats, getJudgemeReviews } from "@/lib/judgeme"
import { generateOrganizationSchema } from "@/lib/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import { generateHomeMetadata } from "@/lib/seo/metadata"
import type { Metadata } from "next"

export const metadata: Metadata = generateHomeMetadata()

export const revalidate = 300 // Revalidate every 5 minutes

export default async function Home() {
  const judgemeStats = await getJudgemeStats()
  const { reviews } = await getJudgemeReviews({ perPage: 12, minRating: 4 })

  const organizationSchema = generateOrganizationSchema()

  return (
    <main className="min-h-screen">
      <StructuredData data={organizationSchema} />
      <Hero judgemeStats={judgemeStats} />
      <FeaturedProductsShowcase />
      <QuickDeals />
      <WhyPhoenixTrust />
      <PhoenixVsCompetition />
      <ExpandableReviews reviews={reviews} />
      <CTA />
      <TicketPopup />
    </main>
  )
}
