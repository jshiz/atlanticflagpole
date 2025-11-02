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
  console.log("[v0] 🏛️ State Capital Page - Loading for state:", params.state)

  const stateData = getStateCapitalData(params.state.toUpperCase())
  console.log("[v0] State data found:", stateData ? `${stateData.state} - ${stateData.capital}` : "NOT FOUND")

  if (!stateData) {
    console.log("[v0] ❌ State not found, returning 404")
    notFound()
  }

  // Fetch Phoenix Premier Kit (main product)
  console.log("[v0] 🔍 Fetching Phoenix product...")
  const phoenixProduct = await getProduct("phoenix-flagpole-patriot-kit")
  console.log("[v0] Phoenix product:", phoenixProduct ? "✅ Found" : "❌ Not found")

  // Search for state-specific products
  console.log("[v0] 🔍 Searching for state products...")
  const stateProducts = await searchStateProducts(stateData.stateCode, stateData.state)
  console.log("[v0] Found", stateProducts.length, "state products")

  // Get state-specific add-ons
  console.log("[v0] 🔍 Getting state add-ons...")
  const addOns = await getStateAddOns(stateData.stateCode, stateData.state)
  console.log("[v0] Found", addOns.length, "add-ons")

  // Generate structured data
  const stateSchema = generateStateCapitalSchema(stateData, phoenixProduct)
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

  console.log("[v0] ✅ State Capital Page - Rendering components")

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <StructuredData data={stateSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero Section */}
      <StateCapitalHero stateData={stateData} />

      {/* Trust & Guarantee Bar */}
      <TrustBar />

      {/* Localized Hook: "The [City]-Proof Flagpole" */}
      <LocalizedHook stateData={stateData} />

      {/* Phoenix Product Showcase */}
      {phoenixProduct && <PhoenixProductShowcase product={phoenixProduct} stateData={stateData} />}

      {/* State-Specific Add-Ons */}
      {addOns.length > 0 && <StateAddOns addOns={addOns} stateData={stateData} />}

      {/* Why Choose the Phoenix? */}
      <WhyPhoenix />

      {/* FAQ Section */}
      <StateCapitalFAQ stateData={stateData} />

      {/* Final CTA */}
      <FinalCTA stateData={stateData} />
    </main>
  )
}
