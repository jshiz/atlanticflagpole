# Flaggy AI Assistant Setup Guide

## Overview

Flaggy is an AI-powered chat assistant that helps customers with product recommendations, installation guidance, order tracking, and more. When Flaggy can't answer a question, it automatically escalates to your support team via email.

## Features

- **AI-Powered Responses**: Instant answers to common questions using a knowledge base
- **Smart Escalation**: Automatically creates support tickets when needed
- **Email Integration**: Sends formatted support tickets to your team
- **Conversation Tracking**: Includes full chat history in support tickets
- **Friendly Interface**: Animated mascot character for engaging customer experience

## Setup Instructions

### 1. Email Service Configuration

Flaggy requires an email service to send support tickets. Choose one of the following options:

#### Option A: SendGrid (Recommended)

1. Sign up for a free SendGrid account at https://sendgrid.com
2. Create an API key with "Mail Send" permissions
3. Add to your `.env` file:
   \`\`\`env
   EMAIL_SERVICE_URL=https://api.sendgrid.com/v3/mail/send
   EMAIL_API_KEY=your_sendgrid_api_key
   SUPPORT_EMAIL=support@atlanticflagpole.com
   \`\`\`

#### Option B: Mailgun

1. Sign up for Mailgun at https://mailgun.com
2. Verify your domain
3. Get your API key from the dashboard
4. Add to your `.env` file:
   \`\`\`env
   EMAIL_SERVICE_URL=https://api.mailgun.net/v3/your-domain.com/messages
   EMAIL_API_KEY=your_mailgun_api_key
   SUPPORT_EMAIL=support@atlanticflagpole.com
   \`\`\`

#### Option C: Amazon SES

1. Set up Amazon SES in your AWS account
2. Verify your email address or domain
3. Create IAM credentials with SES send permissions
4. Add to your `.env` file:
   \`\`\`env
   EMAIL_SERVICE_URL=https://email.us-east-1.amazonaws.com
   EMAIL_API_KEY=your_aws_access_key
   SUPPORT_EMAIL=support@atlanticflagpole.com
   \`\`\`

### 2. Development Mode (No Email Service)

For development and testing, Flaggy will work without email configuration. Support tickets will be logged to the console instead of being sent via email.

### 3. Customizing the Knowledge Base

Edit `lib/flaggy/knowledge-base.ts` to customize Flaggy's responses:

\`\`\`typescript
export const KNOWLEDGE_BASE: Intent[] = [
  {
    name: "your_intent_name",
    keywords: ["keyword1", "keyword2", "phrase"],
    response: "Flaggy's response to this intent",
    followUp: ["Optional follow-up button 1", "Optional follow-up button 2"]
  },
  // Add more intents...
]
\`\`\`

### 4. Escalation Triggers

Flaggy automatically escalates to human support when:
- User's query doesn't match any intent after 2 attempts
- User explicitly asks for a human ("talk to a person", "speak to agent", etc.)
- Keywords indicate complex issues ("refund", "damaged", "complaint")

### 5. Testing

1. Click the Flaggy button in the bottom right corner
2. Try asking questions like:
   - "Which flagpole should I buy?"
   - "How do I install my flagpole?"
   - "Where is my order?"
   - "I need to speak to a human"

3. Test ticket creation by asking a question Flaggy can't answer

### 6. Monitoring

Support tickets are logged with the prefix `[v0]` for easy filtering:
- Check your server logs for ticket creation events
- Monitor your support email inbox for incoming tickets
- Review ticket IDs in the format `AFP-XXXXX`

## API Endpoints

### POST /api/flaggy/chat
Processes user messages and returns AI responses.

**Request:**
\`\`\`json
{
  "message": "User's message",
  "intent": "optional_suggested_intent"
}
\`\`\`

**Response:**
\`\`\`json
{
  "shouldEscalate": false,
  "response": "Flaggy's response",
  "followUp": ["Optional follow-up buttons"]
}
\`\`\`

### POST /api/create-support-ticket
Creates a support ticket and sends email to support team.

**Request:**
\`\`\`json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "issueSummary": "Brief description of issue",
  "chatHistory": "Full conversation transcript"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "ticketId": "AFP-12345",
  "message": "Support ticket created successfully"
}
\`\`\`

## Troubleshooting

### Tickets not being sent
- Verify email service credentials in `.env`
- Check server logs for error messages
- Ensure `SUPPORT_EMAIL` is set correctly
- Test email service API credentials independently

### Flaggy not responding
- Check browser console for errors
- Verify API endpoints are accessible
- Review knowledge base for matching intents
- Check server logs for processing errors

### Escalation not working
- Verify ticket form appears after 2 failed matches
- Check that email service is configured
- Review escalation triggers in knowledge base
- Test with explicit human request ("I need a human")

## Customization

### Changing Flaggy's Appearance
Edit `components/flaggy-chat/flaggy-chat-widget.tsx`:
- Update colors in className props
- Modify animation timings
- Change button positions
- Customize message styling

### Adding New Intents
Edit `lib/flaggy/knowledge-base.ts`:
1. Add new intent object to `KNOWLEDGE_BASE` array
2. Define keywords that trigger the intent
3. Write the response text
4. Optionally add follow-up buttons

### Modifying Email Template
Edit `lib/email/support-ticket.ts`:
- Update `formatEmailHtml()` function for HTML styling
- Modify `emailBody` variable for plain text version
- Customize subject line format
- Add additional fields to ticket data

## Support

For issues or questions about Flaggy:
1. Check server logs for error messages
2. Review this documentation
3. Test with development mode (no email service)
4. Contact your development team

## Future Enhancements

Potential improvements for Flaggy:
- Integration with CRM systems
- Multi-language support
- Voice input capability
- Sentiment analysis
- Advanced analytics dashboard
- Integration with order management system
- Proactive chat triggers based on user behavior
