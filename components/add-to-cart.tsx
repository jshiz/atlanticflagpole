"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"

export default function AddToCart({
  variantId,
  action,
}: {
  variantId: string
  action: (variantId: string, qty?: number) => Promise<any>
}) {
  const [pending, start] = useTransition()

  return (
    <Button
      disabled={pending}
      onClick={() => {
        console.log("[v0] Add to cart clicked, variantId:", variantId)
        start(() => action(variantId, 1))
      }}
      className="bg-gold hover:bg-gold/90 text-navy font-semibold"
    >
      {pending ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
