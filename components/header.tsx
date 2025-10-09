import { getMenu } from "@/lib/menus"
import { HeaderClient } from "@/components/header-client"

export async function Header() {
  const menuHandle = "main-menu-new"

  const menuData = await getMenu(menuHandle)

  if (!menuData?.items) {
    console.error(`[v0] ❌ Failed to load menu "${menuHandle}"`)
    return null
  }

  return <HeaderClient menuData={menuData} />
}
