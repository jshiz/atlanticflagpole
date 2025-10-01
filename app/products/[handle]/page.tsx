import { notFound } from "next/navigation"
import { getProduct } from "@/lib/shopify"
import { ProductDetails } from "@/components/products/product-details"

interface ProductPageProps {
  params: {
    handle: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <ProductDetails product={product} />
    </main>
  )
}
