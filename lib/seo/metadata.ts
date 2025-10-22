import type { Metadata } from "next"
import type { ShopifyProduct, ShopifyCollection } from "@/lib/shopify/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"
const SITE_NAME = "Atlantic Flagpole"
const SITE_DESCRIPTION =
  "Premium American-made flagpoles with lifetime warranty. The last flagpole you'll ever need. Handcrafted in the USA with 365-day home trial and free shipping."
const TWITTER_HANDLE = "@atlanticflagpole"
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-flagpole.jpg`

export function generateProductMetadata(product: ShopifyProduct): Metadata {
  const title = `${product.title} | ${SITE_NAME}`
  const description = product.description?.slice(0, 160) || SITE_DESCRIPTION
  const price = product.priceRange?.minVariantPrice?.amount
  const currency = product.priceRange?.minVariantPrice?.currencyCode || "USD"
  const image = product.images?.nodes?.[0]?.url || product.featuredImage?.url || DEFAULT_IMAGE
  const url = `${SITE_URL}/products/${product.handle}`

  return {
    title,
    description,
    keywords: [
      "flagpole",
      "American made",
      "lifetime warranty",
      "premium flagpole",
      product.title,
      "USA flagpole",
      "residential flagpole",
      "commercial flagpole",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      title,
      description,
      type: "product",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 1200,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "product:price:amount": price || "",
      "product:price:currency": currency,
      "product:availability": "in stock",
      "product:condition": "new",
      "product:brand": SITE_NAME,
    },
  }
}

export function generateCollectionMetadata(collection: ShopifyCollection): Metadata {
  const title = `${collection.title} | ${SITE_NAME}`
  const description = collection.description?.slice(0, 160) || SITE_DESCRIPTION
  const image = collection.image?.url || DEFAULT_IMAGE
  const url = `${SITE_URL}/collections/${collection.handle}`

  return {
    title,
    description,
    keywords: [
      "flagpole collection",
      collection.title,
      "American made flagpoles",
      "premium flagpoles",
      "USA flagpoles",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: collection.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export function generateHomeMetadata(): Metadata {
  return {
    title: `${SITE_NAME} - Premium American-Made Flagpoles | Lifetime Warranty`,
    description: SITE_DESCRIPTION,
    keywords: [
      "flagpole",
      "American made flagpole",
      "lifetime warranty flagpole",
      "premium flagpole",
      "residential flagpole",
      "commercial flagpole",
      "USA flagpole",
      "telescoping flagpole",
      "sectional flagpole",
      "flagpole installation",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    openGraph: {
      title: `${SITE_NAME} - Premium American-Made Flagpoles`,
      description: SITE_DESCRIPTION,
      type: "website",
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: "Atlantic Flagpole - Premium American-Made Flagpoles",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} - Premium American-Made Flagpoles`,
      description: SITE_DESCRIPTION,
      images: [DEFAULT_IMAGE],
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      bing: "your-bing-verification-code",
    },
  }
}
