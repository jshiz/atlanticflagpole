"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { useCart } from "@/components/cart/cart-context"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  variantId: string
  availableForSale: boolean
  quantity?: number
}

export function AddToCartButton({ variantId, availableForSale, quantity = 1 }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    if (!availableForSale) return

    setIsAdding(true)
    try {
      await addToCart(variantId, quantity)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  if (!availableForSale) {
    return (
      <Button disabled className="w-full py-6 text-lg font-semibold">
        Out of Stock
      </Button>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white py-6 text-lg font-semibold"
    >
      {isAdding ? (
        <>
          <Loader className="w-5 h-5 mr-2" />
          Adding to Cart...
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
