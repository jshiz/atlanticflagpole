export default function robots() {
  const base = "https://atlanticflagpole.vercel.app"
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/cart"],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
