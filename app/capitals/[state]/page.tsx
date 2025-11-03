import { notFound } from "next/navigation"
import { getStateCapitalData, getAllStateCapitals } from "@/lib/capitals/data"
import { searchStateProducts, getStateAddOns } from "@/lib/capitals/product-search"
import { getProduct } from "@/lib/shopify"
import { StateCapitalHero } from "@/components/capitals/state-capital-hero"
import { TrustBar } from "@/components/capitals/trust-bar"
import { LocalizedHook } from "@/components/capitals/localized-hook"
import { PhoenixProductShowcase } from "@/components/capitals/phoenix-product-showcase"
import { StateAddOns } from "@/components/capitals/state-add-ons"
import { WhyPhoenix } from "@/components/capitals/why-phoenix"
import { LocalContentHub } from "@/components/capitals/local-content-hub"
import { StateCapitalFAQ } from "@/components/capitals/state-capital-faq"
import { FinalCTA } from "@/components/capitals/final-cta"
import { generateStateCapitalMetadata } from "@/lib/seo/state-capital-metadata"
import { generateStateCapitalSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"
import type { Metadata } from "next"

export const revalidate = 3600

interface StateCapitalPageProps {
  params: {
    state: string
  }
}

export async function generateStaticParams() {
  const allCapitals = getAllStateCapitals()
  return allCapitals.map((capital) => ({
    state: capital.stateCode.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: StateCapitalPageProps): Promise<Metadata> {
  const stateData = getStateCapitalData(params.state.toUpperCase())
  if (!stateData) return {}

  return generateStateCapitalMetadata(stateData)
}

export default async function StateCapitalPage({ params }: StateCapitalPageProps) {
  const stateData = getStateCapitalData(params.state.toUpperCase())

  if (!stateData) {
    notFound()
  }

  let phoenixProduct = null
  try {
    phoenixProduct = await getProduct("phoenix-telescoping-flagpole-premier-kit-starter-bundle")

    if (!phoenixProduct) {
      phoenixProduct = await getProduct("phoenix-patriot-flagpole-kit-complete-bundle-with-solar-light-eagle")
    }

    if (!phoenixProduct) {
      phoenixProduct = await getProduct("phoenix-presidential-flagpole-kit-heavy-duty-residential-flagpole")
    }

    if (!phoenixProduct) {
      phoenixProduct = await getProduct("phoenix-flagpole-patriot-kit")
    }
  } catch (error) {
    console.error("[v0] Error fetching Phoenix product:", error)
  }

  console.log("[v0] Phoenix product found:", phoenixProduct ? phoenixProduct.handle : "none")

  let stateProducts = []
  try {
    stateProducts = await searchStateProducts(stateData.stateCode, stateData.state)
  } catch (error) {
    console.error("[v0] Error searching state products:", error)
  }

  console.log("[v0] Found", stateProducts.length, "state products")

  let addOns = []
  try {
    addOns = await getStateAddOns(stateData.stateCode, stateData.state)
  } catch (error) {
    console.error("[v0] Error fetching add-ons:", error)
  }

  console.log("[v0] Found", addOns.length, "add-ons")

  // Generate structured data only if we have a product
  const stateSchema = phoenixProduct ? generateStateCapitalSchema(stateData, phoenixProduct) : null
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app" },
    {
      name: "State Capitals",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"}/capitals`,
    },
    {
      name: `${stateData.capital}, ${stateData.state}`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"}/capitals/${params.state}`,
    },
  ])

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      {stateSchema && <StructuredData data={stateSchema} />}
      <StructuredData data={breadcrumbSchema} />

      {/* Hero Section */}
      <StateCapitalHero stateData={stateData} />

      {/* Trust & Guarantee Bar */}
      <TrustBar />

      {/* Localized Hook: "The [City]-Proof Flagpole" */}
      <LocalizedHook stateData={stateData} />

      {/* Phoenix Product Showcase - only render if product exists */}
      {phoenixProduct && <PhoenixProductShowcase product={phoenixProduct} stateData={stateData} />}

      {/* State-Specific Add-Ons - only render if we have add-ons */}
      {addOns && addOns.length > 0 && <StateAddOns addOns={addOns} stateData={stateData} />}

      {/* Why Choose the Phoenix? */}
      <WhyPhoenix />

      {/* Local SEO "Content Hub" - Added new section */}
      <LocalContentHub stateData={stateData} />

      {/* FAQ Section */}
      <StateCapitalFAQ stateData={stateData} />

      {/* Final CTA */}
      <FinalCTA stateData={stateData} />
    </main>
  )
}
