import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CompetitorComparisonClient } from "@/components/compare/competitor-comparison-client"

const competitors = [
  { handle: "stand", name: "STAND Flagpoles" },
  { handle: "service-first", name: "Service First" },
  { handle: "amazon", name: "Amazon Poles" },
  { handle: "old-glory", name: "Old Glory" },
  { handle: "annin-flagmakers", name: "Annin Flagmakers" },
  { handle: "valley-forge", name: "Valley Forge" },
  { handle: "eder-flag", name: "Eder Flag" },
  { handle: "flagpole-farm", name: "Flagpole Farm" },
  { handle: "liberty-flagpoles", name: "Liberty Flagpoles" },
  { handle: "titan-telescoping", name: "Titan Telescoping" },
  { handle: "ezpole", name: "Ezpole" },
  { handle: "flag-brands", name: "Flag Brands" },
]

export async function generateStaticParams() {
  return competitors.map((comp) => ({
    competitor: comp.handle,
  }))
}

export async function generateMetadata({ params }: { params: { competitor: string } }): Promise<Metadata> {
  const competitor = competitors.find((c) => c.handle === params.competitor)

  if (!competitor) {
    return {
      title: "Competitor Not Found",
    }
  }

  return {
    title: `Atlantic Flagpole vs ${competitor.name} | Detailed Comparison`,
    description: `See how Atlantic Flagpole compares to ${competitor.name}. Compare warranty, materials, wind resistance, pricing, and more.`,
  }
}

export default function CompetitorPage({ params }: { params: { competitor: string } }) {
  const competitor = competitors.find((c) => c.handle === params.competitor)

  if (!competitor) {
    notFound()
  }

  return <CompetitorComparisonClient competitorHandle={params.competitor} competitorName={competitor.name} />
}
