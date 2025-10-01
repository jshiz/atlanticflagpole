// Normalize Shopify menu URLs to local paths
export function normalizeMenuUrl(url: string): string {
  if (!url) return "/"

  try {
    const u = new URL(url)

    // Rewrite Shopify Online Store URLs to headless routes
    if (u.pathname.startsWith("/products/")) {
      return u.pathname
    }

    if (u.pathname.startsWith("/collections/")) {
      return u.pathname + u.search
    }

    if (u.pathname.startsWith("/pages/")) {
      // Convert /pages/about to /about
      return u.pathname.replace("/pages/", "/") + u.search
    }

    return u.pathname + u.search
  } catch {
    // Already a relative URL
    return url
  }
}

export function normalizeMenu(menu: any) {
  if (!menu) return null

  const mapItem = (item: any) => ({
    ...item,
    url: normalizeMenuUrl(item.url),
    items: (item.items || []).map(mapItem),
  })

  return {
    ...menu,
    items: (menu.items || []).map(mapItem),
  }
}
