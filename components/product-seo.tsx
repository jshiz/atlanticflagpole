import type { ShopifyProduct } from "@/lib/shopify/types"

export default function ProductSeo({ product }: { product: ShopifyProduct }) {
  const variants = product?.variants?.edges ? product.variants.edges.map((edge) => edge.node) : []
  const variant = variants[0]
  const images = product?.images?.edges ? product.images.edges.map((edge) => edge.node) : []
  const image = images[0]

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
