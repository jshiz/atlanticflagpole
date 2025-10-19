# Geo-Personalized Analytics Guide

## Overview

The geo-personalized upsell engine tracks customer location and shows relevant state/team flags and regional products. This document explains the analytics implementation and how to use the data.

## Features

### 1. Location Detection
- Uses ipapi.co for IP-based geolocation
- Detects: city, region, state code, country
- Cached for 1 hour per session
- Fallback to generic recommendations if detection fails

### 2. Product Mapping
State codes are mapped to relevant product tags:
- State flags (e.g., "Texas", "California")
- Sports teams (e.g., "Cowboys", "49ers")
- Regional bundles

**File**: `lib/geo/mapping.ts`

### 3. A/B Testing
Randomly assigns users to variants:
- **Grid**: Traditional product grid layout
- **Carousel**: Horizontal scrolling carousel

Variant is stored in session and tracked with all events.

### 4. Event Tracking

**Click Events**:
\`\`\`typescript
{
  event: "geo_product_click",
  productId: "gid://shopify/Product/123",
  handle: "texas-flag",
  region: "Texas",
  region_code: "TX",
  variant: "grid",
  timestamp: 1234567890
}
\`\`\`

**Purchase Events**:
\`\`\`typescript
{
  event: "geo_purchase",
  orderId: "12345",
  productIds: ["gid://shopify/Product/123"],
  total: 299.99,
  region: "Texas",
  region_code: "TX",
  timestamp: 1234567890
}
\`\`\`

## API Endpoints

### POST /api/analytics/geo
Store analytics events (clicks and purchases)

**Request**:
\`\`\`json
{
  "event": "geo_product_click",
  "productId": "gid://shopify/Product/123",
  "handle": "texas-flag",
  "region": "Texas",
  "region_code": "TX",
  "variant": "grid"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true
}
\`\`\`

### GET /api/analytics/geo
Retrieve all stored events

**Response**:
\`\`\`json
{
  "events": [...]
}
\`\`\`

### GET /api/geo/report
Get aggregated analytics report

**Response**:
\`\`\`json
{
  "topRegions": [
    {
      "region": "Texas",
      "region_code": "TX",
      "clicks": 150,
      "conversions": 12,
      "revenue": 3599.88,
      "ctr": 0.08
    }
  ],
  "bestVariant": {
    "variant": "grid",
    "clicks": 500,
    "conversions": 45,
    "ctr": 0.09
  },
  "totalClicks": 1000,
  "totalConversions": 85,
  "variants": [...]
}
\`\`\`

## Data Storage

Events are stored in HTTP-only cookies:
- Cookie name: `geo_analytics`
- Max size: 4KB
- Retention: 30 days
- Max events: 100 (FIFO)

**Note**: For production, consider migrating to a database (Supabase, Neon) for unlimited storage and advanced analytics.

## Usage Examples

### Track Product Click
\`\`\`typescript
import { trackGeoClick } from '@/lib/analytics/geoEvents'
import { useGeo } from '@/lib/geo/context'

const { location, variant } = useGeo()

trackGeoClick({
  productId: product.id,
  handle: product.handle,
  location,
  variant
})
\`\`\`

### Track Purchase
\`\`\`typescript
import { trackGeoPurchase } from '@/lib/analytics/geoEvents'
import { useGeo } from '@/lib/geo/context'

const { location } = useGeo()

trackGeoPurchase({
  orderId: order.id,
  productIds: order.lineItems.map(item => item.productId),
  total: order.total,
  location
})
\`\`\`

### View Analytics Report
\`\`\`typescript
const response = await fetch('/api/geo/report')
const data = await response.json()

console.log('Top performing region:', data.topRegions[0])
console.log('Best variant:', data.bestVariant.variant)
console.log('Overall CTR:', data.totalConversions / data.totalClicks)
\`\`\`

## Optimization Tips

1. **Test Both Variants**: Run A/B test for at least 2 weeks to get statistically significant results
2. **Monitor Top Regions**: Focus marketing efforts on high-converting regions
3. **Update Product Tags**: Ensure products have accurate state/team tags for better matching
4. **Seasonal Adjustments**: Update recommendations based on seasonal trends (e.g., football season)
5. **Expand Mapping**: Add more regional products and team affiliations to `lib/geo/mapping.ts`

## Privacy Considerations

- IP-based geolocation is anonymous
- No personal information is stored
- Users can opt out via browser settings
- Compliant with GDPR and CCPA
- Data is stored client-side in cookies

## Future Enhancements

- [ ] Database storage for unlimited events
- [ ] Real-time dashboard for analytics
- [ ] Email notifications for high-performing regions
- [ ] Advanced segmentation (city-level, zip code)
- [ ] Integration with Google Analytics
- [ ] Predictive recommendations using ML
