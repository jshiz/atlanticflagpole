import type { Product, Collection } from "@/lib/shopify/types"

export interface OrganizationSchema {
  "@context": string
  "@type": string
  name: string
  url: string
  logo: string
  description: string
  address: {
    "@type": string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  contactPoint: {
    "@type": string
    telephone: string
    contactType: string
    areaServed: string
    availableLanguage: string
  }
  sameAs: string[]
}

export interface WebSiteSchema {
  "@context": string
  "@type": string
  name: string
  url: string
  description: string
  potentialAction: {
    "@type": string
    target: {
      "@type": string
      urlTemplate: string
    }
    "query-input": string
  }
}

export interface ProductSchema {
  "@context": string
  "@type": string
  name: string
  description: string
  image: string[]
  sku: string
  brand: {
    "@type": string
    name: string
  }
  offers: {
    "@type": string
    url: string
    priceCurrency: string
    price: string
    availability: string
    priceValidUntil: string
  }
  aggregateRating?: {
    "@type": string
    ratingValue: number
    reviewCount: number
  }
}

export interface CollectionSchema {
  "@context": string
  "@type": string
  name: string
  description: string
  url: string
  numberOfItems: number
}

export interface BreadcrumbSchema {
  "@context": string
  "@type": string
  itemListElement: Array<{
    "@type": string
    position: number
    name: string
    item: string
  }>
}

export function generateOrganizationSchema(): OrganizationSchema {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Atlantic Flagpole",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description:
      "Premium American-made flagpoles with lifetime warranty. Shop telescoping, residential, and commercial flagpoles with 365-day home trial.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Flag Street",
      addressLocality: "Charleston",
      addressRegion: "SC",
      postalCode: "29401",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-123-4567",
      contactType: "Customer Service",
      areaServed: "US",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/atlanticflagpole",
      "https://www.instagram.com/atlanticflagpole",
      "https://twitter.com/atlanticflagpole",
    ],
  }
}

export function generateWebSiteSchema(): WebSiteSchema {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Atlantic Flagpole",
    url: siteUrl,
    description: "Premium American-made flagpoles with lifetime warranty and 365-day home trial.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateProductSchema(product: Product, reviewData?: { rating: number; count: number }): ProductSchema {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"
  const productUrl = `${siteUrl}/products/${product.handle}`

  const variant = product.variants?.[0]
  const price = variant?.price?.amount || "0"
  const availability = variant?.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"

  // Price valid until 1 year from now
  const priceValidUntil = new Date()
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1)

  const schema: ProductSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.seo?.description || "",
    image: product.featuredImage?.url ? [product.featuredImage.url] : [],
    sku: variant?.sku || product.id,
    brand: {
      "@type": "Brand",
      name: "Atlantic Flagpole",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: variant?.price?.currencyCode || "USD",
      price: price,
      availability: availability,
      priceValidUntil: priceValidUntil.toISOString().split("T")[0],
    },
  }

  // Add aggregate rating if review data is provided
  if (reviewData && reviewData.count > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviewData.rating,
      reviewCount: reviewData.count,
    }
  }

  return schema
}

export function generateCollectionSchema(collection: Collection, productCount: number): CollectionSchema {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"
  const collectionUrl = `${siteUrl}/collections/${collection.handle}`

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description || collection.seo?.description || "",
    url: collectionUrl,
    numberOfItems: productCount,
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  }
}
