import { Hero } from "@/components/home/hero"
import { WhyBetter } from "@/components/home/why-better"
import { FeaturedGrid } from "@/components/home/featured-grid"
import { ReviewsMarquee } from "@/components/home/reviews-marquee"
import { CTA } from "@/components/home/cta"
import { QuickDeals } from "@/components/home/quick-deals"
import { TicketPopup } from "@/components/home/ticket-popup"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <QuickDeals />
      <WhyBetter />
      <FeaturedGrid />
      <ReviewsMarquee />
      <CTA />
      <TicketPopup />
    </main>
  )
}
