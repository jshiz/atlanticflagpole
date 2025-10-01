"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { ShopifyCart } from "@/lib/shopify/types"
import { createCart, addCartLines, updateCartLines, removeCartLines, getCart } from "@/lib/shopify"

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

  // Load cart from localStorage on mount
  useEffect(() => {
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
          console.error("Error loading cart:", error)
          localStorage.removeItem(CART_ID_KEY)
        }
      }
    }
    loadCart()
  }, [])

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      setLoading(true)
      try {
        let currentCart = cart

        // Create cart if it doesn't exist
        if (!currentCart) {
          currentCart = await createCart()
          localStorage.setItem(CART_ID_KEY, currentCart.id)
        }

        // Add item to cart
        const updatedCart = await addCartLines(currentCart.id, [
          {
            merchandiseId: variantId,
            quantity,
          },
        ])

        setCart(updatedCart)
        console.log("[v0] Added to cart")
      } catch (error) {
        console.error("Error adding to cart:", error)
      } finally {
        setLoading(false)
      }
    },
    [cart],
  )

  const updateCartLine = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return

      setLoading(true)
      try {
        const updatedCart = await updateCartLines(cart.id, [{ id: lineId, quantity }])
        setCart(updatedCart)
        console.log("[v0] Cart updated")
      } catch (error) {
        console.error("Error updating cart:", error)
      } finally {
        setLoading(false)
      }
    },
    [cart],
  )

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cart) return

      setLoading(true)
      try {
        const updatedCart = await removeCartLines(cart.id, [lineId])
        setCart(updatedCart)
        console.log("[v0] Item removed from cart")
      } catch (error) {
        console.error("Error removing from cart:", error)
      } finally {
        setLoading(false)
      }
    },
    [cart],
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
