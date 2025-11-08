import type { Metadata } from "next"
import { getProduct } from "@/lib/shopify"
import { StateCapitalHero } from "@/components/capitals/state-capital-hero"
import { TrustBar } from "@/components/capitals/trust-bar"
import { PhoenixProductShowcase } from "@/components/capitals/phoenix-product-showcase"
import { SpotlightProducts } from "@/components/products/spotlight-products"
import { FinalCTA } from "@/components/capitals/final-cta"

export const metadata: Metadata = {
  title: "Alabama Flagpoles | Montgomery, AL | Premium Telescoping Flagpoles",
  description:
    "Shop premium flagpoles designed for Montgomery, Alabama's humid subtropical climate. 100 MPH wind rating, rust-proof construction. Free shipping!",
}

const stateData = {
  stateCode: "AL",
  state: "Alabama",
  capital: "Montgomery",
  stateNickname: "The Yellowhammer State",
  countyName: "Montgomery County",
  climate: {
    type: "Humid subtropical with hot summers and mild winters",
    challenges: ["High humidity", "Severe thunderstorms", "Occasional tornadoes"],
    phoenixBenefits: [
      "100 MPH wind rating handles severe storms",
      "Rust-proof aluminum resists humidity damage",
      "Rope-free design prevents moisture-related issues",
    ],
  },
}

export default async function AlabamaPage() {
  const phoenixProduct = await getProduct("phoenix-telescoping-flagpole-premier-kit-starter-bundle")

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <StateCapitalHero stateData={stateData} />
      <TrustBar />

      {phoenixProduct && <PhoenixProductShowcase product={phoenixProduct} stateData={stateData} />}

      <SpotlightProducts />

      <FinalCTA stateData={stateData} />
    </main>
  )
}
