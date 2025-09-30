import { Hero } from "@/components/home/hero"
import { FeaturedGrid } from "@/components/home/featured-grid"
import { WhyBetter } from "@/components/home/why-better"
import { ReviewsMarquee } from "@/components/home/reviews-marquee"
import { CTA } from "@/components/home/cta"

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero
        bgImageSrc="/american-flag-waving-on-flagpole-against-blue-sky.jpg"
        eyebrow="MADE IN USA"
        headline="Premium Flagpoles Built to Last Generations"
        subhead="Aircraft-grade aluminum construction with lifetime warranty. The finest flagpoles in America."
        priceAnchor="Starting at $299"
        primaryCta={{ label: "Shop Flagpoles", href: "/products" }}
        secondaryCta={{ label: "Learn More", href: "/about" }}
        showTimer={true}
      />
      <FeaturedGrid />
      <WhyBetter />
      <ReviewsMarquee />
      <CTA />
    </main>
  )
}
