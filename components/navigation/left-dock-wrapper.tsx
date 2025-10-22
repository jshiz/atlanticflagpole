import { getMenu } from "@/lib/menus"
import { LeftDockDrawerClient } from "./left-dock-drawer-client"

export async function LeftDockWrapper() {
  try {
    const menuData = await getMenu("main-menu-new")

    // Transform menu data into simplified structure for drawer
    const menuItems =
      menuData?.items?.map((item) => ({
        title: item.title,
        href: item.url || undefined,
        submenu: item.items?.map((subItem) => ({
          title: subItem.title,
          href: subItem.url,
        })),
      })) || []

    return <LeftDockDrawerClient menuItems={menuItems} />
  } catch (error) {
    console.error("[v0] Error loading menu for drawer:", error)
    // Return drawer with fallback menu
    return (
      <LeftDockDrawerClient
        menuItems={[
          { title: "Home", href: "/" },
          { title: "Flagpoles", href: "/collections/flagpoles" },
          { title: "Flags", href: "/collections/flags" },
          { title: "Help Center", href: "/help-center" },
        ]}
      />
    )
  }
}
