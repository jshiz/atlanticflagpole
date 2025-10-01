// Build Shopify products(query: "...") string from URL search params
export function buildProductQuery(sp: Record<string, string | string[] | undefined>) {
  const parts: string[] = []

  const add = (segment?: string) => segment && parts.push(segment)

  // General text search across multiple fields
  const q = (sp.q as string)?.trim()
  if (q) {
    const safe = q.replace(/["']/g, "")
    // Search across title, SKU, vendor, product type, and tags
    const searchTerms = [
      `title:*${safe}*`,
      `sku:*${safe}*`,
      `vendor:*${safe}*`,
      `product_type:*${safe}*`,
      `tag:*${safe}*`,
    ]
    parts.push(`(${searchTerms.join(" OR ")})`)
  }

  // Specific filters
  if (sp.type) add(`product_type:"${String(sp.type)}"`)
  if (sp.vendor) add(`vendor:"${String(sp.vendor)}"`)
  if (sp.tag) add(`tag:"${String(sp.tag)}"`)

  // Availability filter
  if (sp.available === "true") add(`available_for_sale:true`)
  if (sp.available === "false") add(`available_for_sale:false`)

  // Price range filters
  const min = sp.min ? Number(sp.min) : undefined
  const max = sp.max ? Number(sp.max) : undefined
  if (min !== undefined && !Number.isNaN(min)) add(`variants.price:>=${min}`)
  if (max !== undefined && !Number.isNaN(max)) add(`variants.price:<=${max}`)

  // Direct SKU search
  if (sp.sku) add(`sku:${String(sp.sku)}`)

  // Join with AND to enforce all filters
  return parts.length ? parts.join(" AND ") : "inventory_total:>0"
}

export function getSortParams(sortValue?: string) {
  switch (sortValue) {
    case "price-asc":
      return { sortKey: "PRICE" as const, reverse: false }
    case "price-desc":
      return { sortKey: "PRICE" as const, reverse: true }
    case "newest":
      return { sortKey: "CREATED_AT" as const, reverse: true }
    case "title":
      return { sortKey: "TITLE" as const, reverse: false }
    case "best":
      return { sortKey: "BEST_SELLING" as const, reverse: true }
    default:
      return { sortKey: "RELEVANCE" as const, reverse: false }
  }
}
