const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ""
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || ""
const SHOPIFY_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07"

const MENU_QUERY = `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      id
      handle
      title
      items {
        id
        title
        url
        type
        items {
          id
          title
          url
          type
          items {
            id
            title
            url
            type
          }
        }
      }
    }
  }
`

interface ShopifyMenuItem {
  id: string
  title: string
  url: string
  type: string
  items?: ShopifyMenuItem[]
}

interface ShopifyMenu {
  id: string
  handle: string
  title: string
  items: ShopifyMenuItem[]
}

export interface MenuItem {
  id: string
  title: string
  url: string
  items?: MenuItem[]
}

export interface Menu {
  items: MenuItem[]
}

/**
 * Cleans title by removing pipe syntax helper (e.g., "Title|tag=value" → "Title")
 */
function cleanTitle(title: string): string {
  const pipeIndex = title.indexOf("|")
  return pipeIndex > -1 ? title.substring(0, pipeIndex).trim() : title
}

/**
 * Extracts query params from title pipe syntax (e.g., "Title|tag=value&type=Flagpole")
 */
function extractQueryFromTitle(title: string): string | null {
  const pipeIndex = title.indexOf("|")
  if (pipeIndex === -1) return null

  const queryString = title.substring(pipeIndex + 1).trim()
  if (!queryString) return null

  // Validate and normalize query params
  try {
    const params = new URLSearchParams(queryString)
    return params.toString()
  } catch {
    return null
  }
}

/**
 * Normalizes Shopify menu item URLs to Next.js routes
 * Maps Shopify URLs to our app's routing structure
 */
function normalizeMenuUrl(url: string, type: string, title: string): string {
  const queryFromTitle = extractQueryFromTitle(title)
  if (queryFromTitle) {
    return `/products?${queryFromTitle}`
  }

  if (url.startsWith("/products?")) {
    return url
  }

  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname

    // Collection URLs: /collections/handle → /products?collection=handle
    if (pathname.startsWith("/collections/")) {
      const handle = pathname.replace("/collections/", "")
      return `/products?collection=${encodeURIComponent(handle)}`
    }

    if (pathname.startsWith("/products/")) {
      const handle = pathname.replace("/products/", "")
      return `/product/${handle}`
    }

    // Page URLs: /pages/handle → /handle
    if (pathname.startsWith("/pages/")) {
      return pathname.replace("/pages/", "/")
    }

    // Blog URLs: /blogs/handle → /blog/handle
    if (pathname.startsWith("/blogs/")) {
      return pathname.replace("/blogs/", "/blog/")
    }

    // Article URLs: /blogs/blog/handle → /blog/handle
    if (pathname.includes("/blogs/")) {
      const parts = pathname.split("/blogs/")
      if (parts[1]) {
        const articlePath = parts[1].split("/").slice(1).join("/")
        return `/blog/${articlePath}`
      }
    }

    if (pathname.startsWith("/")) {
      return pathname
    }

    // External URLs - return as-is
    return url
  } catch (error) {
    // If URL parsing fails, return as-is
    console.warn(`[v0] Failed to parse menu URL: ${url}`, error)
    return url
  }
}

/**
 * Recursively normalizes menu items
 */
function normalizeMenuItem(item: ShopifyMenuItem): MenuItem {
  return {
    id: item.id,
    title: cleanTitle(item.title), // Clean title to remove pipe syntax
    url: normalizeMenuUrl(item.url, item.type, item.title), // Pass title for pipe syntax extraction
    items: item.items?.map(normalizeMenuItem),
  }
}

/**
 * Fetches a menu from Shopify by handle
 * @param handle - The menu handle (e.g., "main-menu", "footer")
 * @returns Normalized menu data or null if not found
 */
export async function getMenu(handle: string): Promise<Menu | null> {
  try {
    const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: MENU_QUERY,
        variables: { handle },
      }),
      cache: "no-store", // Disable caching to always fetch fresh menu data
    })

    if (!res.ok) {
      console.error(`[v0] Failed to fetch menu "${handle}":`, res.statusText)
      return null
    }

    const json = await res.json()

    if (json.errors) {
      console.error(`[v0] GraphQL errors fetching menu "${handle}":`, json.errors)
      return null
    }

    const menu: ShopifyMenu | null = json.data?.menu

    if (!menu) {
      console.warn(`[v0] Menu "${handle}" not found in Shopify`)
      return null
    }

    // Normalize all menu items
    const normalizedItems = menu.items.map(normalizeMenuItem)

    console.log(`[v0] Successfully fetched menu "${handle}" with ${normalizedItems.length} items`)

    return {
      items: normalizedItems,
    }
  } catch (error) {
    console.error(`[v0] Error fetching menu "${handle}":`, error)
    return null
  }
}

/**
 * Fetches multiple menus in parallel
 */
export async function getMenus(handles: string[]): Promise<Record<string, Menu | null>> {
  const results = await Promise.all(handles.map((handle) => getMenu(handle)))

  return handles.reduce(
    (acc, handle, index) => {
      acc[handle] = results[index]
      return acc
    },
    {} as Record<string, Menu | null>,
  )
}
