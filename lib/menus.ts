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
      return `/products/${handle}`
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

const FALLBACK_MENU: Menu = {
  items: [
    { id: "1", title: "Home", url: "/" },
    { id: "2", title: "Products", url: "/products" },
    { id: "3", title: "Collections", url: "/collections" },
    { id: "4", title: "About", url: "/about" },
    { id: "5", title: "Contact", url: "/contact" },
  ],
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, timeout = 10000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      return response
    } catch (error: any) {
      const isLastRetry = i === retries - 1
      const isTimeout = error.name === "AbortError"

      console.error(`[v0] Menu fetch attempt ${i + 1}/${retries} failed:`, error.message)

      if (isLastRetry) {
        throw new Error(isTimeout ? "Request timeout" : error.message)
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, i) * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw new Error("Max retries exceeded")
}

/**
 * Fetches a menu from Shopify by handle
 * @param handle - The menu handle (e.g., "main-menu", "footer")
 * @returns Normalized menu data or fallback menu if fetch fails
 */
export async function getMenu(handle: string): Promise<Menu | null> {
  try {
    const res = await fetchWithRetry(
      `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: MENU_QUERY,
          variables: { handle },
        }),
        next: { revalidate: 3600, tags: ["menus"] },
      },
      3, // 3 retries
      10000, // 10 second timeout
    )

    if (!res.ok) {
      console.error(`[v0] Failed to fetch menu "${handle}":`, res.statusText)
      console.log(`[v0] Using fallback menu for "${handle}"`)
      return FALLBACK_MENU
    }

    const json = await res.json()

    if (json.errors) {
      console.error(`[v0] GraphQL errors fetching menu "${handle}":`, json.errors)
      console.log(`[v0] Using fallback menu for "${handle}"`)
      return FALLBACK_MENU
    }

    const menu: ShopifyMenu | null = json.data?.menu

    if (!menu) {
      console.warn(`[v0] Menu "${handle}" not found in Shopify`)
      console.log(`[v0] Using fallback menu for "${handle}"`)
      return FALLBACK_MENU
    }

    // Normalize all menu items
    const normalizedItems = menu.items.map(normalizeMenuItem)

    console.log(`[v0] Successfully fetched menu "${handle}" with ${normalizedItems.length} items`)

    return {
      items: normalizedItems,
    }
  } catch (error) {
    console.error(`[v0] Error fetching menu "${handle}":`, error)
    console.log(`[v0] Using fallback menu for "${handle}" due to error`)
    return FALLBACK_MENU
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
