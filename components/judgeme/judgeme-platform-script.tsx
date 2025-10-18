import Script from "next/script"

/**
 * Judge.me Platform Script
 * This script initializes Judge.me widgets on the headless site.
 * Required for all Judge.me widgets to function properly.
 */
export function JudgeMePlatformScript() {
  const apiToken = process.env.JUDGEME_API_TOKEN

  if (!apiToken) {
    console.log("[v0] Judge.me Platform Script - Skipping load (no API token)")
    return null
  }

  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "atlantic-flag-and-pole-inc.myshopify.com"
  const publicToken = "XFfCjOfRCyY7W7TCYv-V-tt_Vrc"

  console.log("[v0] Judge.me Platform Script - Loading with API Token")

  return (
    <>
      <Script
        id="judgeme-platform-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              window.jdgm = window.jdgm || {};
              window.jdgm.SHOP_DOMAIN = '${shopDomain}';
              window.jdgm.PLATFORM = 'shopify';
              window.jdgm.PUBLIC_TOKEN = '${publicToken}';
              console.log('[v0] Judge.me platform initialized with PUBLIC_TOKEN');
            } catch (error) {
              console.error('[v0] Judge.me platform init error:', error);
            }
          `,
        }}
      />

      <Script
        src="https://cdnwidget.judge.me/widget_preloader.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("[v0] Judge.me widget preloader loaded successfully")
        }}
        onError={(e) => {
          console.error("[v0] Judge.me widget preloader failed to load:", e)
        }}
      />
    </>
  )
}
