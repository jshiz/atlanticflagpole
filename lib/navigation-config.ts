// Navigation configuration mapping menu items to Shopify collections and routes
export interface NavItem {
  label: string
  href: string
  collection?: string // Shopify collection handle
  tags?: string[] // Fallback tags if collection doesn't exist
  description?: string
}

export interface NavCategory {
  label: string
  items: NavItem[]
}

export interface MegaMenu {
  label: string
  href?: string
  categories: NavCategory[]
}

// Main navigation structure
export const navigationConfig: MegaMenu[] = [
  {
    label: "Flagpoles",
    categories: [
      {
        label: "By Type",
        items: [
          {
            label: "Telescoping Flagpoles",
            href: "/collections/telescoping-flagpoles",
            collection: "telescoping-flagpoles",
            tags: ["telescoping", "telescoping flagpole"],
            description: "Easy-to-install telescoping flagpoles",
          },
          {
            label: "Aluminum Flagpoles",
            href: "/collections/aluminum-flagpoles",
            collection: "aluminum-flagpoles",
            tags: ["aluminum", "aluminum flagpole", "Aluminum Flagpoles"],
            description: "Durable aluminum flagpoles",
          },
          {
            label: "Indoor Flagpoles",
            href: "/collections/indoor-flagpoles",
            collection: "indoor-flagpoles",
            tags: ["indoor", "indoor flagpole"],
            description: "Premium indoor flagpole sets",
          },
        ],
      },
      {
        label: "Kits & Bundles",
        items: [
          {
            label: "Flagpole Kits",
            href: "/collections/flagpole-kits",
            collection: "flagpole-kits",
            tags: ["kit", "bundle", "flagpole kit"],
            description: "Complete flagpole kits",
          },
          {
            label: "Presidential Package",
            href: "/collections/presidential-package",
            collection: "presidential-package",
            tags: ["presidential", "premium", "deluxe"],
            description: "Premium presidential flagpole package",
          },
          {
            label: "Phoenix Patriot Bundle",
            href: "/collections/patriot-bundle",
            collection: "patriot-bundle",
            tags: ["patriot", "phoenix", "bundle"],
            description: "Complete patriot bundle",
          },
        ],
      },
      {
        label: "By Height",
        items: [
          {
            label: "20 ft Flagpoles",
            href: "/collections/20ft-flagpoles",
            collection: "20ft-flagpoles",
            tags: ["20 ft", "20ft", "20 foot"],
            description: "20 foot flagpoles",
          },
          {
            label: "25 ft Flagpoles",
            href: "/collections/25ft-flagpoles",
            collection: "25ft-flagpoles",
            tags: ["25 ft", "25ft", "25 foot"],
            description: "25 foot flagpoles",
          },
          {
            label: "30 ft+ Flagpoles",
            href: "/collections/30ft-flagpoles",
            collection: "30ft-flagpoles",
            tags: ["30 ft", "30ft", "30 foot", "35 ft", "40 ft"],
            description: "30 foot and taller flagpoles",
          },
        ],
      },
    ],
  },
  {
    label: "Flags",
    categories: [
      {
        label: "National",
        items: [
          {
            label: "American Flags",
            href: "/collections/usa-flags",
            collection: "usa-flags",
            tags: ["american flag", "usa flag", "us flag", "usa-flag"],
            description: "Premium American flags",
          },
          {
            label: "State Flags",
            href: "/collections/state-flags",
            collection: "state-flags",
            tags: ["state flag", "state"],
            description: "All 50 state flags",
          },
          {
            label: "International Flags",
            href: "/collections/international-flags",
            collection: "international-flags",
            tags: ["international", "world flag", "country flag"],
            description: "Flags from around the world",
          },
        ],
      },
      {
        label: "Service",
        items: [
          {
            label: "Military Flags",
            href: "/collections/military-flags",
            collection: "military-flags",
            tags: ["military", "army", "navy", "air force", "marines"],
            description: "Military branch flags",
          },
          {
            label: "Civil Service Flags",
            href: "/collections/civil-service-flags",
            collection: "civil-service-flags",
            tags: ["police", "fire", "ems", "first responder"],
            description: "Police, fire, and EMS flags",
          },
        ],
      },
      {
        label: "Historical",
        items: [
          {
            label: "Historical Flags",
            href: "/collections/historical-flags",
            collection: "historical-flags",
            tags: ["historical", "historic", "vintage"],
            description: "Historic American flags",
          },
        ],
      },
      {
        label: "Sports & More",
        items: [
          {
            label: "NFL Flags",
            href: "/collections/nfl-flags",
            collection: "nfl-flags",
            tags: ["nfl", "football"],
            description: "NFL team flags",
          },
          {
            label: "NCAA Flags",
            href: "/collections/ncaa-flags",
            collection: "ncaa-flags",
            tags: ["ncaa", "college"],
            description: "College team flags",
          },
          {
            label: "MLB Flags",
            href: "/collections/mlb-flags",
            collection: "mlb-flags",
            tags: ["mlb", "baseball"],
            description: "MLB team flags",
          },
          {
            label: "NASCAR Flags",
            href: "/collections/nascar-flags",
            collection: "nascar-flags",
            tags: ["nascar", "racing"],
            description: "NASCAR flags",
          },
          {
            label: "NBA Flags",
            href: "/collections/nba-flags",
            collection: "nba-flags",
            tags: ["nba", "basketball"],
            description: "NBA team flags",
          },
          {
            label: "Windsocks",
            href: "/collections/windsocks",
            collection: "windsocks",
            tags: ["windsock", "wind sock"],
            description: "Decorative windsocks",
          },
        ],
      },
    ],
  },
  {
    label: "Accessories",
    categories: [
      {
        label: "Lighting",
        items: [
          {
            label: "Flagpole Lighting",
            href: "/collections/flagpole-lighting",
            collection: "flagpole-lighting",
            tags: ["light", "lighting", "solar light", "led light"],
            description: "Solar and LED flagpole lights",
          },
        ],
      },
      {
        label: "Hardware",
        items: [
          {
            label: "Flagpole Mounts",
            href: "/collections/flagpole-mounts",
            collection: "flagpole-mounts",
            tags: ["mount", "bracket", "wall mount"],
            description: "Wall and ground mounts",
          },
          {
            label: "Flagpole Toppers",
            href: "/collections/flagpole-toppers",
            collection: "flagpole-toppers",
            tags: ["topper", "finial", "eagle", "ball"],
            description: "Eagles, balls, and more",
          },
        ],
      },
      {
        label: "Decorative",
        items: [
          {
            label: "Weathervanes",
            href: "/collections/weathervanes",
            collection: "weathervanes",
            tags: ["weathervane", "weather vane"],
            description: "Decorative weathervanes",
          },
          {
            label: "Shop All Accessories",
            href: "/collections/accessories",
            collection: "accessories",
            tags: ["accessory", "accessories"],
            description: "All flagpole accessories",
          },
        ],
      },
    ],
  },
  {
    label: "Phoenix Parts and Accessories",
    categories: [
      {
        label: "Lighting",
        items: [
          {
            label: "Solar Flagpole Lights",
            href: "/collections/flagpole-lighting",
            collection: "flagpole-lighting",
            tags: ["light", "lighting", "solar light", "led light"],
            description: "Solar and LED flagpole lights",
          },
          {
            label: "800 Series Solar Light",
            href: "/collections/800-series-solar-light",
            collection: "800-series-solar-light",
            tags: ["800 series", "solar", "premium light"],
            description: "Premium 800 series solar lights",
          },
        ],
      },
      {
        label: "Hardware & Mounts",
        items: [
          {
            label: "Flagpole Mounts",
            href: "/collections/flagpole-mounts",
            collection: "flagpole-mounts",
            tags: ["mount", "bracket", "wall mount"],
            description: "Wall and ground mounts",
          },
          {
            label: "Ground Sleeves",
            href: "/collections/ground-sleeves",
            collection: "ground-sleeves",
            tags: ["ground sleeve", "sleeve", "foundation"],
            description: "ABS ground sleeves for flagpoles",
          },
          {
            label: "Anti-Theft Devices",
            href: "/collections/anti-theft",
            collection: "anti-theft",
            tags: ["anti-theft", "security", "lock", "securi-shur"],
            description: "Securi-Shur locking devices",
          },
          {
            label: "Ground Sleeve Caps",
            href: "/collections/ground-sleeve-caps",
            collection: "ground-sleeve-caps",
            tags: ["cap", "sleeve cap", "ground cap"],
            description: "Decorative ground sleeve caps",
          },
        ],
      },
      {
        label: "Toppers & Finials",
        items: [
          {
            label: "Eagle Toppers",
            href: "/collections/eagle-toppers",
            collection: "eagle-toppers",
            tags: ["eagle", "gold eagle", "eagle topper"],
            description: "Gold and bronze eagle toppers",
          },
          {
            label: "Ball Toppers",
            href: "/collections/ball-toppers",
            collection: "ball-toppers",
            tags: ["ball", "gold ball", "ball topper"],
            description: "Anodized aluminum ball toppers",
          },
          {
            label: "All Flagpole Toppers",
            href: "/collections/flagpole-toppers",
            collection: "flagpole-toppers",
            tags: ["topper", "finial"],
            description: "All flagpole toppers and finials",
          },
        ],
      },
      {
        label: "Flag Attachments",
        items: [
          {
            label: "Flag Harnesses",
            href: "/collections/flag-harnesses",
            collection: "flag-harnesses",
            tags: ["harness", "flag attachment", "double flag"],
            description: "Freedom Ring flag harnesses",
          },
          {
            label: "Flash Collars",
            href: "/collections/flash-collars",
            collection: "flash-collars",
            tags: ["flash collar", "collar", "decorative collar"],
            description: "Decorative flash collars",
          },
        ],
      },
      {
        label: "Shop All",
        items: [
          {
            label: "All Phoenix Parts",
            href: "/collections/phoenix-parts-and-accessories",
            collection: "phoenix-parts-and-accessories",
            tags: ["phoenix", "parts", "accessories"],
            description: "Complete Phoenix parts catalog",
          },
        ],
      },
    ],
  },
]

export const singleNavItems: NavItem[] = [
  {
    label: "Holiday & Seasonal",
    href: "/collections/holiday-seasonal",
    collection: "holiday-seasonal",
    tags: [
      "holiday",
      "seasonal",
      "christmas",
      "halloween",
      "thanksgiving",
      "easter",
      "4th of july",
      "memorial day",
      "veterans day",
      "patriotic",
    ],
    description: "Seasonal and holiday flags",
  },
]

// Resource pages (informational, not product collections)
export const resourcePages = [
  { label: "Blog", href: "/blog" },
  { label: "Installation Guides", href: "/installation-guides" },
  { label: "FAQ", href: "/faq" },
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "Warranty Info", href: "/warranty" },
]

// Top bar links
export const topBarLinks = [
  { label: "Our Guarantee", href: "/guarantee" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Reviews & Testimonials", href: "/reviews" },
]

// Get all collection handles for sitemap generation
export function getAllCollectionHandles(): string[] {
  const handles: string[] = []

  navigationConfig.forEach((menu) => {
    menu.categories.forEach((category) => {
      category.items.forEach((item) => {
        if (item.collection) {
          handles.push(item.collection)
        }
      })
    })
  })

  singleNavItems.forEach((item) => {
    if (item.collection) {
      handles.push(item.collection)
    }
  })

  return [...new Set(handles)] // Remove duplicates
}
