import { notFound, redirect } from "next/navigation"

interface AccessoriesSubcategoryPageProps {
  params: {
    subcategory: string
  }
}

// Map old routes to new collection routes
const subcategoryMap: Record<string, string> = {
  "flagpole-lighting": "flagpole-lighting",
  "flagpole-mounts": "flagpole-mounts",
  "flagpole-toppers": "flagpole-toppers",
  weathervanes: "weathervanes",
  all: "accessories",
  mount: "flagpole-mounts", // Map mount to flagpole-mounts
  mounts: "flagpole-mounts", // Map mounts to flagpole-mounts
  lighting: "flagpole-lighting", // Map lighting to flagpole-lighting
  toppers: "flagpole-toppers", // Map toppers to flagpole-toppers
}

export default async function AccessoriesSubcategoryPage({ params }: AccessoriesSubcategoryPageProps) {
  const collectionHandle = subcategoryMap[params.subcategory]

  if (!collectionHandle) {
    notFound()
  }

  // Redirect to the proper collection page
  redirect(`/collections/${collectionHandle}`)
}
