import Script from "next/script"

/**
 * Judge.me Platform Script
 * This script initializes Judge.me widgets on the headless site.
 * Required for all Judge.me widgets to function properly.
 *
 * Note: This script will only load if Judge.me API token is configured.
 * This prevents script errors when OAuth setup is incomplete.
 */
export function JudgeMePlatformScript() {
  const apiToken = process.env.JUDGEME_API_TOKEN

  // Don't load Judge.me scripts if not configured
  if (!apiToken) {
    return null
  }

  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "atlantic-flag-and-pole-inc.myshopify.com"

  return (
    <>
      {/* Judge.me Platform Initialization Script */}
      <Script
        id="judgeme-platform-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.jdgm = window.jdgm || {};
            window.jdgm.SHOP_DOMAIN = '${shopDomain}';
            window.jdgm.PLATFORM = 'headless';
          `,
        }}
      />

      {/* Judge.me Widget Loader Script */}
      <Script src={`https://cdn.judge.me/loader.js?shop=${shopDomain}`} strategy="lazyOnload" />
    </>
  )
}
