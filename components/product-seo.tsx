import type { ShopifyProduct } from "@/lib/shopify/types"

export default function ProductSeo({ product }: { product: ShopifyProduct }) {
  const variant = product?.variants?.edges?.[0]?.node
  const image = product?.images?.edges?.[0]?.node

  const data = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: image ? [image.url] : [],
    description: product?.description ?? "",
    brand: { "@type": "Brand", name: "Atlantic Flagpole" },
    offers: {
      "@type": "Offer",
      url: `https://atlanticflagpole.vercel.app/products/${product.handle}`,
      priceCurrency: variant?.price?.currencyCode ?? "USD",
      price: variant?.price?.amount ?? undefined,
      availability: variant?.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
