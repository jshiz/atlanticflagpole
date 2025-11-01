"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { ShopifyCart } from "@/lib/shopify/types"
import { createCart, addCartLines, updateCartLines, removeCartLines, getCart } from "@/lib/shopify"
import { toast } from "@/hooks/use-toast"

interface CartContextType {
  cart: ShopifyCart | null
  loading: boolean
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  updateCartLine: (lineId: string, quantity: number) => Promise<void>
  removeFromCart: (lineId: string) => Promise<void>
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_ID_KEY = "shopify_cart_id"

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadCart = async () => {
      const cartId = localStorage.getItem(CART_ID_KEY)
      if (cartId) {
        try {
          const existingCart = await getCart(cartId)
          if (existingCart) {
            setCart(existingCart)
          } else {
            localStorage.removeItem(CART_ID_KEY)
          }
        } catch (error) {
          console.error("[v0] Error loading cart:", error)
          localStorage.removeItem(CART_ID_KEY)
        }
      }
    }
    loadCart()
  }, [mounted])

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      if (loading) {
        console.log("[v0] Add to cart already in progress")
        return
      }

      setLoading(true)
      try {
        let currentCart = cart

        if (!currentCart) {
          currentCart = await createCart()
          localStorage.setItem(CART_ID_KEY, currentCart.id)
        }

        const updatedCart = await addCartLines(currentCart.id, [
          {
            merchandiseId: variantId,
            quantity,
          },
        ])

        setCart(updatedCart)
        console.log("[v0] Added to cart")

        toast({
          title: "Added to cart!",
          description: `${quantity} item${quantity > 1 ? "s" : ""} added to your cart`,
        })
      } catch (error) {
        console.error("[v0] Error adding to cart:", error)
        toast({
          title: "Failed to add to cart",
          description: "Please try again",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    },
    [cart, loading],
  )

  const updateCartLine = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return

      if (loading) {
        console.log("[v0] Update cart already in progress")
        return
      }

      setLoading(true)
      try {
        const updatedCart = await updateCartLines(cart.id, [{ id: lineId, quantity }])
        setCart(updatedCart)
        console.log("[v0] Cart updated")
        toast({
          title: "Cart updated",
        })
      } catch (error) {
        console.error("[v0] Error updating cart:", error)
        toast({
          title: "Failed to update cart",
          description: "Please try again",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    },
    [cart, loading],
  )

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cart) return

      if (loading) {
        console.log("[v0] Remove from cart already in progress")
        return
      }

      setLoading(true)
      try {
        const updatedCart = await removeCartLines(cart.id, [lineId])
        setCart(updatedCart)
        console.log("[v0] Item removed from cart")
        toast({
          title: "Item removed from cart",
        })
      } catch (error) {
        console.error("[v0] Error removing from cart:", error)
        toast({
          title: "Failed to remove item",
          description: "Please try again",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    },
    [cart, loading],
  )

  const clearCart = useCallback(() => {
    setCart(null)
    localStorage.removeItem(CART_ID_KEY)
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartLine,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
