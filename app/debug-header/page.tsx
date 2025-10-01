import { searchProducts } from "@/lib/shopify/catalog"

export default async function DebugHeaderPage() {
  const results: Record<string, any> = {}

  // Test the exact same tags the header uses
  const testTags = [
    "telescoping-flag-pole",
    "american-made-flagpole",
    "flagpole",
    "best-flag-pole",
    "american-flag",
    "15-star-flag",
    "historical-flag",
    "flag",
  ]

  for (const tag of testTags) {
    try {
      const data = await searchProducts({ tag, first: 6 })
      results[tag] = {
        count: data?.nodes?.length || 0,
        products: data?.nodes?.slice(0, 2).map((p: any) => ({
          title: p.title,
          handle: p.handle,
          tags: p.tags,
        })),
      }
    } catch (error) {
      results[tag] = { error: String(error) }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Header Debug - Tag Search Results</h1>

      <div className="space-y-6">
        {Object.entries(results).map(([tag, data]) => (
          <div key={tag} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Tag: "{tag}"</h2>
            {data.error ? (
              <div className="text-red-600">Error: {data.error}</div>
            ) : (
              <div>
                <p className="text-green-600 font-bold mb-2">Found {data.count} products</p>
                {data.products && data.products.length > 0 && (
                  <div className="space-y-2">
                    {data.products.map((product: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded">
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-gray-600">Handle: {product.handle}</p>
                        <p className="text-xs text-gray-500">Tags: {product.tags.join(", ")}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
