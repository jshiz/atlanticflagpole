import { notFound } from "next/navigation"
import { getProduct, getProducts } from "@/lib/shopify"
import { ProductDetailsDreamCloud } from "@/components/products/product-details-dreamcloud"
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
  try {
    const product = await getProduct(params.handle)
    if (!product) return {}
    return generateProductMetadata(product)
  } catch (error) {
    console.error("[v0] Error generating metadata:", error)
    return {}
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  console.log("[v0] ProductPage - fetching product:", params.handle)

  let product
  try {
    product = await getProduct(params.handle)
    console.log("[v0] ProductPage - product fetched:", product ? "success" : "not found")
  } catch (error) {
    console.error("[v0] ProductPage - error fetching product:", error)
    notFound()
  }

  if (!product) {
    console.log("[v0] ProductPage - product not found, calling notFound()")
    notFound()
  }

  let reviewsData
  try {
    reviewsData = await getProductReviews(params.handle)
    console.log("[v0] ProductPage - reviews fetched")
  } catch (error) {
    console.error("[v0] ProductPage - error fetching reviews:", error)
    reviewsData = { reviews: [], averageRating: 0, totalReviews: 0 }
  }

  let bundleData
  try {
    bundleData = await getBundleData(params.handle)
    console.log("[v0] ProductPage - bundle data fetched")
  } catch (error) {
    console.error("[v0] ProductPage - error fetching bundle data:", error)
    bundleData = null
  }

  let bundleProducts
  try {
    bundleProducts = await getComplementaryProducts(product)
    console.log("[v0] ProductPage - complementary products fetched")
  } catch (error) {
    console.error("[v0] ProductPage - error fetching complementary products:", error)
    bundleProducts = []
  }

  let relatedProducts
  try {
    relatedProducts = await getProducts({ first: 20 }).then((allProducts) =>
      allProducts
        .filter(
          (p) =>
            p.id !== product.id &&
            p.availableForSale &&
            (p.productType === product.productType || p.tags?.some((tag) => product.tags?.includes(tag))),
        )
        .slice(0, 4),
    )
    console.log("[v0] ProductPage - related products fetched:", relatedProducts.length)
  } catch (error) {
    console.error("[v0] ProductPage - error fetching related products:", error)
    relatedProducts = []
  }

  let fallbackProducts
  try {
    fallbackProducts = await getProducts({ first: 30 }).then((allProducts) =>
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
    console.log("[v0] ProductPage - fallback products fetched:", fallbackProducts.length)
  } catch (error) {
    console.error("[v0] ProductPage - error fetching fallback products:", error)
    fallbackProducts = []
  }

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

  console.log("[v0] ProductPage - rendering component")

  return (
    <main className="min-h-screen bg-background">
      <StructuredData data={productSchema} />
      <StructuredData data={breadcrumbSchema} />
      <ProductSeo product={product} />
      <ProductDetailsDreamCloud
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
