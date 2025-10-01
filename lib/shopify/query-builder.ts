type Filters = {
  tag?: string // "a,b" = AND; "a|b" = OR; can combine: "a,b|c"
  type?: string // product_type
  vendor?: string // vendor
  q?: string // full-text search
  available?: string // available_for_sale
  min?: string // minimum price
  max?: string // maximum price
}

/**
 * Expands a tag string into AND and OR parts
 * Examples:
 * - "a,b" → { and: ["a", "b"], or: [] }
 * - "a|b" → { and: [], or: ["a", "b"] }
 * - "a,b|c" → { and: ["a"], or: ["b", "c"] }
 */
function expandTagTerms(input?: string) {
  if (!input) return { and: [] as string[], or: [] as string[] }

  // Check if we have both comma and pipe
  if (input.includes(",") && input.includes("|")) {
    // Split by comma first for AND terms
    const andParts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    // The last AND part might contain OR terms
    const lastPart = andParts[andParts.length - 1]
    if (lastPart && lastPart.includes("|")) {
      const orParts = lastPart
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean)
      return {
        and: andParts.slice(0, -1), // All but the last
        or: orParts,
      }
    }
    return { and: andParts, or: [] }
  }

  // Only commas (AND)
  if (input.includes(",")) {
    const andParts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    return { and: andParts, or: [] }
  }

  // Only pipes (OR)
  if (input.includes("|")) {
    const orParts = input
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean)
    return { and: [], or: orParts }
  }

  // Single tag
  return { and: [input.trim()], or: [] }
}

/**
 * Builds a Shopify Storefront API query string from filter parameters
 * Supports AND/OR logic for tags using comma and pipe separators
 */
export function buildProductQuery({ tag, type, vendor, q, available, min, max }: Filters): string {
  const clauses: string[] = []

  // Product type
  if (type) {
    clauses.push(`product_type:"${type}"`)
  }

  // Vendor
  if (vendor) {
    clauses.push(`vendor:"${vendor}"`)
  }

  // Tags with AND/OR logic
  const { and: tagAnd, or: tagOr } = expandTagTerms(tag)

  // Add AND tags (each must match)
  for (const t of tagAnd) {
    clauses.push(`tag:"${t}"`)
  }

  // Add OR tags (at least one must match)
  if (tagOr.length > 1) {
    const orClause = tagOr.map((t) => `tag:"${t}"`).join(" OR ")
    clauses.push(`(${orClause})`)
  } else if (tagOr.length === 1) {
    clauses.push(`tag:"${tagOr[0]}"`)
  }

  // Availability
  if (available === "true") {
    clauses.push("available_for_sale:true")
  }

  // Price range
  if (min) {
    clauses.push(`variants.price:>=${Number(min)}`)
  }
  if (max) {
    clauses.push(`variants.price:<=${Number(max)}`)
  }

  // Free text search (fuzzy)
  if (q) {
    const sanitized = String(q).replace(/["']/g, "")
    clauses.push(
      `(title:${sanitized}* OR sku:${sanitized}* OR vendor:${sanitized}* OR product_type:${sanitized}* OR tag:${sanitized}*)`,
    )
  }

  // If no filters, show products with inventory
  if (clauses.length === 0) {
    return "inventory_total:>0"
  }

  return clauses.join(" AND ")
}
