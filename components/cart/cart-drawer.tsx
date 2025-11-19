"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X, Plus, Minus, ArrowRight } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart/cart-context"
import { cn } from "@/lib/utils"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateLineQuantity, removeLineItem } = useCart()
  
  const itemCount = cart?.totalQuantity || 0
  const subtotal = cart?.cost?.subtotalAmount?.amount || "0"
  const lines = cart?.lines || []

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[90vw] max-w-md h-full p-0 flex flex-col border-l-4 border-[#C8A55C] z-[200] rounded-l-3xl"
      >
        <SheetHeader className="p-4 bg-[#0B1C2C] text-white border-b-2 border-[#C8A55C]/30 shrink-0 rounded-tl-3xl">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white flex items-center gap-2 text-lg font-bold">
              <ShoppingCart className="w-5 h-5 text-[#C8A55C]" />
              Cart ({itemCount})
            </SheetTitle>
            <button 
              onClick={onClose} 
              className="text-white hover:text-[#C8A55C] transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {itemCount > 0 && (
            <Link href="/cart" onClick={onClose}>
              <Button className="w-full bg-[#C8A55C] hover:bg-[#B69446] text-white font-bold mt-2 h-10 text-sm shadow-lg rounded-xl">
                Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-3 bg-white">
          {itemCount === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1C2C] mb-1">Your cart is empty</h3>
              <p className="text-xs text-gray-500 mb-4">Add some flagpoles to get started</p>
              <Link href="/products" onClick={onClose}>
                <Button className="bg-[#C8A55C] hover:bg-[#B69446] text-white px-6 text-sm rounded-xl">
                  Shop Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {lines.map((line: any) => (
                <div 
                  key={line.id} 
                  className="flex gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-[#C8A55C] transition-all shadow-sm bg-white"
                >
                  {line.merchandise.image && (
                    <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={line.merchandise.image.url || "/placeholder.svg"}
                        alt={line.merchandise.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 flex flex-col min-w-0">
                    <h4 className="font-bold text-xs text-[#0B1C2C] line-clamp-2 mb-1">
                      {line.merchandise.product.title}
                    </h4>
                    <p className="text-sm font-bold text-[#C8A55C] mb-2">
                      ${Number(line.cost.totalAmount.amount).toFixed(2)}
                    </p>
                    
                    <div className="flex items-center justify-between gap-2 mt-auto">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateLineQuantity(line.id, line.quantity - 1)}
                          className="w-6 h-6 rounded-lg border border-[#0B1C2C] hover:bg-[#0B1C2C] hover:text-white flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold text-[#0B1C2C] w-6 text-center">{line.quantity}</span>
                        <button
                          onClick={() => updateLineQuantity(line.id, line.quantity + 1)}
                          className="w-6 h-6 rounded-lg border border-[#0B1C2C] hover:bg-[#0B1C2C] hover:text-white flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeLineItem(line.id)}
                        className="text-[10px] text-red-500 hover:text-red-700 font-medium underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {itemCount > 0 && (
          <div className="border-t-2 border-[#C8A55C]/30 p-4 bg-[#0B1C2C] shrink-0">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-300">Subtotal:</span>
              <span className="text-2xl font-bold text-[#C8A55C]">${Number(subtotal).toFixed(2)}</span>
            </div>
            
            <Link href="/cart" onClick={onClose}>
              <Button className="w-full bg-[#C8A55C] hover:bg-[#B69446] text-white font-bold py-4 text-base shadow-lg rounded-xl">
                Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
