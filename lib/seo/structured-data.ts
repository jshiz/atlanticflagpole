import type { ShopifyProduct, ShopifyCollection } from "@/lib/shopify/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"
const SITE_NAME = "Atlantic Flagpole"

export function generateProductSchema(product: ShopifyProduct, reviewData?: any) {
  const price = product.priceRange?.minVariantPrice?.amount
  const currency = product.priceRange?.minVariantPrice?.currencyCode || "USD"
  const image = product.images?.nodes?.[0]?.url
  const availability = product.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: image || "",
    url: `${SITE_URL}/products/${product.handle}`,
    brand: {
      "@type": "Brand",
      name: product.vendor || SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      price: price || "0",
      priceCurrency: currency,
      availability,
      url: `${SITE_URL}/products/${product.handle}`,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  }

  // Add aggregate rating if available
  if (reviewData?.rating && reviewData?.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviewData.rating,
      reviewCount: reviewData.reviewCount,
      bestRating: "5",
      worstRating: "1",
    }
  }

  return schema
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: "Premium American-made flagpoles with lifetime guarantee",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    sameAs: [
      // Add social media URLs here
    ],
  }
}

export function generateCollectionSchema(collection: ShopifyCollection) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: `${SITE_URL}/collections/${collection.handle}`,
  }
}

export function generateStateCapitalSchema(stateData: any, product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Best Telescoping Flagpole in ${stateData.capital}, ${stateData.state}`,
    description: `Get the American-made Phoenix Telescoping Flagpole delivered to ${stateData.capital}, ${stateData.state}. 100 MPH wind guarantee, lifetime warranty, and 365-day home trial.`,
    url: `${SITE_URL}/capitals/${stateData.stateCode.toLowerCase()}`,
    about: {
      "@type": "Place",
      name: stateData.capital,
      address: {
        "@type": "PostalAddress",
        addressLocality: stateData.capital,
        addressRegion: stateData.stateCode,
        addressCountry: "US",
      },
    },
    mainEntity: product
      ? {
          "@type": "Product",
          name: product.title,
          description: product.description,
          image: product.images?.nodes?.[0]?.url || "",
          url: `${SITE_URL}/products/${product.handle}`,
          brand: {
            "@type": "Brand",
            name: product.vendor || SITE_NAME,
          },
          offers: {
            "@type": "Offer",
            price: product.priceRange?.minVariantPrice?.amount || "0",
            priceCurrency: product.priceRange?.minVariantPrice?.currencyCode || "USD",
            availability: product.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${SITE_URL}/products/${product.handle}`,
          },
        }
      : undefined,
  }
}
