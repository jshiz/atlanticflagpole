import { notFound, redirect } from "next/navigation"

interface FlagsSubcategoryPageProps {
  params: {
    subcategory: string
  }
}

// Map old routes to new collection routes
const subcategoryMap: Record<string, string> = {
  american: "american-flags",
  state: "state-flags",
  international: "international-flags",
  military: "military-flags",
  "civil-service": "civil-service-flags",
  historical: "historical-flags",
  nfl: "nfl-flags",
  ncaa: "ncaa-flags",
  mlb: "mlb-flags",
  nascar: "nascar-flags",
  nba: "nba-flags",
  windsocks: "windsocks",
}

export default async function FlagsSubcategoryPage({ params }: FlagsSubcategoryPageProps) {
  const collectionHandle = subcategoryMap[params.subcategory]

  if (!collectionHandle) {
    notFound()
  }

  // Redirect to the proper collection page
  redirect(`/collections/${collectionHandle}`)
}
