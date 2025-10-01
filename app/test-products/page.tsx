export const dynamic = "force-dynamic"

export default async function TestProductsPage() {
  let data: any = null
  let error: string | null = null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/test-products`, {
      cache: "no-store",
    })
    data = await response.json()
  } catch (e: any) {
    error = e.message
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-8">Product Test</h1>

        {error ? (
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-red-800">{error}</p>
          </div>
        ) : data?.success ? (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">✓ Success! Found {data.count} Products</h2>
            <p className="text-green-800 mb-4">{data.message}</p>

            <h3 className="text-lg font-bold text-[#0B1C2C] mb-3">Sample Products:</h3>
            <div className="space-y-3">
              {data.products.map((product: any) => (
                <div key={product.id} className="bg-white rounded-lg p-4 border border-green-200">
                  <h4 className="font-bold text-[#0B1C2C]">{product.title}</h4>
                  <p className="text-sm text-[#0B1C2C]/60">Handle: {product.handle}</p>
                  {product.tags && product.tags.length > 0 && (
                    <p className="text-sm text-[#0B1C2C]/60">Tags: {product.tags.join(", ")}</p>
                  )}
                  {product.productType && <p className="text-sm text-[#0B1C2C]/60">Type: {product.productType}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
            <h2 className="text-xl font-bold text-yellow-600 mb-2">No Products Found</h2>
            <p className="text-yellow-800">{data?.error || "Unknown error"}</p>
          </div>
        )}
      </div>
    </main>
  )
}
