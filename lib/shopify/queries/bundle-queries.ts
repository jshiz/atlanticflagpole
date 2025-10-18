export const PRODUCT_WITH_BUNDLE_METADATA_QUERY = /* GraphQL */ `
  query getProductWithBundle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      vendor
      tags
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      metafields(identifiers: [
        { namespace: "bundle", key: "components" }
        { namespace: "bundle", key: "includes_premier" }
        { namespace: "bundle", key: "type" }
      ]) {
        key
        value
        namespace
      }
    }
  }
`

export const BUNDLE_COMPONENTS_QUERY = /* GraphQL */ `
  query getBundleComponents($handles: [String!]!) {
    nodes(ids: $handles) {
      ... on Product {
        id
        title
        handle
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
        variants(first: 1) {
          edges {
            node {
              id
              title
              availableForSale
            }
          }
        }
      }
    }
  }
`
