import { getCollectionProducts } from "@/lib/shopify"
import { ProductCard } from "@/components/products/product-card"

export default async function ProductsPage() {
  const products = await getCollectionProducts()

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Our Premium Flagpoles</h1>
          <p className="text-lg text-[#0B1C2C]/70 max-w-2xl mx-auto">
            Handcrafted in the USA with a lifetime guarantee. The last flagpole you will ever need.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#0B1C2C]/70">No products available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
