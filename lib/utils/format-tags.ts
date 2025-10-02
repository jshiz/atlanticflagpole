/**
 * Formats a tag string to be more readable with proper capitalization
 * Examples:
 * - "alliance flagpole" -> "Alliance Flagpole"
 * - "internal halyard flagpole" -> "Internal Halyard Flagpole"
 * - "20ft flagpole" -> "20ft Flagpole"
 */
export function formatTag(tag: string): string {
  if (!tag) return ""

  // Special cases for acronyms and abbreviations
  const specialCases: Record<string, string> = {
    usa: "USA",
    us: "US",
    uv: "UV",
    led: "LED",
    pvc: "PVC",
    ft: "ft",
    in: "in",
  }

  return tag
    .split(" ")
    .map((word) => {
      const lowerWord = word.toLowerCase()
      // Check if it's a special case
      if (specialCases[lowerWord]) {
        return specialCases[lowerWord]
      }
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(" ")
}

/**
 * Categorizes tags into different filter groups based on keywords
 */
export function categorizeTag(tag: string): {
  category: "material" | "height" | "installation" | "use-case" | "feature" | "other"
  formatted: string
} {
  const lowerTag = tag.toLowerCase()
  const formatted = formatTag(tag)

  // Material tags
  if (
    lowerTag.includes("aluminum") ||
    lowerTag.includes("fiberglass") ||
    lowerTag.includes("steel") ||
    lowerTag.includes("wood") ||
    lowerTag.includes("carbon fiber")
  ) {
    return { category: "material", formatted }
  }

  // Height tags
  if (lowerTag.match(/\d+\s*ft|\d+\s*foot|\d+\s*feet/)) {
    return { category: "height", formatted }
  }

  // Installation type tags
  if (
    lowerTag.includes("internal halyard") ||
    lowerTag.includes("external halyard") ||
    lowerTag.includes("ground mount") ||
    lowerTag.includes("wall mount") ||
    lowerTag.includes("roof mount") ||
    lowerTag.includes("in-ground")
  ) {
    return { category: "installation", formatted }
  }

  // Use case tags
  if (
    lowerTag.includes("residential") ||
    lowerTag.includes("commercial") ||
    lowerTag.includes("nautical") ||
    lowerTag.includes("boat") ||
    lowerTag.includes("marine") ||
    lowerTag.includes("indoor") ||
    lowerTag.includes("outdoor")
  ) {
    return { category: "use-case", formatted }
  }

  // Feature tags
  if (
    lowerTag.includes("telescoping") ||
    lowerTag.includes("sectional") ||
    lowerTag.includes("single mast") ||
    lowerTag.includes("multi-mast") ||
    lowerTag.includes("rotating") ||
    lowerTag.includes("stationary")
  ) {
    return { category: "feature", formatted }
  }

  return { category: "other", formatted }
}

/**
 * Organizes all tags into categorized groups
 */
export function organizeTagsIntoCategories(tags: string[]) {
  const categories = {
    material: [] as string[],
    height: [] as string[],
    installation: [] as string[],
    "use-case": [] as string[],
    feature: [] as string[],
    other: [] as string[],
  }

  tags.forEach((tag) => {
    const { category, formatted } = categorizeTag(tag)
    if (!categories[category].includes(formatted)) {
      categories[category].push(formatted)
    }
  })

  // Sort each category alphabetically
  Object.keys(categories).forEach((key) => {
    categories[key as keyof typeof categories].sort()
  })

  return categories
}
