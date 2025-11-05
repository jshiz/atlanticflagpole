import type { ShopifyProduct } from "@/lib/shopify"
import Image from "next/image"

interface MadeInUSABadgeProps {
  product: ShopifyProduct
}

export function MadeInUSABadge({ product }: MadeInUSABadgeProps) {
  const shouldShowBadge = () => {
    const title = product.title?.toLowerCase() || ""
    const handle = product.handle?.toLowerCase() || ""
    const tags = product.tags || []
    const productType = product.productType?.toLowerCase() || ""

    // Check tags
    const hasMadeInUSATag = tags.some(
      (tag) =>
        tag.toLowerCase().includes("made in usa") ||
        tag.toLowerCase().includes("made-in-usa") ||
        tag.toLowerCase().includes("american made"),
    )

    // Check for Phoenix products
    const isPhoenix =
      title.includes("phoenix") ||
      handle.includes("phoenix") ||
      tags.some((tag) => tag.toLowerCase().includes("phoenix"))

    // Check for telescopic flagpoles
    const isTelescopic =
      title.includes("telescopic") ||
      handle.includes("telescopic") ||
      tags.some((tag) => tag.toLowerCase().includes("telescopic"))

    // Check for bundles and kits
    const isBundleOrKit =
      productType.includes("bundle") ||
      productType.includes("kit") ||
      title.includes("bundle") ||
      title.includes("kit") ||
      tags.some((tag) => tag.toLowerCase().includes("bundle") || tag.toLowerCase().includes("kit"))

    // Check for flagpoles
    const isFlagpole =
      productType.includes("flagpole") ||
      title.includes("flagpole") ||
      tags.some((tag) => tag.toLowerCase().includes("flagpole"))

    return hasMadeInUSATag || isPhoenix || isTelescopic || (isBundleOrKit && isFlagpole)
  }

  if (!shouldShowBadge()) {
    return null
  }

  return (
    <div className="absolute top-2 right-2 z-10">
      <div className="relative flex items-center gap-3.5 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg border-2 border-[#C8A55C]/30 transition-transform duration-200 ease-out hover:scale-105 origin-top-right cursor-pointer">
        {/* American Flag Icon */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/madeinusabadge-lV1WdGQGgGLFMrb7p8HQc5WnBMQ6ES.jpg"
            alt="Made in USA"
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
        {/* Text */}
        <span className="text-lg font-bold text-[#0B1C2C] leading-none whitespace-nowrap">MADE IN USA</span>
      </div>
    </div>
  )
}
