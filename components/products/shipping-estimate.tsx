"use client"

import { Truck } from "lucide-react"

export function ShippingEstimate() {
  // Calculate estimated delivery dates (3-5 business days from now)
  const today = new Date()
  const minDays = 3
  const maxDays = 5

  const minDate = new Date(today)
  minDate.setDate(today.getDate() + minDays)

  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + maxDays)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
      <Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold text-green-900">Usually ships in 1-3 business days</p>
        <p className="text-xs text-green-700 mt-1">
          Estimated delivery: {formatDate(minDate)} - {formatDate(maxDate)}
        </p>
      </div>
    </div>
  )
}
