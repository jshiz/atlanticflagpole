"use client"

import { MapPin, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface AddressCardProps {
  address: {
    id: string
    firstName: string
    lastName: string
    company?: string
    address1: string
    address2?: string
    city: string
    provinceCode: string
    countryCode: string
    zip: string
    phone?: string
  }
}

export function AddressCard({ address }: AddressCardProps) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this address?")) {
      return
    }

    setDeleting(true)

    try {
      const response = await fetch("/api/account/addresses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addressId: address.id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete address")
      }

      window.location.reload()
    } catch (error) {
      console.error("[v0] Error deleting address:", error)
      alert("Failed to delete address. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <MapPin className="h-5 w-5 text-afp-gold flex-shrink-0" />
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 w-8 p-0 text-gray-600 hover:text-afp-gold hover:bg-afp-ivory"
          >
            <Link href={`/account/addresses/${address.id.split("/").pop()}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="h-8 w-8 p-0 text-gray-600 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p className="font-medium text-afp-navy">
          {address.firstName} {address.lastName}
        </p>
        {address.company && <p>{address.company}</p>}
        <p>{address.address1}</p>
        {address.address2 && <p>{address.address2}</p>}
        <p>
          {address.city}, {address.provinceCode} {address.zip}
        </p>
        <p>{address.countryCode}</p>
        {address.phone && <p className="mt-2">{address.phone}</p>}
      </div>
    </div>
  )
}
