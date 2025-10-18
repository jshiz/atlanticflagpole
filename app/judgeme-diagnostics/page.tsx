import { Suspense } from "react"

async function JudgemeDiagnostics() {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const apiToken = process.env.JUDGEME_API_TOKEN
  const clientId = process.env.JUDGEME_CLIENT_ID
  const clientSecret = process.env.JUDGEME_CLIENT_SECRET

  const hasShopDomain = !!shopDomain
  const hasApiToken = !!apiToken
  const hasClientId = !!clientId
  const hasClientSecret = !!clientSecret

  let apiTestResult = null
  let apiTestError = null

  if (hasShopDomain && hasApiToken) {
    try {
      const url = `https://judge.me/api/v1/reviews?shop_domain=${shopDomain}&per_page=1`
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      })
      const contentType = response.headers.get("content-type")

      apiTestResult = {
        status: response.status,
        statusText: response.statusText,
        contentType,
        isJson: contentType?.includes("application/json"),
      }

      if (contentType?.includes("application/json")) {
        try {
          const data = await response.json()
          apiTestResult.data = data
        } catch (e) {
          apiTestError = "Failed to parse JSON response"
        }
      } else {
        const text = await response.text()
        apiTestResult.htmlPreview = text.substring(0, 500)
      }
    } catch (error) {
      apiTestError = error instanceof Error ? error.message : String(error)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Judge.me Configuration Diagnostics</h1>
          <p className="text-muted-foreground">Check your Judge.me integration status</p>
        </div>

        {/* Environment Variables Status */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Environment Variables</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${hasShopDomain ? "bg-green-500" : "bg-red-500"}`} />
              <span className="font-mono text-sm">NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN</span>
              <span className="text-muted-foreground">{hasShopDomain ? `✓ Set (${shopDomain})` : "✗ Not set"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${hasApiToken ? "bg-green-500" : "bg-red-500"}`} />
              <span className="font-mono text-sm">JUDGEME_API_TOKEN</span>
              <span className="text-muted-foreground">
                {hasApiToken ? `✓ Set (${apiToken?.substring(0, 10)}...)` : "✗ Not set"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${hasClientId ? "bg-green-500" : "bg-yellow-500"}`} />
              <span className="font-mono text-sm">JUDGEME_CLIENT_ID</span>
              <span className="text-muted-foreground">{hasClientId ? "✓ Set (optional)" : "○ Not set (optional)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${hasClientSecret ? "bg-green-500" : "bg-yellow-500"}`} />
              <span className="font-mono text-sm">JUDGEME_CLIENT_SECRET</span>
              <span className="text-muted-foreground">
                {hasClientSecret ? "✓ Set (optional)" : "○ Not set (optional)"}
              </span>
            </div>
          </div>
        </div>

        {/* API Test Results */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">API Connection Test</h2>

          {!hasShopDomain || !hasApiToken ? (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                Cannot test API: Missing required environment variables
              </p>
            </div>
          ) : apiTestError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
              <p className="text-red-800 dark:text-red-200 font-semibold">API Test Failed</p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-2">{apiTestError}</p>
            </div>
          ) : apiTestResult ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Status Code</span>
                  <p
                    className={`font-mono text-lg ${apiTestResult.status === 200 ? "text-green-600" : "text-red-600"}`}
                  >
                    {apiTestResult.status} {apiTestResult.statusText}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Content Type</span>
                  <p className={`font-mono text-sm ${apiTestResult.isJson ? "text-green-600" : "text-red-600"}`}>
                    {apiTestResult.contentType}
                  </p>
                </div>
              </div>

              {apiTestResult.isJson && apiTestResult.data ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
                  <p className="text-green-800 dark:text-green-200 font-semibold mb-2">✓ API Connected Successfully!</p>
                  <pre className="text-xs overflow-auto bg-background p-2 rounded">
                    {JSON.stringify(apiTestResult.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
                  <p className="text-red-800 dark:text-red-200 font-semibold mb-2">
                    ✗ API Returned HTML Instead of JSON
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    This usually means your OAuth token is invalid, expired, or the authentication method is incorrect.
                  </p>
                  <details className="text-xs">
                    <summary className="cursor-pointer text-red-600 dark:text-red-400 mb-2">
                      Show HTML Response Preview
                    </summary>
                    <pre className="overflow-auto bg-background p-2 rounded max-h-40">{apiTestResult.htmlPreview}</pre>
                  </details>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Next Steps */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Next Steps</h2>

          {!hasApiToken ? (
            <div className="space-y-3">
              <p className="text-muted-foreground">You need to complete the OAuth flow to get your API token:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Visit the{" "}
                  <a
                    href={`https://judge.me/oauth/authorize?client_id=${clientId || "YOUR_CLIENT_ID"}&redirect_uri=${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"}/api/judgeme/callback&response_type=code`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Judge.me OAuth authorization page
                  </a>
                </li>
                <li>Authorize the connection</li>
                <li>Copy the access token from the callback page or Vercel logs</li>
                <li>Add it as JUDGEME_API_TOKEN in Vercel environment variables</li>
                <li>Redeploy your application</li>
              </ol>
            </div>
          ) : !apiTestResult?.isJson ? (
            <div className="space-y-3">
              <p className="text-muted-foreground">Your API token appears to be invalid or expired:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Verify the token is the OAuth access token (not client ID or secret)</li>
                <li>Re-run the OAuth flow to get a new token if needed</li>
                <li>Update the JUDGEME_API_TOKEN environment variable in Vercel</li>
                <li>Make sure the token is added as a server-side variable (not NEXT_PUBLIC_)</li>
                <li>Redeploy your application</li>
              </ol>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
              <p className="text-green-800 dark:text-green-200">
                ✓ Judge.me is configured correctly and working! Your site should now display live review data.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function JudgemeDiagnosticsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background p-8 flex items-center justify-center">
          <p className="text-muted-foreground">Loading diagnostics...</p>
        </div>
      }
    >
      <JudgemeDiagnostics />
    </Suspense>
  )
}
