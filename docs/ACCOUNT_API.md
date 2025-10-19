# Customer Account API Reference

## Authentication

All account API routes require authentication via session cookie.

### Login Flow

\`\`\`typescript
// 1. Initiate login
GET /api/auth/login
// Redirects to Shopify OAuth

// 2. Handle callback
GET /api/auth/callback?code=xxx&state=xxx
// Exchanges code for tokens, creates session

// 3. Access protected routes
GET /account/*
// Requires valid session
\`\`\`

### Logout

\`\`\`typescript
GET /api/auth/logout
// Clears session and redirects to Shopify logout
\`\`\`

## Profile Management

### Get Customer Profile

\`\`\`typescript
// Server-side only
import { getCustomer } from '@/lib/shopify/customer-account'

const customer = await getCustomer(accessToken)
\`\`\`

### Update Profile

\`\`\`typescript
PUT /api/account/profile
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
\`\`\`

## Address Management

### List Addresses

\`\`\`typescript
// Server-side only
import { getCustomerAddresses } from '@/lib/shopify/customer-account'

const addresses = await getCustomerAddresses(accessToken)
\`\`\`

### Create Address

\`\`\`typescript
POST /api/account/addresses
Content-Type: application/json

{
  "address": {
    "firstName": "John",
    "lastName": "Doe",
    "address1": "123 Main St",
    "address2": "Apt 4",
    "city": "New York",
    "provinceCode": "NY",
    "countryCode": "US",
    "zip": "10001",
    "phone": "+1234567890"
  }
}
\`\`\`

### Update Address

\`\`\`typescript
PUT /api/account/addresses
Content-Type: application/json

{
  "addressId": "gid://shopify/CustomerAddress/123",
  "address": {
    "address1": "456 Oak Ave"
  }
}
\`\`\`

### Delete Address

\`\`\`typescript
DELETE /api/account/addresses
Content-Type: application/json

{
  "addressId": "gid://shopify/CustomerAddress/123"
}
\`\`\`

## Orders

### Get Orders

\`\`\`typescript
// Server-side only
import { getCustomerOrders } from '@/lib/shopify/customer-account'

const orders = await getCustomerOrders(accessToken, 20, cursor)
\`\`\`

## Wishlist

### Get Wishlist

\`\`\`typescript
GET /api/account/wishlist
\`\`\`

### Add to Wishlist

\`\`\`typescript
POST /api/account/wishlist
Content-Type: application/json

{
  "productId": "gid://shopify/Product/123"
}
\`\`\`

### Remove from Wishlist

\`\`\`typescript
DELETE /api/account/wishlist
Content-Type: application/json

{
  "productId": "gid://shopify/Product/123"
}
\`\`\`

## Error Handling

All API routes return consistent error responses:

\`\`\`typescript
{
  "error": "Error message",
  "code": "ERROR_CODE" // Optional
}
\`\`\`

Common error codes:
- `UNAUTHORIZED` - No valid session
- `INVALID_INPUT` - Validation failed
- `NOT_FOUND` - Resource not found
- `SHOPIFY_ERROR` - Shopify API error

## Rate Limiting

- Customer Account API: 1000 requests/minute per customer
- Storefront API: 2 requests/second per IP
- Implement caching and pagination for optimal performance
