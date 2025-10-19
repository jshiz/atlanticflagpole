import type { Product, ProductVariant } from "@/lib/shopify/types"

// Premier Kit base items (always included unless include_premier: false)
const PREMIER_KIT_BASE = [
  "gold-ball-3in",
  "double-flag-harness",
  "stainless-flag-snaps",
  "ground-sleeve",
  "ground-sleeve-cap-red",
  "instruction-sheet",
  "securi-lok-sleeves",
  "securi-shur-clamp",
]

const PREMIER_WARRANTIES = ["warranty-rust-free", "warranty-forever-pole", "warranty-forever-rings-sleeves"]

interface BundleConfig {
  base_bundle: "premier_kit" | null
  pole_height: 15 | 20 | 25
  finish: "silver" | "black-bronze" | "gold"
  extras: string[]
  include_premier?: boolean
}

export interface BundleItem {
  handle: string
  quantity: number
  isPhysical: boolean
  category: "base" | "extra" | "warranty"
}

export function assembleBundle(product: Product, variant: ProductVariant): BundleItem[] {
  // Try to parse bundle config from metafields
  const configMetafield = product.metafields?.find((m) => m.namespace === "bundle" && m.key === "config")

  if (!configMetafield) {
    return [] // Not a bundle product
  }

  let config: BundleConfig
  try {
    config = JSON.parse(configMetafield.value)
  } catch (e) {
    console.error("[v0] Failed to parse bundle config:", e)
    return []
  }

  const items: BundleItem[] = []

  // Include Premier Kit base?
  if (config.include_premier !== false && config.base_bundle === "premier_kit") {
    items.push(
      ...PREMIER_KIT_BASE.map((handle) => ({
        handle,
        quantity: 1,
        isPhysical: !handle.includes("warranty"),
        category: "base" as const,
      })),
    )

    // Add correct USA flag based on pole height
    const flagHandle = config.pole_height === 15 ? "usa-flag-3x5" : "usa-flag-4x6"
    items.push({ handle: flagHandle, quantity: 1, isPhysical: true, category: "base" })

    // Add warranties
    items.push(
      ...PREMIER_WARRANTIES.map((handle) => ({
        handle,
        quantity: 1,
        isPhysical: false,
        category: "warranty" as const,
      })),
    )

    // Anti-theft guarantee (only if clamp included)
    if (items.find((i) => i.handle === "securi-shur-clamp")) {
      items.push({
        handle: "guarantee-anti-theft",
        quantity: 1,
        isPhysical: false,
        category: "warranty",
      })
    }
  }

  // Add bundle-specific extras
  if (config.extras?.length) {
    items.push(
      ...config.extras.map((handle) => ({
        handle,
        quantity: 1,
        isPhysical: !handle.includes("warranty") && !handle.includes("guarantee"),
        category: "extra" as const,
      })),
    )
  }

  return items
}

export function isBundleProduct(product: Product): boolean {
  return product.tags?.includes("phoenix-bundle") || product.tags?.includes("premier-kit-included") || false
}
