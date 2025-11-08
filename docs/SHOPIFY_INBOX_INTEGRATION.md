# Shopify Inbox Integration

## Overview
Atlantic Flag & Pole uses Shopify Inbox for live customer support. The integration allows Flaggy (our AI assistant) to seamlessly escalate conversations to human support agents through Shopify's native chat platform.

## How It Works

### 1. Flaggy AI Assistant
- Flaggy handles initial customer inquiries
- Answers product questions, provides recommendations
- Helps with sizing, installation, and general questions

### 2. Escalation to Human Support
When Flaggy determines a customer needs human assistance:
1. Customer fills out name, email, and issue summary
2. Flaggy stores this information in sessionStorage
3. Opens Shopify Inbox in a new window/popup
4. Pre-fills customer information and chat history
5. Support team receives the conversation context

### 3. Shopify Inbox Configuration
- **App Proxy URL**: `/apps/shopify-chat`
- **Location**: Installed in Shopify Admin > Apps > Inbox
- **Permissions**: Access to customer information, orders, and products

## Implementation Details

### Components

#### `ShopifyInboxWidget`
- Loads the Shopify Inbox script dynamically
- Handles pre-filling customer information from Flaggy
- Opens chat widget automatically when escalated

#### `FlaggyChatWidget`
- AI-powered chat assistant
- Detects when human support is needed
- Stores customer data for handoff to Shopify Inbox

### Data Flow

\`\`\`
Customer → Flaggy AI → (needs human help) → sessionStorage → Shopify Inbox
\`\`\`

#### SessionStorage Schema
\`\`\`json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "initialMessage": "Brief summary of issue",
  "chatHistory": "user: message\nflaggy: response\n..."
}
\`\`\`

## Shopify Admin Setup

1. **Install Shopify Inbox**
   - Go to Shopify Admin > Apps
   - Search for "Inbox by Shopify"
   - Install the app

2. **Configure App Proxy** (if not already set)
   - Go to Apps > Inbox > Settings
   - Ensure the app proxy is enabled
   - Proxy URL should be `/apps/shopify-chat`

3. **Set Chat Availability**
   - Configure business hours
   - Set auto-responses for offline hours
   - Add team members who can respond to chats

## Customer Experience

### With Flaggy
1. Customer opens Flaggy chat widget
2. Asks questions about products, sizing, installation
3. Flaggy provides instant AI-powered answers
4. Suggests products with ratings and pricing

### Escalation to Human
1. Customer asks complex question or requests human help
2. Flaggy recognizes the need for escalation
3. Collects customer name and email
4. Opens Shopify Inbox chat in new window
5. Support team sees full conversation history
6. Human agent takes over the conversation

## Testing

### Test Escalation Flow
1. Open site in browser
2. Wait for Flaggy to appear
3. Click to expand Flaggy chat
4. Ask a question that triggers escalation (e.g., "I need to speak with someone")
5. Fill in the escalation form
6. Verify Shopify Inbox opens with pre-filled data

### Test Shopify Inbox Direct
1. Navigate to `/apps/shopify-chat`
2. Verify Shopify Inbox chat widget loads
3. Test sending a message
4. Check Shopify Admin > Inbox for the message

## Troubleshooting

### Shopify Inbox Not Loading
- Verify the app is installed in Shopify Admin
- Check that app proxy is configured correctly
- Ensure the domain is connected to the Shopify store

### Pre-fill Data Not Working
- Check browser console for errors
- Verify sessionStorage contains customer data
- Ensure Shopify Inbox script has loaded (check window.ShopifyChat)

### Chat Widget Not Appearing
- Check that ShopifyInboxWidget is included in layout.tsx
- Verify the script URL is correct (`/apps/shopify-chat`)
- Check for browser script blocking or ad blockers

## Benefits

1. **Seamless Handoff**: Flaggy → Human support with full context
2. **No Email Delays**: Real-time chat for urgent questions
3. **Order Context**: Support agents see customer order history
4. **Mobile Friendly**: Shopify Inbox works on all devices
5. **Unified Platform**: All customer conversations in one place

## Future Enhancements

- Add Shopify Inbox to product pages for instant support
- Integrate with order status updates
- Add proactive chat triggers based on customer behavior
- Connect with email support for offline inquiries
