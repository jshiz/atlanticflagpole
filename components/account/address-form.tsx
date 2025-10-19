"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
]

interface AddressFormProps {
  address?: any
  addressId?: string
}

export function AddressForm({ address, addressId }: AddressFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: address?.firstName || "",
    lastName: address?.lastName || "",
    company: address?.company || "",
    address1: address?.address1 || "",
    address2: address?.address2 || "",
    city: address?.city || "",
    provinceCode: address?.provinceCode || "",
    countryCode: address?.countryCode || "US",
    zip: address?.zip || "",
    phone: address?.phone || "",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const url = addressId ? "/api/account/addresses" : "/api/account/addresses"
      const method = addressId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressId ? { addressId, address: formData } : { address: formData }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save address")
      }

      router.push("/account/addresses")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="address1">Address Line 1 *</Label>
        <Input
          id="address1"
          type="text"
          required
          value={formData.address1}
          onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="address2">Address Line 2 (Optional)</Label>
        <Input
          id="address2"
          type="text"
          value={formData.address2}
          onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="provinceCode">State *</Label>
          <Select
            value={formData.provinceCode}
            onValueChange={(value) => setFormData({ ...formData, provinceCode: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="zip">ZIP Code *</Label>
          <Input
            id="zip"
            type="text"
            required
            value={formData.zip}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="bg-afp-gold hover:bg-afp-gold-700 text-white">
          {loading ? "Saving..." : addressId ? "Update Address" : "Add Address"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
