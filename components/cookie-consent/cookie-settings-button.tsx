"use client"

import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"
import Link from "next/link"

export function CookieSettingsButton() {
  return (
    <Link href="/cookie-settings">
      <Button variant="ghost" size="sm" className="text-[#0B1C2C]/70 hover:text-[#0B1C2C] hover:bg-[#0B1C2C]/5">
        <Cookie className="w-4 h-4 mr-2" />
        Cookie Settings
      </Button>
    </Link>
  )
}
