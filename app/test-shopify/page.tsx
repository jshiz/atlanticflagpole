import { getProducts, getCollections } from "@/lib/shopify"

export default async function TestShopifyPage() {
  let products = []
  let collections = []
  let error = null

  try {
    console.log("[v0] Fetching products from Shopify...")
    products = await getProducts({ first: 5 })
    console.log("[v0] Products fetched:", products.length)

    console.log("[v0] Fetching collections from Shopify...")
    collections = await getCollections(5)
    console.log("[v0] Collections fetched:", collections.length)
  } catch (e) {
    console.error("[v0] Shopify connection error:", e)
    error = e instanceof Error ? e.message : "Unknown error"
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-serif text-4xl font-bold text-foreground">Shopify Connection Test</h1>

        {error ? (
          <div className="rounded-lg border border-red-500 bg-red-50 p-6">
            <h2 className="mb-2 text-xl font-bold text-red-900">Connection Error</h2>
            <p className="text-red-700">{error}</p>
            <div className="mt-4 text-sm text-red-600">
              <p>Please check:</p>
              <ul className="ml-4 mt-2 list-disc">
                <li>SHOPIFY_STORE_DOMAIN is set correctly</li>
                <li>SHOPIFY_STOREFRONT_ACCESS_TOKEN is valid</li>
                <li>Your Shopify store is accessible</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 rounded-lg border border-green-500 bg-green-50 p-6">
              <h2 className="mb-2 text-xl font-bold text-green-900">Connection Successful!</h2>
              <p className="text-green-700">
                Found {products.length} products and {collections.length} collections
              </p>
            </div>

            {collections.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">Collections</h2>
                <div className="space-y-4">
                  {collections.map((collection) => (
                    <div key={collection.id} className="rounded-lg border border-gray-200 bg-card p-4">
                      <h3 className="font-semibold text-card-foreground">{collection.title}</h3>
                      <p className="text-sm text-muted-foreground">Handle: {collection.handle}</p>
                      {collection.description && (
                        <p className="mt-2 text-sm text-card-foreground">{collection.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {products.length > 0 && (
              <div>
                <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">Products</h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="rounded-lg border border-gray-200 bg-card p-4">
                      <div className="flex gap-4">
                        {product.images.edges[0] && (
                          <img
                            src={product.images.edges[0].node.url || "/placeholder.svg"}
                            alt={product.images.edges[0].node.altText || product.title}
                            className="h-24 w-24 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-card-foreground">{product.title}</h3>
                          <p className="text-sm text-muted-foreground">Handle: {product.handle}</p>
                          <p className="mt-1 text-lg font-bold text-primary">
                            ${product.priceRange.minVariantPrice.amount}{" "}
                            {product.priceRange.minVariantPrice.currencyCode}
                          </p>
                          {product.description && (
                            <p className="mt-2 line-clamp-2 text-sm text-card-foreground">{product.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
