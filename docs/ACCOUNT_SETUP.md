# Atlantic Flagpole - Customer Account System Setup

This guide will help you set up the complete Shopify Customer Account integration for Atlantic Flagpole.

## Overview

The account system provides:
- OAuth 2.0 authentication with PKCE
- Customer profile management
- Order history and tracking
- Address management (CRUD)
- Wishlist functionality
- Judge.me reviews integration
- Secure session management

## Prerequisites

1. Shopify store with Customer Account API enabled
2. Headless storefront setup
3. Judge.me app installed (for reviews)

## Environment Variables

### Required Variables

Add these to your `.env.local` file or Vercel project settings:

\`\`\`bash
# Shopify Store Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token
SHOPIFY_STOREFRONT_API_URL=https://your-store.myshopify.com/api/2025-07/graphql.json

# Customer Account API (OAuth)
SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID=your_client_id
SHOPIFY_CUSTOMER_ACCOUNT_API_URL=https://shopify.com/12345678/account/customer/api/2025-07/graphql
SHOPIFY_CUSTOMER_ACCOUNT_AUTHORIZE_URL=https://shopify.com/12345678/auth/oauth/authorize
SHOPIFY_CUSTOMER_ACCOUNT_TOKEN_URL=https://shopify.com/12345678/auth/oauth/token
SHOPIFY_CUSTOMER_ACCOUNT_LOGOUT_URL=https://shopify.com/12345678/auth/logout

# Application Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
SESSION_SECRET=your_random_secret_key_min_32_chars

# Judge.me (Optional - for reviews, server-side only)
JUDGEME_API_TOKEN=your_judgeme_api_token
\`\`\`

## Shopify Customer Account API Setup

### Step 1: Enable Customer Account API

1. Go to your Shopify Admin
2. Navigate to **Settings** → **Customer accounts**
3. Select **Headless** as the account type
4. Click **Configure** to set up the Customer Account API

### Step 2: Get API Credentials

In the Customer Account API settings, you'll find:

1. **Client ID** - Copy this to `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`
2. **Application endpoints**:
   - Authorization endpoint → `SHOPIFY_CUSTOMER_ACCOUNT_AUTHORIZE_URL`
   - Token endpoint → `SHOPIFY_CUSTOMER_ACCOUNT_TOKEN_URL`
   - Logout endpoint → `SHOPIFY_CUSTOMER_ACCOUNT_LOGOUT_URL`
3. **GraphQL endpoint** → `SHOPIFY_CUSTOMER_ACCOUNT_API_URL`

### Step 3: Configure Callback URL

Add your callback URL to Shopify's allowed redirect URIs:

\`\`\`
https://your-domain.com/api/auth/callback
\`\`\`

For local development, also add:
\`\`\`
http://localhost:3000/api/auth/callback
\`\`\`

### Step 4: Set Required Scopes

Ensure these scopes are enabled in your Customer Account API settings:
- `openid`
- `email`
- `profile`
- `customer-account-api:full` (or specific permissions)

## Session Secret

Generate a secure random string for `SESSION_SECRET`:

\`\`\`bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
\`\`\`

## Judge.me Integration (Optional)

If you want to show customer reviews in the account area:

1. Install Judge.me app from Shopify App Store
2. Get your API credentials from Judge.me dashboard
3. Add `JUDGEME_API_TOKEN` to your environment variables

## Testing the Setup

### 1. Test Authentication Flow

1. Navigate to `/account/login`
2. Click "Sign In with Shopify"
3. You should be redirected to Shopify's OAuth page
4. After authorization, you should be redirected back to `/account`

### 2. Test Account Features

- **Profile**: Update your name and phone number at `/account/profile`
- **Orders**: View order history at `/account/orders`
- **Addresses**: Add/edit addresses at `/account/addresses`
- **Wishlist**: Save products at `/account/wishlist`
- **Reviews**: View your reviews at `/account/reviews`

## Troubleshooting

### "Invalid state" error during login

- Check that `SESSION_SECRET` is set and consistent
- Verify callback URL matches exactly in Shopify settings
- Clear browser cookies and try again

### "Unauthorized" errors

- Verify `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID` is correct
- Check that all OAuth endpoints are properly configured
- Ensure customer has an active account in Shopify

### Orders not showing

- Verify customer has placed orders in Shopify
- Check that Customer Account API has permission to read orders
- Review server logs for GraphQL errors

### Address operations failing

- Ensure Customer Account API has address management permissions
- Check that address data includes all required fields
- Verify country and province codes are valid

## Security Considerations

1. **Never expose private tokens** - Keep `SHOPIFY_STOREFRONT_TOKEN` and `SESSION_SECRET` server-side only
2. **Use HTTPS in production** - OAuth requires secure connections
3. **Rotate secrets regularly** - Update `SESSION_SECRET` periodically
4. **Validate user input** - All forms include validation and sanitization
5. **CSRF protection** - Implemented on all mutation endpoints

## API Rate Limits

Shopify Customer Account API has rate limits:
- 1000 requests per minute per customer
- Implement caching where appropriate
- Use pagination for large datasets

## Support

For issues with:
- **Shopify setup**: Contact Shopify Support
- **Judge.me integration**: Contact Judge.me Support
- **Application bugs**: Check server logs and browser console

## Next Steps

After setup is complete:
1. Test all account features thoroughly
2. Customize email templates in Shopify
3. Configure customer notifications
4. Set up analytics tracking
5. Add custom branding to OAuth pages (Shopify settings)
