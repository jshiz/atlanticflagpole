"use client"

import { LeftDockDrawer } from "./left-dock-drawer"
import { useCart } from "@/components/cart/cart-context"

interface LeftDockDrawerClientProps {
  menuItems: Array<{
    title: string
    href?: string
    submenu?: Array<{ title: string; href: string }>
  }>
}

export function LeftDockDrawerClient({ menuItems }: LeftDockDrawerClientProps) {
  const { cart } = useCart()

  // Calculate cart count
  const cartCount =
    cart?.lines?.edges?.reduce((total, edge) => {
      return total + (edge.node.quantity || 0)
    }, 0) || 0

  return <LeftDockDrawer cartCount={cartCount} menuItems={menuItems} />
}
