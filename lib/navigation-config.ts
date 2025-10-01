// Navigation configuration mapping menu items to Shopify collections and routes
export interface NavItem {
  label: string
  href: string
  collection?: string // Shopify collection handle
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
            description: "Easy-to-install telescoping flagpoles",
          },
          {
            label: "Aluminum Flagpoles",
            href: "/collections/aluminum-flagpoles",
            collection: "aluminum-flagpoles",
            description: "Durable aluminum flagpoles",
          },
          {
            label: "Indoor Flagpoles",
            href: "/collections/indoor-flagpoles",
            collection: "indoor-flagpoles",
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
            description: "Complete flagpole kits",
          },
          {
            label: "Presidential Package",
            href: "/collections/presidential-package",
            collection: "presidential-package",
            description: "Premium presidential flagpole package",
          },
          {
            label: "Phoenix Patriot Bundle",
            href: "/collections/patriot-bundle",
            collection: "patriot-bundle",
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
            description: "20 foot flagpoles",
          },
          {
            label: "25 ft Flagpoles",
            href: "/collections/25ft-flagpoles",
            collection: "25ft-flagpoles",
            description: "25 foot flagpoles",
          },
          {
            label: "30 ft+ Flagpoles",
            href: "/collections/30ft-flagpoles",
            collection: "30ft-flagpoles",
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
            href: "/collections/american-flags",
            collection: "american-flags",
            description: "Premium American flags",
          },
          {
            label: "State Flags",
            href: "/collections/state-flags",
            collection: "state-flags",
            description: "All 50 state flags",
          },
          {
            label: "International Flags",
            href: "/collections/international-flags",
            collection: "international-flags",
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
            description: "Military branch flags",
          },
          {
            label: "Civil Service Flags",
            href: "/collections/civil-service-flags",
            collection: "civil-service-flags",
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
            description: "NFL team flags",
          },
          {
            label: "NCAA Flags",
            href: "/collections/ncaa-flags",
            collection: "ncaa-flags",
            description: "College team flags",
          },
          {
            label: "MLB Flags",
            href: "/collections/mlb-flags",
            collection: "mlb-flags",
            description: "MLB team flags",
          },
          {
            label: "NASCAR Flags",
            href: "/collections/nascar-flags",
            collection: "nascar-flags",
            description: "NASCAR flags",
          },
          {
            label: "NBA Flags",
            href: "/collections/nba-flags",
            collection: "nba-flags",
            description: "NBA team flags",
          },
          {
            label: "Windsocks",
            href: "/collections/windsocks",
            collection: "windsocks",
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
            description: "Wall and ground mounts",
          },
          {
            label: "Flagpole Toppers",
            href: "/collections/flagpole-toppers",
            collection: "flagpole-toppers",
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
            description: "Decorative weathervanes",
          },
          {
            label: "Shop All Accessories",
            href: "/collections/accessories",
            collection: "accessories",
            description: "All flagpole accessories",
          },
        ],
      },
    ],
  },
]

// Single link items (not in mega menus)
export const singleNavItems: NavItem[] = [
  {
    label: "Holiday & Seasonal",
    href: "/collections/holiday-seasonal",
    collection: "holiday-seasonal",
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
