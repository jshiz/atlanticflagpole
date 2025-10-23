import type { Metadata } from "next"
import type { ShopifyProduct, ShopifyCollection } from "@/lib/shopify/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"
const SITE_NAME = "Atlantic Flagpole"
const SITE_DESCRIPTION = "The last flagpole you will ever need. Handcrafted in the USA with a lifetime guarantee."

export function generateProductMetadata(product: ShopifyProduct): Metadata {
  const title = `${product.title} | ${SITE_NAME}`
  const description = product.description?.slice(0, 160) || SITE_DESCRIPTION
  const price = product.priceRange?.minVariantPrice?.amount
  const currency = product.priceRange?.minVariantPrice?.currencyCode || "USD"
  const image = product.images?.nodes?.[0]?.url
  const url = `${SITE_URL}/products/${product.handle}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: SITE_NAME,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 1200,
              alt: product.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: url,
    },
    other: {
      "product:price:amount": price || "",
      "product:price:currency": currency,
    },
  }
}

export function generateCollectionMetadata(collection: ShopifyCollection): Metadata {
  const title = `${collection.title} | ${SITE_NAME}`
  const description = collection.description?.slice(0, 160) || SITE_DESCRIPTION
  const image = collection.image?.url
  const url = `${SITE_URL}/collections/${collection.handle}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: SITE_NAME,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: collection.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateHomeMetadata(): Metadata {
  return {
    title: `${SITE_NAME} - Premium American-Made Flagpoles`,
    description: SITE_DESCRIPTION,
    openGraph: {
      title: `${SITE_NAME} - Premium American-Made Flagpoles`,
      description: SITE_DESCRIPTION,
      type: "website",
      url: SITE_URL,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} - Premium American-Made Flagpoles`,
      description: SITE_DESCRIPTION,
    },
    alternates: {
      canonical: SITE_URL,
    },
  }
}
