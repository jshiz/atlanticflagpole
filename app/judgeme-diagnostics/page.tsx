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

  const tokenLength = apiToken?.length || 0
  const isTokenLikelyValid = tokenLength > 20 && tokenLength < 100

  let apiTestResult = null
  let apiTestError = null

  if (hasShopDomain && hasApiToken) {
    try {
      const url = `https://judge.me/api/v1/reviews?shop_domain=${shopDomain}&api_token=${apiToken}&per_page=1`
      const response = await fetch(url, {
        cache: "no-store",
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
          if (data.error) {
            apiTestResult.isError = true
            apiTestResult.errorMessage = data.error
          }
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
              <div
                className={`w-3 h-3 rounded-full ${hasApiToken && isTokenLikelyValid ? "bg-green-500" : hasApiToken ? "bg-yellow-500" : "bg-red-500"}`}
              />
              <span className="font-mono text-sm">JUDGEME_API_TOKEN</span>
              <span className="text-muted-foreground">
                {hasApiToken ? (
                  <>
                    {isTokenLikelyValid ? "✓" : "⚠"} Set ({tokenLength} chars: {apiToken?.substring(0, 10)}...
                    {apiToken?.substring(tokenLength - 4)})
                  </>
                ) : (
                  "✗ Not set"
                )}
              </span>
            </div>
            {hasApiToken && !isTokenLikelyValid && (
              <div className="ml-6 text-sm text-yellow-600 dark:text-yellow-400">
                ⚠ Token length ({tokenLength} chars) seems unusual. Verify you copied the complete Private API Token.
              </div>
            )}
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
                    className={`font-mono text-lg ${apiTestResult.status === 200 && apiTestResult.isJson && !apiTestResult.isError ? "text-green-600" : "text-red-600"}`}
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

              {apiTestResult.isJson && apiTestResult.data && !apiTestResult.isError ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
                  <p className="text-green-800 dark:text-green-200 font-semibold mb-2">✓ API Connected Successfully!</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                    Judge.me API is responding correctly with JSON data.
                  </p>
                  <details className="text-xs">
                    <summary className="cursor-pointer text-green-600 dark:text-green-400 mb-2">
                      Show API Response
                    </summary>
                    <pre className="overflow-auto bg-background p-2 rounded max-h-60">
                      {JSON.stringify(apiTestResult.data, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : apiTestResult.isError ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
                  <p className="text-red-800 dark:text-red-200 font-semibold mb-2">✗ API Authentication Failed</p>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    Judge.me returned an error: <span className="font-mono">{apiTestResult.errorMessage}</span>
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    This usually means the API token or shop domain is incorrect.
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
                  <p className="text-red-800 dark:text-red-200 font-semibold mb-2">✗ API Authentication Failed</p>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    Judge.me returned HTML instead of JSON data. This means authentication failed.
                  </p>
                  <details className="text-xs">
                    <summary className="cursor-pointer text-red-600 dark:text-red-400 mb-2">
                      Show Response Preview
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
              <p className="text-muted-foreground">You need to get your Private API Token from Judge.me:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Go to your Judge.me admin dashboard</li>
                <li>Navigate to Settings → Integrations</li>
                <li>Look for "View API tokens" or "Judge.me API"</li>
                <li>
                  Copy your <strong>Private API Token</strong> (not the Public one)
                </li>
                <li>Add it as JUDGEME_API_TOKEN in Vercel environment variables</li>
                <li>Redeploy your application</li>
              </ol>
            </div>
          ) : !apiTestResult?.isJson || apiTestResult?.isError ? (
            <div className="space-y-3">
              <p className="text-muted-foreground font-semibold">
                Your API token or shop domain appears to be incorrect:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-4 space-y-2">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Expected Values:</p>
                <div className="text-sm space-y-1 font-mono text-blue-800 dark:text-blue-200">
                  <p>Shop Domain: atlantic-flag-and-pole-inc.myshopify.com</p>
                  <p>API Token: Private API Token (starts with "u-" and is about 27 characters)</p>
                </div>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Verify you're using the <strong>Private API Token</strong> (not Public, not OAuth Client ID/Secret)
                </li>
                <li>The Private API Token should start with "u-" and be about 27 characters long</li>
                <li>
                  Confirm the shop domain is exactly:{" "}
                  <code className="bg-muted px-1 rounded">atlantic-flag-and-pole-inc.myshopify.com</code>
                </li>
                <li>Double-check the token was copied correctly (no extra spaces or line breaks)</li>
                <li>Update the JUDGEME_API_TOKEN environment variable in Vercel</li>
                <li>Redeploy your application</li>
              </ol>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
              <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
                ✓ Judge.me is configured correctly and working!
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your site should now display live review data from Judge.me. Check your homepage and product pages to
                see the widgets in action.
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
