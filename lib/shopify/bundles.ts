// Bundle-aware product system for Atlantic Flagpole
// Fetches bundle metadata from Shopify and determines if products include Premier Kit

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ""
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""
const SHOPIFY_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07"

interface BundleComponent {
  id: string
  title: string
  handle: string
  price: {
    amount: string
    currencyCode: string
  }
  image?: {
    url: string
    altText: string | null
  }
}

export interface BundleData {
  isBundle: boolean
  includesPremier: boolean
  components: BundleComponent[]
}

const BUNDLE_QUERY = /* GraphQL */ `
  query ProductBundle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      metafields(identifiers: [
        { namespace: "bundle", key: "components" }
        { namespace: "bundle", key: "includes_premier" }
      ]) {
        namespace
        key
        value
        type
      }
    }
  }
`

async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status}`)
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data
}

export async function getBundleData(productHandle: string): Promise<BundleData> {
  console.log(`[v0] Fetching bundle data for product: ${productHandle}`)

  try {
    const data = await shopifyFetch<{ product: any }>(BUNDLE_QUERY, { handle: productHandle })

    if (!data.product) {
      console.log(`[v0] Product not found: ${productHandle}`)
      return { isBundle: false, includesPremier: false, components: [] }
    }

    const metafields = data.product.metafields || []
    const componentsField = metafields.find((m: any) => m?.namespace === "bundle" && m?.key === "components")
    const includesPremierField = metafields.find((m: any) => m?.namespace === "bundle" && m?.key === "includes_premier")

    const includesPremier = includesPremierField?.value === "true"
    const isBundle = !!componentsField

    let components: BundleComponent[] = []

    if (componentsField?.value) {
      try {
        components = JSON.parse(componentsField.value)
        console.log(`[v0] Parsed ${components.length} bundle components`)
      } catch (error) {
        console.error("[v0] Error parsing bundle components:", error)
      }
    }

    console.log(`[v0] Bundle data: isBundle=${isBundle}, includesPremier=${includesPremier}`)

    return {
      isBundle,
      includesPremier,
      components,
    }
  } catch (error) {
    console.error("[v0] Error fetching bundle data:", error)
    return { isBundle: false, includesPremier: false, components: [] }
  }
}

export async function getComplementaryProducts(product: any): Promise<any[]> {
  console.log(`[v0] Finding complementary products for: ${product.handle}`)

  const productType = product.productType?.toLowerCase() || ""
  const tags = product.tags || []

  // Define complementary product mappings
  const complementaryMap: Record<string, string[]> = {
    flagpole: ["flag", "mount", "topper", "lighting", "accessory"],
    flag: ["flagpole", "mount", "topper"],
    mount: ["flagpole", "flag"],
    topper: ["flagpole", "flag"],
    lighting: ["flagpole"],
    accessory: ["flagpole", "flag"],
  }

  // Determine what complements this product
  let searchTags: string[] = []
  for (const [type, complements] of Object.entries(complementaryMap)) {
    if (productType.includes(type)) {
      searchTags = complements
      break
    }
  }

  // If no specific mapping, use general accessories
  if (searchTags.length === 0) {
    searchTags = ["accessory", "flag"]
  }

  try {
    const allProducts = await getProducts({ first: 50 })

    // Filter for complementary products
    const complementary = allProducts.filter((p) => {
      if (p.id === product.id || !p.availableForSale) return false

      const pType = p.productType?.toLowerCase() || ""
      const pTags = p.tags || []

      // Check if product type or tags match complementary items
      return (
        searchTags.some((tag) => pType.includes(tag) || pTags.some((t) => t.toLowerCase().includes(tag))) ||
        // Also include products from related collections
        (product.collections?.nodes || []).some((col: any) =>
          (p.collections?.nodes || []).some((pCol: any) => pCol.id === col.id),
        )
      )
    })

    console.log(`[v0] Found ${complementary.length} complementary products`)
    return complementary.slice(0, 4) // Return up to 4 complementary products
  } catch (error) {
    console.error("[v0] Error fetching complementary products:", error)
    return []
  }
}

// Helper function to get products (if not already imported)
async function getProducts(options: { first: number }): Promise<any[]> {
  const PRODUCTS_QUERY = /* GraphQL */ `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            productType
            tags
            availableForSale
            collections(first: 5) {
              nodes {
                id
                handle
                title
              }
            }
            images(first: 1) {
              nodes {
                url
                altText
              }
            }
            variants(first: 1) {
              nodes {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: any }> } }>(PRODUCTS_QUERY, {
      first: options.first,
    })
    return data.products.edges.map((edge) => edge.node)
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }
}
