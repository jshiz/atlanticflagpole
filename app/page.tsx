import { Hero } from "@/components/home/hero"
import { FeaturedProductsShowcase } from "@/components/home/featured-products-showcase"
import { WhyPhoenixTrust } from "@/components/home/why-phoenix-trust"
import { PhoenixVsCompetition } from "@/components/home/phoenix-vs-competition"
import { ReviewsMarquee } from "@/components/home/reviews-marquee"
import { CTA } from "@/components/home/cta"
import { QuickDeals } from "@/components/home/quick-deals"
import { TicketPopup } from "@/components/home/ticket-popup"
import { getJudgemeStats } from "@/lib/judgeme"

export default async function Home() {
  const judgemeStats = await getJudgemeStats()

  return (
    <main className="min-h-screen">
      <Hero judgemeStats={judgemeStats} />
      <FeaturedProductsShowcase />
      <QuickDeals />
      <WhyPhoenixTrust />
      <PhoenixVsCompetition />
      <ReviewsMarquee />
      <CTA />
      <TicketPopup />
    </main>
  )
}
