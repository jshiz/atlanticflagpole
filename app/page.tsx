import { Hero } from "@/components/home/hero"
import { FeaturedGrid } from "@/components/home/featured-grid"
import { WhyBetter } from "@/components/home/why-better"
import { ReviewsMarquee } from "@/components/home/reviews-marquee"
import { CTA } from "@/components/home/cta"
import { TrustMarquee } from "@/components/trust-marquee"
import { LiveChatButton } from "@/components/live-chat-button"

export default function Page() {
  return (
    <main className="flex flex-col">
      <Hero />
      <TrustMarquee />
      <FeaturedGrid />
      <WhyBetter />
      <ReviewsMarquee />
      <CTA />
      <LiveChatButton />
    </main>
  )
}
