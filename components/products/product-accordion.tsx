"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
  title: string
  content: React.ReactNode
  defaultOpen?: boolean
}

interface ProductAccordionProps {
  items: AccordionItem[]
}

export function ProductAccordion({ items }: ProductAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(items.map((item, index) => (item.defaultOpen ? index : -1)).filter((i) => i >= 0)),
  )

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50 transition-colors"
            aria-expanded={openItems.has(index)}
          >
            <h3 className="text-base md:text-lg font-semibold text-[#0B1C2C]">{item.title}</h3>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-gray-500 transition-transform duration-200",
                openItems.has(index) && "rotate-180",
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openItems.has(index) ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="p-4 md:p-5 pt-0 prose prose-sm max-w-none text-[#0B1C2C]/80">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
