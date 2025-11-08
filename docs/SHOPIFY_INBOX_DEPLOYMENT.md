# Shopify Inbox Integration - Production Deployment

## ⚠️ Important: Production-Only Feature

The Shopify Inbox integration requires your **live Shopify store environment** to work. It will not function in the v0 preview.

## Deployment Steps

### 1. Add ShopifyInboxWidget to Production

Once you deploy to Vercel and connect to your Shopify store, add this line back to `app/layout.tsx`:

\`\`\`tsx
import { ShopifyInboxWidget } from "@/components/shopify-inbox-widget"

// Inside the body tag:
<FlaggyChatWidget />
<ShopifyInboxWidget />  // Add this line
<CartSidebarButton />
\`\`\`

### 2. Verify Shopify Inbox App Proxy

Make sure your Shopify Inbox app is configured with:
- **App Proxy URL**: `/apps/shopify-chat`
- **Proxy subpath**: `apps/shopify-chat`

### 3. Test the Integration

1. Deploy to production
2. Visit your live site
3. The Shopify Inbox chat widget should appear
4. When Flaggy hands off to human support, the customer's info will be pre-filled

## How It Works

1. Customer chats with Flaggy AI assistant
2. When they need human help, Flaggy collects their email
3. Flaggy stores the customer data in sessionStorage
4. ShopifyInboxWidget detects the pending customer
5. Opens Shopify Inbox with pre-filled customer information and chat history
6. Your support team can continue the conversation seamlessly

## Files Included

- `components/shopify-inbox-widget.tsx` - The integration component
- `components/flaggy-chat/flaggy-chat-widget.tsx` - Updated with handoff logic
- `docs/SHOPIFY_INBOX_INTEGRATION.md` - Detailed setup guide

## Why It's Commented Out

The v0 preview environment cannot connect to your Shopify store's app proxy endpoint (`/apps/shopify-chat`). When the widget tries to load this script in preview mode, it gets a 404 HTML page instead of JavaScript, causing a syntax error.

**Solution**: Enable it only in production where your Shopify store is properly connected.
