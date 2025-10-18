# Judge.me Integration Setup Guide

This guide will help you set up Judge.me reviews integration for Atlantic Flagpole.

## Prerequisites

1. A Judge.me account (sign up at https://judge.me)
2. Your Shopify store connected to Judge.me
3. Judge.me API credentials

## Step 1: Get Your Judge.me API Credentials

### Option 1: Using OAuth (Recommended)

1. Visit https://judge.me/login and log in with your email
2. Judge.me will send a "magic link" to your email
3. After logging in, go to https://judge.me/profile/apps/new
4. Create a new app with:
   - **App Name**: Atlantic Flagpole Headless
   - **Redirect URI**: Your callback URL (e.g., https://atlanticflagpole.vercel.app/api/judgeme/callback)
   - **Logo URL**: Your app logo URL
   - **Link to**: Your app homepage
5. After creating, click "edit" to find your **Client ID** and **Secret**
6. Add these to Vercel as environment variables:
   - `JUDGEME_CLIENT_ID`
   - `JUDGEME_CLIENT_SECRET`
   - `JUDGEME_REDIRECT_URI`
7. **Complete the OAuth flow**:
   - Judge.me will provide an authorization URL
   - Visit that URL and authorize the app
   - You'll be redirected to `/api/judgeme/callback`
   - The callback will exchange the code for an access token
   - Check your Vercel deployment logs for the access token
   - Add the access token as `JUDGEME_API_TOKEN` environment variable
   - Redeploy your site

### Option 2: Using API Token (Simpler)

1. Log in to your Judge.me account
2. Go to Settings → Integrations → API Tokens
3. Generate a new API token
4. Copy the **API Token** and **Shop Domain**

## Step 2: Add Environment Variables to Vercel

Add these environment variables to your Vercel project:

### Required Variables

\`\`\`bash
# Your Shopify store domain (already set)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Judge.me Private API Token (for server-side requests only)
JUDGEME_API_TOKEN=your_private_api_token_here

# Judge.me Client ID (for OAuth flow)
JUDGEME_CLIENT_ID=your_client_id_here

# Judge.me Client Secret (for OAuth flow)
JUDGEME_CLIENT_SECRET=your_client_secret_here

# Judge.me Redirect URI (for OAuth flow)
JUDGEME_REDIRECT_URI=https://atlanticflagpole.vercel.app/api/judgeme/callback
\`\`\`

### How to Add Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" → "Environment Variables"
3. Add each variable:
   - **Key**: Variable name (e.g., `JUDGEME_API_TOKEN`)
   - **Value**: Your token value
   - **Environment**: Select all (Production, Preview, Development)
4. Click "Save"
5. Redeploy your site for changes to take effect

## Step 3: Verify Integration

After adding the environment variables and redeploying:

1. Visit your homepage - you should see the Judge.me badge in the header
2. Visit `/testimonials` - you should see all your Judge.me reviews
3. Visit any product page - you should see product-specific reviews
4. Check the footer - you should see featured reviews

## Step 4: Configure Judge.me in Shopify

### Enable Platform-Independent Widgets (Required for Headless)

**This is a critical step for headless Shopify stores!**

1. In your Shopify admin, go to **Apps** → **Judge.me Reviews**
2. Navigate to **Settings** → **Advanced**
3. Scroll down to **Platform-independent Review Widget**
4. Select **"Enable platform-independent widgets"**
5. You should see a script tag like:
   \`\`\`html
   <script>
     jdgm = window.jdgm || {};
     jdgm.SHOP_DOMAIN = 'atlantic-flag-and-pole-inc.myshopify.com';
     jdgm.PLATFORM = '...';
   </script>
   \`\`\`
6. **Important**: This script is already integrated into your site via the `JudgeMePlatformScript` component in `app/layout.tsx`
7. Click **Save** at the bottom of the page

### Additional Recommended Settings

#### Out-of-Store Products
1. Check **"Include reviews for out-of-store products in all widgets and out-of-store text setting"**
2. Set the out-of-store text to: `(out of store)`
3. This ensures reviews are still shown even when products are temporarily unavailable

#### Sync Customers with Shopify
1. Check **"Sync customers who leave web and email reviews with Shopify"**
2. This keeps your customer data synchronized between Judge.me and Shopify

#### Join Early User Program (Optional)
1. Check **"Join Judge.me Early User Program"** if you want to beta test new features
2. You'll get early access to new Judge.me features before public release

### Enable Review Collection

1. In Judge.me dashboard, go to Settings → Review Requests
2. Enable automatic review request emails
3. Set the delay (recommended: 7-14 days after delivery)

## Features Included

### 1. Header Badge
- Shows average rating and total review count
- Links to Judge.me reviews page
- Automatically updates with new reviews

### 2. Footer Widget
- Displays featured reviews
- Shows overall stats
- Links to full reviews page

### 3. Product Pages
- Product-specific reviews
- Star ratings
- Verified buyer badges
- Review images
- Helpful votes

### 4. Testimonials Page (`/testimonials`)
- All reviews from Judge.me
- Featured reviews section
- Filter by rating
- Search functionality
- Product information for each review

### 5. Hero Section
- Real-time review stats
- Average rating display
- Total review count

## API Endpoints Available

The integration includes these API endpoints:

- `GET /api/health` - Check Judge.me API connectivity
- `GET /api/diagnostics` - Full system diagnostics including Judge.me
- `GET /api/performance` - Performance metrics

## Troubleshooting

### Reviews Not Showing

1. **Check environment variables**:
   - Verify `JUDGEME_API_TOKEN` is set correctly
   - Verify `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` matches your store

2. **Check API connectivity**:
   - Visit `/diagnostics` to see API health status
   - Look for Judge.me API errors in the console

3. **Verify Judge.me account**:
   - Make sure your store is connected to Judge.me
   - Check that you have reviews in your Judge.me dashboard

### Reviews Are Outdated

Reviews are cached for 5 minutes to improve performance. To clear cache:
- Wait 5 minutes for automatic refresh
- Or redeploy your site to clear all caches

### API Rate Limits

Judge.me has rate limits on API requests:
- Free plan: 100 requests/hour
- Paid plans: Higher limits

The integration includes caching to minimize API calls.

## Best Practices

1. **Collect Reviews Regularly**
   - Enable automatic review requests
   - Send follow-up emails for non-responders
   - Offer incentives for reviews (within Judge.me guidelines)

2. **Feature Your Best Reviews**
   - Mark exceptional reviews as "featured" in Judge.me dashboard
   - These will appear in the footer and testimonials page

3. **Respond to Reviews**
   - Reply to reviews in Judge.me dashboard
   - Address negative reviews professionally
   - Thank customers for positive feedback

4. **Monitor Performance**
   - Check `/diagnostics` regularly
   - Monitor review collection rates
   - Track average rating trends

## Support

- **Judge.me Support**: https://judge.me/help
- **Judge.me API Docs**: https://judge.me/api/docs
- **Vercel Support**: https://vercel.com/help

## Next Steps

1. ✅ Set up environment variables
2. ✅ Verify integration is working
3. ✅ Enable automatic review requests
4. ✅ Feature your best reviews
5. ✅ Monitor and respond to reviews regularly
