import { notFound } from "next/navigation"
import { getProduct, getProducts } from "@/lib/shopify"
import { ProductDetails } from "@/components/products/product-details"
import ProductSeo from "@/components/product-seo"
import type { Metadata } from "next"

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
  const product = await getProduct(params.handle)

  if (!product) {
    notFound()
  }

  const allProducts = await getProducts({ first: 20 })
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.productType === product.productType || p.tags?.some((tag) => product.tags?.includes(tag))),
    )
    .slice(0, 4)

  // Get potential bundle products (similar or complementary items)
  const bundleProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 2)
  // </CHANGE>

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <ProductSeo product={product} />
      <ProductDetails product={product} relatedProducts={relatedProducts} bundleProducts={bundleProducts} />
      {/* </CHANGE> */}
    </main>
  )
}
