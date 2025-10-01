import Link from "next/link"

export default function DiagnosticsPage() {
  const envVars = {
    SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "NOT SET",
    SHOPIFY_STOREFRONT_TOKEN: process.env.SHOPIFY_STOREFRONT_TOKEN ? "✓ SET" : "✗ NOT SET",
    SHOPIFY_API_VERSION: process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07",
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-8">Shopify Integration Diagnostics</h1>

        <div className="space-y-6">
          {/* Environment Variables */}
          <section className="bg-white rounded-lg border border-[#0B1C2C]/10 p-6">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Environment Variables</h2>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-[#0B1C2C]/60">SHOPIFY_STORE_DOMAIN:</span>
                <span className="font-semibold">{envVars.SHOPIFY_STORE_DOMAIN}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0B1C2C]/60">SHOPIFY_STOREFRONT_TOKEN:</span>
                <span className="font-semibold">{envVars.SHOPIFY_STOREFRONT_TOKEN}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0B1C2C]/60">SHOPIFY_API_VERSION:</span>
                <span className="font-semibold">{envVars.SHOPIFY_API_VERSION}</span>
              </div>
            </div>
          </section>

          {/* API Test Links */}
          <section className="bg-white rounded-lg border border-[#0B1C2C]/10 p-6">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">API Test Endpoints</h2>
            <p className="text-[#0B1C2C]/70 mb-4">
              Click these links to test your Shopify API connection. If you see JSON data, your connection is working!
            </p>
            <div className="space-y-3">
              <Link
                href="/api/debug-products"
                target="_blank"
                className="block px-4 py-3 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#0B1C2C]/90 transition-colors"
              >
                Test Products API →
              </Link>
              <Link
                href="/api/shopify/test-products"
                target="_blank"
                className="block px-4 py-3 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#0B1C2C]/90 transition-colors"
              >
                Test Products (Alternative) →
              </Link>
              <Link
                href="/api/shopify/test-collections"
                target="_blank"
                className="block px-4 py-3 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#0B1C2C]/90 transition-colors"
              >
                Test Collections API →
              </Link>
            </div>
          </section>

          {/* Common Issues */}
          <section className="bg-white rounded-lg border border-[#0B1C2C]/10 p-6">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Common Issues & Solutions</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <div>
                <h3 className="font-semibold text-[#0B1C2C] mb-2">401 Unauthorized Error</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Check that SHOPIFY_STOREFRONT_TOKEN is set in Vercel environment variables</li>
                  <li>Verify the token is valid in your Shopify admin</li>
                  <li>Make sure the token has Storefront API access</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1C2C] mb-2">No Products Found</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Products must be published to the "Headless" sales channel</li>
                  <li>Go to Shopify Admin → Products → Select products → More actions → Manage</li>
                  <li>Enable the "Headless" channel for your products</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1C2C] mb-2">JSON Parsing Errors</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Usually caused by authentication issues (401/403 responses)</li>
                  <li>Check the API test endpoints above to see the actual error</li>
                  <li>Look for HTML error pages instead of JSON responses</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="bg-white rounded-lg border border-[#0B1C2C]/10 p-6">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Next Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-[#0B1C2C]/70">
              <li>Test the API endpoints above to verify your connection</li>
              <li>If you see errors, check the Common Issues section</li>
              <li>
                Once working, visit{" "}
                <Link href="/products" className="text-[#0B1C2C] underline">
                  /products
                </Link>{" "}
                to see your product catalog
              </li>
              <li>
                Configure your Shopify Navigation menu to link to filtered product pages like{" "}
                <code className="bg-[#0B1C2C]/5 px-2 py-1 rounded text-sm">
                  /products?type=Flagpole&tag=Telescoping
                </code>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </main>
  )
}
