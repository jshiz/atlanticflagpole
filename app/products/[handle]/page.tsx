import { notFound } from "next/navigation"
import { getProduct, getProducts } from "@/lib/shopify"
import { ProductDetails } from "@/components/products/product-details"
import ProductSeo from "@/components/product-seo"
import { getProductReviews } from "@/lib/shopify/reviews"
import { getBundleData, getComplementaryProducts } from "@/lib/shopify/bundles"
import type { Metadata } from "next"
import { LocalizedRecommendations } from "@/components/products/localized-recommendations"
import { generateProductMetadata } from "@/lib/seo/metadata"
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data"
import { StructuredData } from "@/components/seo/structured-data"

export const revalidate = 3600

interface ProductPageProps {
  params: {
    handle: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.handle)
  if (!product) return {}

  return generateProductMetadata(product)
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle)

  if (!product) {
    notFound()
  }

  const reviewsData = await getProductReviews(params.handle)
  const bundleData = await getBundleData(params.handle)

  const bundleProducts = await getComplementaryProducts(product)

  const relatedProducts = await getProducts({ first: 20 }).then((allProducts) =>
    allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          p.availableForSale &&
          (p.productType === product.productType || p.tags?.some((tag) => product.tags?.includes(tag))),
      )
      .slice(0, 4),
  )

  const fallbackProducts = await getProducts({ first: 30 }).then((allProducts) =>
    allProducts
      .filter((p) => p.id !== product.id && p.availableForSale && p.productType !== product.productType)
      .slice(0, 8)
      .map((p) => ({
        id: p.id,
        handle: p.handle,
        title: p.title,
        vendor: p.vendor || "",
        productType: p.productType || "",
        tags: p.tags || [],
        availableForSale: p.availableForSale,
        featuredImage: p.images?.nodes?.[0],
        priceRange: p.priceRange,
        compareAtPriceRange: p.compareAtPriceRange,
        variants: p.variants,
      })),
  )

  const productSchema = generateProductSchema(product, reviewsData)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app" },
    {
      name: "Products",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"}/products`,
    },
    {
      name: product.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"}/products/${product.handle}`,
    },
  ])

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <StructuredData data={productSchema} />
      <StructuredData data={breadcrumbSchema} />
      <ProductSeo product={product} />
      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
        bundleProducts={bundleProducts}
        reviewsData={reviewsData}
        bundleData={bundleData}
      />
      <LocalizedRecommendations fallbackProducts={fallbackProducts} />
    </main>
  )
}
