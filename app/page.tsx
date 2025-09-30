import { Hero } from "@/components/home/hero"
import { FeaturedGrid } from "@/components/home/featured-grid"
import { WhyBetter } from "@/components/home/why-better"
import { ReviewsMarquee } from "@/components/home/reviews-marquee"
import { CTA } from "@/components/home/cta"

export default function Page() {
  return (
    <main className="flex flex-col">
      <Hero
        bgImageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AtlanticFlagPoleHero-1bpga31cXaLuyWIIyEXNHC2m8vfNAv.jpg"
        eyebrow="Fall Into Savings"
        headline="Up To 60% Off All Flagpoles + Accessories Included!"
        subhead="The last flagpole you will ever need"
        priceAnchor="Prices Starting From $199"
        primaryCta={{
          label: "Shop Flagpoles",
          href: "/products/flagpoles",
        }}
        secondaryCta={{
          label: "Read Reviews",
          href: "#reviews",
        }}
        showTimer
      />
      <FeaturedGrid />
      <WhyBetter />
      <ReviewsMarquee />
      <CTA />
    </main>
  )
}
