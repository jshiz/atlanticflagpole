import type { Metadata } from "next"
import { ComparePageClient } from "@/components/compare/compare-page-client"

export const metadata: Metadata = {
  title: "Compare Atlantic Flagpole to Other Brands | Side-by-Side Comparison",
  description:
    "See how Atlantic Flagpole compares to other flagpole brands. Compare warranty, materials, wind resistance, pricing, and more.",
}

export default function ComparePage() {
  return <ComparePageClient />
}
