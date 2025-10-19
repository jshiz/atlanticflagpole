const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.vercel.app"

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/account/", "/checkout"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/cart", "/account/", "/checkout"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
