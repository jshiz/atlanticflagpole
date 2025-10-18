import Script from "next/script"

/**
 * Judge.me Platform Script
 * This script initializes Judge.me widgets on the headless site.
 * Required for all Judge.me widgets to function properly.
 *
 * Note: This script will only load if Judge.me is properly configured.
 * The script errors are caught and handled gracefully.
 */
export function JudgeMePlatformScript() {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "atlantic-flag-and-pole-inc.myshopify.com"

  const handleScriptError = (e: Error) => {
    // Silently handle Judge.me script errors
    // This is expected when Judge.me OAuth is not yet configured
    console.log("[v0] Judge.me script not loaded - OAuth setup may be incomplete")
  }

  return (
    <>
      {/* Judge.me Platform Initialization Script */}
      <Script
        id="judgeme-platform-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              window.jdgm = window.jdgm || {};
              window.jdgm.SHOP_DOMAIN = '${shopDomain}';
              window.jdgm.PLATFORM = 'headless';
            } catch (e) {
              console.log('[v0] Judge.me initialization skipped');
            }
          `,
        }}
      />

      {/* Judge.me Widget Loader Script */}
      <Script
        src={`https://cdn.judge.me/loader.js?shop=${shopDomain}`}
        strategy="lazyOnload"
        onError={handleScriptError}
      />
    </>
  )
}
