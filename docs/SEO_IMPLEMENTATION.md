# SEO Implementation Guide - Atlantic Flagpole

This document outlines the complete SEO foundation implemented for the Atlantic Flagpole headless storefront.

## Overview

The SEO implementation follows Next.js 14+ best practices and includes:
- Metadata API for all pages
- Structured data (Schema.org)
- Dynamic OG images
- XML sitemap
- Robots.txt
- Canonical URLs
- Semantic HTML

## Implementation Details

### 1. Metadata API

All pages use Next.js metadata API for SEO tags:

**Product Pages** (`app/products/[handle]/page.tsx`)
- Dynamic title: `{Product Title} | Atlantic Flagpole`
- Description from product description (max 160 chars)
- Open Graph images from product featured image
- Twitter card support
- Canonical URLs
- Product price metadata

**Collection Pages** (`app/collections/[handle]/page.tsx`)
- Dynamic title: `{Collection Title} | Atlantic Flagpole`
- Description from collection description
- Open Graph images from collection image
- Breadcrumb navigation
- Canonical URLs

**Homepage** (`app/page.tsx`)
- Static metadata with brand messaging
- Organization schema
- Social media integration

### 2. Structured Data (Schema.org)

**Product Schema**
\`\`\`json
{
  "@type": "Product",
  "name": "Product Title",
  "description": "Product description",
  "image": "product-image-url",
  "brand": { "@type": "Brand", "name": "Atlantic Flagpole" },
  "offers": {
    "@type": "Offer",
    "price": "299.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
\`\`\`

**Breadcrumb Schema**
- Implemented on product and collection pages
- Shows navigation hierarchy
- Improves search result display

**Organization Schema**
- Homepage only
- Company information
- Logo and branding
- Social media links

### 3. Dynamic OG Images

**API Route**: `app/api/og/route.tsx`

Generates dynamic Open Graph images using Next.js ImageResponse:
- 1200x630px (optimal for social sharing)
- Brand colors (navy #1B365D, gold #C8A55C)
- Product title, description, and price
- Atlantic Flagpole branding

**Usage**:
\`\`\`
/api/og?title=Product+Name&description=Description&price=299.99
\`\`\`

### 4. XML Sitemap

**File**: `app/sitemap.ts`

Automatically generates sitemap with:
- All published products (availableForSale only)
- All collections
- Static pages (home, help center, testimonials)
- Priority and change frequency settings
- Revalidates every hour

**Priority Levels**:
- Homepage: 1.0
- Collections: 0.8-0.9
- Products: 0.7
- Static pages: 0.6-0.7

### 5. Robots.txt

**File**: `app/robots.ts`

Crawl policy:
- Allow all pages except: `/api/`, `/cart`, `/account/`, `/checkout`
- Sitemap reference
- Googlebot specific rules

### 6. Canonical URLs

All pages include canonical URLs to prevent duplicate content:
- Product pages: `https://atlanticflagpole.vercel.app/products/{handle}`
- Collection pages: `https://atlanticflagpole.vercel.app/collections/{handle}`
- Homepage: `https://atlanticflagpole.vercel.app`

### 7. Image Optimization

All images use Next.js Image component:
- Automatic WebP conversion
- Lazy loading
- Responsive sizes
- Alt text for accessibility

**Alt Text Guidelines**:
- Product images: Product title
- Collection images: Collection title
- Decorative images: Empty alt text

### 8. Semantic HTML

Proper HTML structure throughout:
- One `<h1>` per page
- Hierarchical heading structure (h1 → h2 → h3)
- Semantic elements: `<main>`, `<header>`, `<footer>`, `<nav>`, `<article>`
- ARIA labels for accessibility

## SEO Checklist

### Per-Page Requirements

- [ ] Title tag < 60 characters
- [ ] Meta description < 160 characters
- [ ] One H1 tag per page
- [ ] Hierarchical heading structure
- [ ] Alt text on all images
- [ ] Canonical URL set
- [ ] Open Graph tags
- [ ] Twitter card tags
- [ ] Structured data (where applicable)

### Technical Requirements

- [ ] XML sitemap generated
- [ ] Robots.txt configured
- [ ] 404 pages handled
- [ ] Mobile responsive
- [ ] Fast page load (< 3s)
- [ ] HTTPS enabled
- [ ] No broken links

## Performance Targets

**Lighthouse SEO Score**: > 95

**Core Web Vitals**:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## Monitoring

**Tools**:
- Google Search Console
- Vercel Analytics
- Lighthouse CI

**Key Metrics**:
- Organic traffic
- Click-through rate (CTR)
- Average position
- Crawl errors
- Index coverage

## Maintenance

**Weekly**:
- Check Search Console for errors
- Monitor crawl stats
- Review top queries

**Monthly**:
- Audit new products for SEO
- Update meta descriptions
- Check for broken links
- Review structured data

**Quarterly**:
- Full SEO audit
- Competitor analysis
- Content optimization
- Schema updates

## Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)

## Support

For SEO-related questions or issues, refer to:
- `/lib/seo/metadata.ts` - Metadata generation
- `/lib/seo/structured-data.ts` - Schema.org helpers
- `/app/sitemap.ts` - Sitemap generation
- `/app/robots.ts` - Robots.txt configuration
