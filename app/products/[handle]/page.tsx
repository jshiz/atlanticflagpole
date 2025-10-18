import { notFound } from "next/navigation"
import { getProduct, getProducts } from "@/lib/shopify"
import { ProductDetails } from "@/components/products/product-details"
import ProductSeo from "@/components/product-seo"
import { getProductReviews } from "@/lib/shopify/reviews"
import { getBundleData } from "@/lib/shopify/bundles"
import type { Metadata } from "next"

export const revalidate = 3600 // Revalidate every hour

interface ProductPageProps {
  params: {
    handle: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.handle)
  if (!product) return {}

  const images = product.images?.edges ? product.images.edges.map((edge) => edge.node) : []
  const img = images[0]?.url
  const title = `${product.title} | Atlantic Flagpole`
  const description = product.description?.slice(0, 150) ?? "Atlantic Flagpole"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://atlanticflagpole.vercel.app/products/${params.handle}`,
      images: img ? [{ url: img, width: 1200, height: 1200, alt: product.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: img ? [img] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  console.log("[v0] Loading product page:", params.handle)

  const product = await getProduct(params.handle)

  if (!product) {
    notFound()
  }

  const reviewsData = await getProductReviews(params.handle)

  const bundleData = await getBundleData(params.handle)

  if (bundleData?.includesPremier) {
    console.log("[v0] Analytics: bundle_view", {
      product: params.handle,
      bundleType: bundleData.bundleType || "premier_kit",
      componentCount: bundleData.components.length,
    })
  }

  const allProducts = await getProducts({ first: 20 })
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.productType === product.productType || p.tags?.some((tag) => product.tags?.includes(tag))),
    )
    .slice(0, 4)

  const bundleProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 2)

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <ProductSeo product={product} />
      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
        bundleProducts={bundleProducts}
        reviewsData={reviewsData}
        bundleData={bundleData}
      />
    </main>
  )
}
