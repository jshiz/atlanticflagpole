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
    <div className="absolute top-1 right-1 z-10 opacity-70 hover:opacity-100 transition-opacity duration-300">
      <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 drop-shadow-md">
        <Image src="/images/madeinusabadge.jpg" alt="Made in USA" fill className="object-contain" sizes="56px" />
      </div>
    </div>
  )
}
