export interface BundleItem {
  handle: string
  title: string
  image: string
  category: "base" | "extra" | "warranty"
  quantity: number
  isPhysical: boolean
}

export interface ResolvedBundle {
  parent: {
    id: string
    variantId: string
    title: string
    price: string
    compareAtPrice?: string
  }
  items: BundleItem[]
}

export interface BundleConfig {
  base_bundle: "premier_kit" | null
  pole_height: 15 | 20 | 25
  finish: "silver" | "black-bronze" | "gold"
  extras: string[]
  include_premier?: boolean
}
