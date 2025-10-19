import { shopifyFetch } from "../index"

const BUNDLE_COMPONENTS_QUERY = `
  query getBundleComponents($handles: [String!]!) {
    products(first: 50, query: $handles) {
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          tags
        }
      }
    }
  }
`

export async function fetchBundleComponents(handles: string[]) {
  if (!handles.length) return []

  // Build query string for Shopify search
  const queryString = handles.map((h) => `handle:${h}`).join(" OR ")

  const res = await shopifyFetch({
    query: BUNDLE_COMPONENTS_QUERY,
    variables: { handles: queryString },
  })

  return res.body.data.products.edges.map((edge: any) => edge.node)
}
