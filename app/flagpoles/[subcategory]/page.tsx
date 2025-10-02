import { notFound, redirect } from "next/navigation"

interface FlagpoleSubcategoryPageProps {
  params: {
    subcategory: string
  }
}

// Map old routes to new collection routes
const subcategoryMap: Record<string, string> = {
  telescoping: "telescoping-flagpoles",
  aluminum: "aluminum-flagpoles",
  indoor: "indoor-flagpoles",
  kits: "flagpole-kits",
  "presidential-package": "presidential-package",
  "patriot-bundle": "patriot-bundle",
  "20ft": "20ft-flagpoles",
  "25ft": "25ft-flagpoles",
  "30ft": "30ft-flagpoles",
  "30-plus": "30ft-flagpoles", // Map 30-plus to 30ft collection
  "20-25": "20ft-flagpoles", // Map 20-25 to 20ft collection
  "25-30": "25ft-flagpoles", // Map 25-30 to 25ft collection
}

export default async function FlagpoleSubcategoryPage({ params }: FlagpoleSubcategoryPageProps) {
  const collectionHandle = subcategoryMap[params.subcategory]

  if (!collectionHandle) {
    notFound()
  }

  // Redirect to the proper collection page
  redirect(`/collections/${collectionHandle}`)
}
