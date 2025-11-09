"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface MenuItem {
  id: string
  title: string
  url: string
  items?: MenuItem[]
}

interface InfoMegaMenuProps {
  title: string
  menuItems: MenuItem[]
  subtitle?: string
  promoContent: {
    title: string
    description: string
    buttonText: string
    buttonHref: string
    image?: string
  }
  onLinkClick?: () => void
}

export function InfoMegaMenu({ title, menuItems, subtitle, promoContent, onLinkClick }: InfoMegaMenuProps) {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-8 py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar - Links */}
        <div className="col-span-4">
          <h4 className="text-base font-bold text-[#0B1C2C] mb-4 pb-2 border-b-2 border-[#C8A55C]">{title}</h4>
          {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  onClick={onLinkClick}
                  className="block py-2.5 px-3 rounded-lg hover:bg-[#F5F3EF] transition-all group"
                >
                  <span className="text-sm text-[#0B1C2C] group-hover:text-[#C8A55C] font-medium">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content - Promo */}
        <div className="col-span-8">
          <div className="bg-gradient-to-br from-[#F5F3EF] to-white rounded-xl p-8 shadow-sm">
            {promoContent.image && (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6 shadow-md">
                <Image
                  src={promoContent.image || "/placeholder.svg"}
                  alt={promoContent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            )}

            <h3 className="text-xl font-bold text-[#0B1C2C] mb-3">{promoContent.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{promoContent.description}</p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-[#C8A55C] hover:bg-[#a88947] text-white px-8">
                <Link href={promoContent.buttonHref} onClick={onLinkClick}>
                  {promoContent.buttonText}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
