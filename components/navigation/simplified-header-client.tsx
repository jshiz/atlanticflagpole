"use client"

import { SimplifiedHeader } from "./simplified-header"
import { useCart } from "@/components/cart/cart-context"

export function SimplifiedHeaderClient() {
  const { cart } = useCart()

  // Calculate cart count
  const cartCount =
    cart?.lines?.edges?.reduce((total, edge) => {
      return total + (edge.node.quantity || 0)
    }, 0) || 0

  return <SimplifiedHeader cartCount={cartCount} />
}
