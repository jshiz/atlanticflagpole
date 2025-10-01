export const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || ""

export const SHOPIFY_STOREFRONT_TOKEN =
  // allow either variable name; we standardize on STOREFRONT_ACCESS_TOKEN
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_TOKEN || ""

export const SHOPIFY_STOREFRONT_API_VERSION =
  process.env.SHOPIFY_STOREFRONT_API_VERSION || process.env.SHOPIFY_API_VERSION || "2025-07"
