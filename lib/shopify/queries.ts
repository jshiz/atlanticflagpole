// Enhanced GraphQL queries for collections, menus, and search

// MENU query for navigation
export const MENU_QUERY = /* GraphQL */ `
  query Menu($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`

// COLLECTION with FILTERED products
export const COLLECTION_WITH_FILTERS = /* GraphQL */ `
  query CollectionWithFilters(
    $handle: String!
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys = TITLE
    $reverse: Boolean = false
    $first: Int = 24
    $after: String
  ) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      image {
        url(transform: { maxWidth: 2000, maxHeight: 1200 })
        altText
        width
        height
      }
      products(first: $first, after: $after, filters: $filters, sortKey: $sortKey, reverse: $reverse) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          handle
          title
          vendor
          productType
          tags
          availableForSale
          featuredImage {
            url(transform: { maxWidth: 1200, maxHeight: 1200 })
            altText
            width
            height
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
          variants(first: 30) {
            nodes {
              id
              sku
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url(transform: { maxWidth: 1200, maxHeight: 1200 })
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// PRODUCT SEARCH query
export const PRODUCT_SEARCH = /* GraphQL */ `
  query ProductSearch($q: String!, $first: Int = 20, $after: String) {
    products(first: $first, after: $after, query: $q, sortKey: RELEVANCE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        handle
        title
        vendor
        productType
        availableForSale
        featuredImage {
          url(transform: { maxWidth: 600, maxHeight: 600 })
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 5) {
          nodes {
            id
            title
            sku
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

// ALL COLLECTIONS query
export const ALL_COLLECTIONS_QUERY = /* GraphQL */ `
  query AllCollections($first: Int = 100, $after: String) {
    collections(first: $first, after: $after, sortKey: TITLE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        handle
        title
        description
        descriptionHtml
        image {
          url(transform: { maxWidth: 2000, maxHeight: 1200 })
          altText
          width
          height
        }
        products(first: 100) {
          nodes {
            id
            handle
            title
          }
        }
      }
    }
  }
`
