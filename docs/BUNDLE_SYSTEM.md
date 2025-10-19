# Bundle System Implementation Guide

## Overview

Atlantic Flagpole's bundle system allows selling Premier Kit bundles with component breakdowns, warranties, and extras. The system uses Shopify metafields to configure bundles, backend logic to assemble components, and frontend components to display "What's Included" sections.

## Architecture

\`\`\`
Shopify Admin (source of truth)
  ↓ metafields + product data
Storefront API
  ↓ GraphQL queries
Vercel Backend (Next.js API routes)
  ↓ bundle assembly logic
Frontend Components
  ↓ bundle breakdown display
User
\`\`\`

## Shopify Setup

### 1. Create Component Products

Each Premier Kit item needs its own product in Shopify:

**Premier Kit Base Components:**
- `gold-ball-3in` – 3" Gold Ball
- `double-flag-harness` – Double Flag Harness
- `stainless-flag-snaps` – Stainless Steel Flag Snaps
- `ground-sleeve` – Ground Sleeve
- `ground-sleeve-cap-red` – Red Ground Sleeve Cap
- `instruction-sheet` – Instruction Sheet
- `securi-lok-sleeves` – Securi-LOK Interlocking Sleeves
- `usa-flag-4x6` – 4'x6' Premium Nylon USA Flag
- `usa-flag-3x5` – 3'x5' Nylon USA Flag
- `securi-shur-clamp` – Securi-Shur Anti-Theft Locking Clamp

**Virtual Warranty/Guarantee SKUs:**
- `warranty-rust-free` – Rust Free Guarantee
- `warranty-forever-pole` – Forever Warranty (Flagpole System)
- `warranty-forever-rings-sleeves` – Forever Warranty (Rings & Sleeves)
- `guarantee-anti-theft` – Anti-Theft Guarantee

**Bundle Extras (examples):**
- `solar-light` – Solar Light
- `eagle-topper` – Eagle Topper
- `support-troops-flag` – Support Our Troops Flag
- `christmas-tree-kit` – Christmas Tree Kit

### 2. Create Bundle Products

Each Phoenix bundle is a parent product with:

**Metafields:**
- Namespace: `bundle`
- Key: `config`
- Type: `JSON`

**Example JSON:**
\`\`\`json
{
  "base_bundle": "premier_kit",
  "pole_height": 25,
  "finish": "black-bronze",
  "extras": [
    "solar-light",
    "eagle-topper",
    "support-troops-flag"
  ],
  "include_premier": true
}
\`\`\`

**Tags:**
- `phoenix-bundle`
- `premier-kit-included`
- `anti-theft-guarantee` (if applicable)

## Frontend Components

### BundleBreakdown Component

Add to product pages to show "What's Included":

\`\`\`tsx
import BundleBreakdown from '@/components/product/bundle-breakdown';

<BundleBreakdown productHandle={product.handle} variantId={selectedVariant.id} />
\`\`\`

### ProductCardBadge Component

Add to collection pages to show bundle badges:

\`\`\`tsx
import ProductCardBadge from '@/components/collection/product-card-badge';

<ProductCardBadge product={product} />
\`\`\`

## API Routes

### POST /api/bundles/resolve

Resolves a bundle product into its component items.

**Request:**
\`\`\`json
{
  "productHandle": "skip-bedell-package-deal",
  "variantId": "gid://shopify/ProductVariant/123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "parent": {
    "id": "gid://shopify/Product/456",
    "variantId": "gid://shopify/ProductVariant/123",
    "title": "Skip Bedell Package Deal",
    "price": "1297.00",
    "compareAtPrice": "1500.00"
  },
  "items": [
    {
      "handle": "gold-ball-3in",
      "title": "3\" Gold Ball",
      "image": "https://...",
      "category": "base",
      "isPhysical": true,
      "quantity": 1,
      "price": 0
    }
  ],
  "isBundle": true
}
\`\`\`

## Bundle Logic

### Premier Kit Base

Always included when `include_premier: true` and `base_bundle: "premier_kit"`:
- All base components
- Correct USA flag based on pole height (15' = 3'x5', 20'/25' = 4'x6')
- All warranties
- Anti-theft guarantee (only if `securi-shur-clamp` is included)

### Bundle Extras

Additional items specified in the `extras` array of the bundle config.

## QA Checklist

- [ ] All bundle products have `bundle.config` metafield populated
- [ ] Component products exist with correct handles and images
- [ ] 15' bundles show 3'x5' flag; 20'/25' show 4'x6' flag
- [ ] Anti-theft guarantee only appears when clamp is included
- [ ] PDP "What's Included" updates when variant changes
- [ ] Collection pages show bundle badges
- [ ] Bundle breakdown displays correctly on product pages

## Next Steps

1. Create all component products in Shopify
2. Add metafields to bundle products
3. Test bundle resolution API
4. Verify bundle breakdown display
5. Add badges to collection pages
