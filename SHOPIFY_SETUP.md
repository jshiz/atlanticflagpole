# Shopify Setup Guide for Atlantic Flagpoles

## Menu Links Not Working? Here's Why

Your menu links are correctly coded, but they need matching collections in Shopify to work. Follow these steps:

## Step 1: Create Collections in Shopify Admin

Go to your Shopify Admin → Products → Collections and create these collections with these exact handles:

### Main Collections (Required)
- **Flagpoles** - Handle: `flagpoles`
- **Flags** - Handle: `flags`
- **Accessories** - Handle: `accessories`
- **Holiday & Seasonal** - Handle: `holiday-seasonal`

### Flagpoles Subcollections
- **Telescoping Flagpoles** - Handle: `telescoping-flagpoles`
- **Aluminum Flagpoles** - Handle: `aluminum-flagpoles`
- **Indoor Flagpoles** - Handle: `indoor-flagpoles`

### Flags Subcollections
- **American Flags** - Handle: `american-flags`
- **State Flags** - Handle: `state-flags`
- **Military Flags** - Handle: `military-flags`

### Accessories Subcollections
- **Flagpole Lighting** - Handle: `flagpole-lighting`
- **Flagpole Mounts** - Handle: `flagpole-mounts`
- **Flagpole Toppers** - Handle: `flagpole-toppers`

### Holiday & Seasonal Subcollections
- **Christmas** - Handle: `christmas`
- **Halloween** - Handle: `halloween`
- **Patriotic Holidays** - Handle: `patriotic-holidays`

## Step 2: Create a Menu in Shopify

1. Go to Shopify Admin → Online Store → Navigation
2. Create a new menu called **"Main Menu"** (exact name)
3. Add menu items that link to your collections:

\`\`\`
Main Menu
├── Flagpoles → /collections/flagpoles
│   ├── Telescoping Flagpoles → /collections/telescoping-flagpoles
│   ├── Aluminum Flagpoles → /collections/aluminum-flagpoles
│   └── Indoor Flagpoles → /collections/indoor-flagpoles
├── Flags → /collections/flags
│   ├── American Flags → /collections/american-flags
│   ├── State Flags → /collections/state-flags
│   └── Military Flags → /collections/military-flags
├── Accessories → /collections/accessories
│   ├── Flagpole Lighting → /collections/flagpole-lighting
│   ├── Flagpole Mounts → /collections/flagpole-mounts
│   └── Flagpole Toppers → /collections/flagpole-toppers
├── Holiday & Seasonal → /collections/holiday-seasonal
│   ├── Christmas → /collections/christmas
│   ├── Halloween → /collections/halloween
│   └── Patriotic Holidays → /collections/patriotic-holidays
└── Resources → /resources
    ├── Blog → /blog
    ├── Installation Guides → /installation-guides
    └── FAQ → /faq
\`\`\`

## Step 3: Add Products to Collections

1. Go to each collection you created
2. Set collection conditions or manually add products
3. Make sure each collection has at least a few products

## Step 4: Test Your Menu

Once you've created the collections and menu in Shopify:

1. Your header will automatically fetch the menu structure
2. Clicking on menu items will navigate to the collection pages
3. The megamenu will show featured products from each collection
4. Subcategories will appear in dropdown menus

## Judge.me Integration

See [JUDGEME_SETUP.md](./JUDGEME_SETUP.md) for detailed instructions on setting up Judge.me reviews integration.

### Quick Setup

1. Get your Judge.me API token from https://judge.me
2. Add environment variable to Vercel:
   - `JUDGEME_API_TOKEN` - Your private API token (server-side only)
3. Redeploy your site

### Features

- Header review badge
- Footer featured reviews
- Product page reviews
- Testimonials page (`/testimonials`)
- Real-time review stats

## Important Notes

- **Collection Handles Must Match**: The handle in Shopify must exactly match the URL (e.g., `flagpoles` collection → `/collections/flagpoles`)
- **Menu Name Must Be "Main Menu"**: The code looks for a menu called "main-menu" in Shopify
- **Fallback Menu**: If Shopify menu isn't found, the site uses a fallback menu with the same structure
- **Products in Megamenu**: The first 3 products from each collection will appear in the megamenu dropdown

## Quick Test

To verify everything is working:

1. Create at least one collection (e.g., "Flagpoles" with handle `flagpoles`)
2. Add a few products to it
3. Visit `/collections/flagpoles` on your site
4. You should see the collection page with products

## Need Help?

If collections still aren't showing:
- Check that collection handles match exactly (no spaces, lowercase)
- Verify products are added to collections
- Check Shopify API permissions include read access to products and collections
