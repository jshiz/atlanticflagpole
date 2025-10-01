import { getMenu } from "@/lib/menus"
import type { MenuItem } from "@/lib/menus"

export const dynamic = "force-dynamic"
export const revalidate = 0

function MenuItemTree({ item, level = 0 }: { item: MenuItem; level?: number }) {
  const indent = level * 20

  return (
    <div style={{ marginLeft: `${indent}px` }} className="py-1">
      <div className="flex items-center gap-2">
        <span className="font-medium">{item.title}</span>
        <span className="text-sm text-muted-foreground">→</span>
        <code className="text-xs bg-muted px-2 py-1 rounded">{item.url}</code>
      </div>
      {item.items && item.items.length > 0 && (
        <div className="mt-1">
          {item.items.map((child) => (
            <MenuItemTree key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default async function MenuPreviewPage() {
  const menuHandle = process.env.NEXT_PUBLIC_SHOPIFY_MAIN_MENU_HANDLE ?? "main-menu"
  const menu = await getMenu(menuHandle)

  if (!menu) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">Menu Preview</h1>
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
          <p className="font-semibold">Menu not found</p>
          <p className="text-sm mt-1">
            Could not fetch menu with handle: <code className="bg-destructive/20 px-1 rounded">{menuHandle}</code>
          </p>
          <p className="text-sm mt-2">
            Check that the menu exists in Shopify and the environment variable{" "}
            <code className="bg-destructive/20 px-1 rounded">NEXT_PUBLIC_SHOPIFY_MAIN_MENU_HANDLE</code> is set
            correctly.
          </p>
        </div>
      </div>
    )
  }

  const totalItems = menu.items.reduce((count, item) => {
    let total = 1
    if (item.items) {
      total += item.items.length
      item.items.forEach((child) => {
        if (child.items) total += child.items.length
      })
    }
    return count + total
  }, 0)

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Menu Preview</h1>
        <p className="text-muted-foreground">Visual preview of the Shopify menu structure and normalized URLs</p>
      </div>

      <div className="bg-muted/50 border rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Menu Handle:</span>{" "}
            <code className="bg-background px-2 py-1 rounded">{menuHandle}</code>
          </div>
          <div>
            <span className="font-semibold">Total Items:</span> {totalItems}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">Environment:</span>{" "}
            <code className="bg-background px-2 py-1 rounded text-xs">
              {process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}
            </code>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Menu Structure</h2>
        <div className="space-y-2">
          {menu.items.map((item) => (
            <MenuItemTree key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted/30 border rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Use <code className="bg-background px-1 rounded">/api/debug-menu</code> to see the raw
          JSON response from Shopify.
        </p>
      </div>
    </div>
  )
}
