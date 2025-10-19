// This defines what components are included in each bundle/kit product

export interface BundleComponent {
  title: string
  handle: string
  variantTitle?: string
  quantity: number
  notes?: string
}

export interface BundleConfig {
  handle: string
  name: string
  includesPremier: boolean
  components: BundleComponent[]
  flagSize?: string // e.g., "3x5" or "4x6"
  groundSleeveSize?: string // e.g., "2.5 inch" or "3 inch"
}

// Bundle configurations for all Atlantic Flagpole kits
export const BUNDLE_CONFIGS: Record<string, BundleConfig> = {
  // Phoenix Flagpole Patriot Kit
  "phoenix-flagpole-patriot-kit": {
    handle: "phoenix-flagpole-patriot-kit",
    name: "Phoenix Flagpole Patriot Kit",
    includesPremier: true,
    flagSize: "4x6",
    groundSleeveSize: "3 inch",
    components: [
      {
        title: "20' Black Bronze Flagpole Kit",
        handle: "telescoping-flagpole",
        variantTitle: "20' Black Bronze",
        quantity: 1,
      },
      {
        title: "800 Series Solar Light",
        handle: "800-series-led-solar-light-executive-telepatriot-phoenix",
        quantity: 1,
      },
      {
        title: "American Flag (4x6)",
        handle: "oversized-american-flag",
        variantTitle: "4'x6'",
        quantity: 1,
        notes: "Flag size: 4x6 for 20' flagpoles",
      },
      {
        title: "Ground Sleeve (3 inch)",
        handle: "ground-sleeve-for-telescoping-flagpole",
        variantTitle: "For 20ft or 25ft Pole (3in Diameter Flagpole)",
        quantity: 1,
        notes: "Ground sleeve: 3 inch for 20' flagpoles",
      },
      {
        title: "Gold Ball Flagpole Topper (3 inch)",
        handle: "gold-ball-for-flagpole-topper",
        variantTitle: "3in",
        quantity: 1,
      },
      {
        title: "Securi-Shur Anti-Theft Locking Device",
        handle: "securi-shur-anti-theft-locking-device-for-flagpole",
        variantTitle: "3 Inch Hole (20' and 25')",
        quantity: 1,
      },
      {
        title: "Red Ground Sleeve Cap",
        handle: "red-ground-sleeve-cap-for-flagpole",
        quantity: 1,
      },
    ],
  },

  // Phoenix Presidential Flagpole Kit
  "phoenix-presidential-flagpole-kit": {
    handle: "phoenix-presidential-flagpole-kit",
    name: "Phoenix Presidential Flagpole Kit",
    includesPremier: true,
    flagSize: "4x6",
    groundSleeveSize: "3 inch",
    components: [
      {
        title: "20' Black Bronze Flagpole Kit",
        handle: "telescoping-flagpole",
        variantTitle: "20' Black Bronze",
        quantity: 1,
      },
      {
        title: "800 Series Solar Light",
        handle: "800-series-led-solar-light-executive-telepatriot-phoenix",
        quantity: 1,
      },
      {
        title: "American Flag (4x6)",
        handle: "oversized-american-flag",
        variantTitle: "4'x6'",
        quantity: 1,
        notes: "Flag size: 4x6 for 20' flagpoles",
      },
      {
        title: "Support Our Troops Flag",
        handle: "support-our-troops-flag",
        quantity: 1,
      },
      {
        title: "Black Bronze Flash Collar",
        handle: "flash-collar-bronzed-colored-for-flagpole",
        quantity: 1,
      },
      {
        title: "Gold Eagle Topper",
        handle: "gold-eagle-for-flagpole-topper",
        quantity: 1,
      },
      {
        title: "Ground Sleeve (3 inch)",
        handle: "ground-sleeve-for-telescoping-flagpole",
        variantTitle: "For 20ft or 25ft Pole (3in Diameter Flagpole)",
        quantity: 1,
        notes: "Ground sleeve: 3 inch for 20' flagpoles",
      },
      {
        title: "Securi-Shur Anti-Theft Locking Device",
        handle: "securi-shur-anti-theft-locking-device-for-flagpole",
        variantTitle: "3 Inch Hole (20' and 25')",
        quantity: 1,
      },
      {
        title: "Red Ground Sleeve Cap",
        handle: "red-ground-sleeve-cap-for-flagpole",
        quantity: 1,
      },
    ],
  },

  // Golden Era Special Edition Kit
  "the-golden-era-special-edition-kit": {
    handle: "the-golden-era-special-edition-kit",
    name: "The Golden Era Special Edition Kit",
    includesPremier: true,
    flagSize: "4x6",
    groundSleeveSize: "3 inch",
    components: [
      {
        title: "20' Black Bronze Flagpole Kit",
        handle: "telescoping-flagpole",
        variantTitle: "20' Black Bronze",
        quantity: 1,
      },
      {
        title: "800 Series Solar Light",
        handle: "800-series-led-solar-light-executive-telepatriot-phoenix",
        quantity: 1,
      },
      {
        title: "American Flag (4x6)",
        handle: "oversized-american-flag",
        variantTitle: "4'x6'",
        quantity: 1,
        notes: "Flag size: 4x6 for 20' flagpoles",
      },
      {
        title: "Ground Sleeve (3 inch)",
        handle: "ground-sleeve-for-telescoping-flagpole",
        variantTitle: "For 20ft or 25ft Pole (3in Diameter Flagpole)",
        quantity: 1,
        notes: "Ground sleeve: 3 inch for 20' flagpoles",
      },
      {
        title: "Gold Ball Flagpole Topper (3 inch)",
        handle: "gold-ball-for-flagpole-topper",
        variantTitle: "3in",
        quantity: 1,
      },
      {
        title: "Securi-Shur Anti-Theft Locking Device",
        handle: "securi-shur-anti-theft-locking-device-for-flagpole",
        variantTitle: "3 Inch Hole (20' and 25')",
        quantity: 1,
      },
      {
        title: "Red Ground Sleeve Cap",
        handle: "red-ground-sleeve-cap-for-flagpole",
        quantity: 1,
      },
    ],
  },

  // 15' Flagpole Kits (smaller size with different flag and ground sleeve)
  "phoenix-flagpole-patriot-kit-15": {
    handle: "phoenix-flagpole-patriot-kit-15",
    name: "Phoenix Flagpole Patriot Kit (15')",
    includesPremier: true,
    flagSize: "3x5",
    groundSleeveSize: "2.5 inch",
    components: [
      {
        title: "15' Black Bronze Flagpole Kit",
        handle: "telescoping-flagpole",
        variantTitle: "15' Black Bronze",
        quantity: 1,
      },
      {
        title: "800 Series Solar Light",
        handle: "800-series-led-solar-light-executive-telepatriot-phoenix",
        quantity: 1,
      },
      {
        title: "American Flag (3x5)",
        handle: "oversized-american-flag",
        variantTitle: "3'x5'",
        quantity: 1,
        notes: "Flag size: 3x5 for 15' flagpoles",
      },
      {
        title: "Ground Sleeve (2.5 inch)",
        handle: "ground-sleeve-for-telescoping-flagpole",
        variantTitle: "For 15ft Pole (2.5in Diameter Flagpole)",
        quantity: 1,
        notes: "Ground sleeve: 2.5 inch for 15' flagpoles",
      },
      {
        title: "Gold Ball Flagpole Topper (3 inch)",
        handle: "gold-ball-for-flagpole-topper",
        variantTitle: "3in",
        quantity: 1,
      },
      {
        title: "Securi-Shur Anti-Theft Locking Device",
        handle: "securi-shur-anti-theft-locking-device-for-flagpole",
        variantTitle: "2.5 Inch Hole (Under 20')",
        quantity: 1,
      },
      {
        title: "Red Ground Sleeve Cap",
        handle: "red-ground-sleeve-cap-for-flagpole",
        quantity: 1,
      },
    ],
  },
}

// Helper function to get bundle configuration by product handle
export function getBundleConfig(productHandle: string): BundleConfig | null {
  return BUNDLE_CONFIGS[productHandle] || null
}

// Helper function to check if a product is a bundle
export function isBundle(productHandle: string): boolean {
  return productHandle in BUNDLE_CONFIGS
}

// Helper function to get all bundle handles
export function getAllBundleHandles(): string[] {
  return Object.keys(BUNDLE_CONFIGS)
}
