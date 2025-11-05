# Email Service Setup for Flaggy

This guide provides detailed instructions for setting up email services to power Flaggy's support ticket system.

## SendGrid Setup (Recommended)

### Why SendGrid?
- Free tier includes 100 emails/day
- Excellent deliverability rates
- Simple API integration
- Detailed analytics and tracking

### Setup Steps

1. **Create Account**
   - Go to https://sendgrid.com/pricing/
   - Sign up for the free plan
   - Verify your email address

2. **Create API Key**
   - Navigate to Settings > API Keys
   - Click "Create API Key"
   - Name it "Flaggy Support Tickets"
   - Select "Restricted Access"
   - Enable only "Mail Send" permission
   - Click "Create & View"
   - **Copy the API key immediately** (you won't see it again)

3. **Verify Sender Identity**
   - Go to Settings > Sender Authentication
   - Click "Verify a Single Sender"
   - Enter your support email (e.g., support@atlanticflagpole.com)
   - Complete verification via email

4. **Add to Environment Variables**
   \`\`\`env
   EMAIL_SERVICE_URL=https://api.sendgrid.com/v3/mail/send
   EMAIL_API_KEY=SG.your_actual_api_key_here
   SUPPORT_EMAIL=support@atlanticflagpole.com
   \`\`\`

5. **Test Integration**
   - Deploy your changes
   - Open Flaggy chat widget
   - Create a test support ticket
   - Check your support email inbox

### SendGrid API Format

The integration uses SendGrid's v3 API:

\`\`\`typescript
await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${EMAIL_API_KEY}`
  },
  body: JSON.stringify({
    personalizations: [{
      to: [{ email: SUPPORT_EMAIL }],
      subject: 'New Support Ticket: AFP-12345'
    }],
    from: { email: 'flaggy@atlanticflagpole.com' },
    reply_to: { email: customerEmail },
    content: [{
      type: 'text/plain',
      value: emailBody
    }, {
      type: 'text/html',
      value: emailHtml
    }]
  })
})
\`\`\`

## Mailgun Setup

### Why Mailgun?
- Free tier includes 5,000 emails/month for 3 months
- Powerful API with detailed logs
- Good for high-volume sending

### Setup Steps

1. **Create Account**
   - Go to https://mailgun.com
   - Sign up for free trial
   - Verify your email

2. **Add Domain**
   - Go to Sending > Domains
   - Click "Add New Domain"
   - Enter your domain (e.g., mg.atlanticflagpole.com)
   - Follow DNS setup instructions

3. **Get API Key**
   - Go to Settings > API Keys
   - Copy your "Private API key"

4. **Add to Environment Variables**
   \`\`\`env
   EMAIL_SERVICE_URL=https://api.mailgun.net/v3/mg.atlanticflagpole.com/messages
   EMAIL_API_KEY=your_mailgun_private_api_key
   SUPPORT_EMAIL=support@atlanticflagpole.com
   \`\`\`

## Amazon SES Setup

### Why Amazon SES?
- Extremely low cost ($0.10 per 1,000 emails)
- Highly scalable
- Integrates with AWS ecosystem

### Setup Steps

1. **Create AWS Account**
   - Go to https://aws.amazon.com
   - Sign up or log in

2. **Set Up SES**
   - Navigate to Amazon SES service
   - Choose your region (e.g., us-east-1)
   - Request production access (starts in sandbox mode)

3. **Verify Email Address**
   - Go to Verified Identities
   - Click "Create Identity"
   - Choose "Email address"
   - Enter support@atlanticflagpole.com
   - Verify via email

4. **Create IAM User**
   - Go to IAM > Users
   - Create new user "flaggy-email-sender"
   - Attach policy: AmazonSESFullAccess
   - Create access key
   - Save Access Key ID and Secret Access Key

5. **Add to Environment Variables**
   \`\`\`env
   EMAIL_SERVICE_URL=https://email.us-east-1.amazonaws.com
   EMAIL_API_KEY=your_aws_access_key_id:your_aws_secret_access_key
   SUPPORT_EMAIL=support@atlanticflagpole.com
   \`\`\`

## Testing Your Setup

### 1. Test Email Service Directly

Use curl to test your email service:

**SendGrid:**
\`\`\`bash
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations": [{"to": [{"email": "support@atlanticflagpole.com"}]}],
    "from": {"email": "test@atlanticflagpole.com"},
    "subject": "Test Email",
    "content": [{"type": "text/plain", "value": "This is a test"}]
  }'
\`\`\`

### 2. Test Flaggy Integration

1. Open your website
2. Click the Flaggy chat button
3. Ask a question Flaggy can't answer (e.g., "asdfghjkl")
4. Fill out the support ticket form
5. Check your support email inbox

### 3. Check Logs

Monitor your server logs for:
\`\`\`
[v0] Support ticket email sent successfully: AFP-12345
\`\`\`

Or errors:
\`\`\`
[v0] Failed to send email: [error details]
\`\`\`

## Troubleshooting

### Email Not Received

1. **Check Spam Folder**
   - Support ticket emails might be filtered as spam initially
   - Mark as "Not Spam" to train your email provider

2. **Verify Sender Identity**
   - Ensure your sender email is verified in your email service
   - Check DNS records for domain authentication

3. **Check API Credentials**
   - Verify API key is correct and active
   - Ensure API key has proper permissions

4. **Review Server Logs**
   - Look for error messages in deployment logs
   - Check for API response errors

### Common Errors

**401 Unauthorized**
- API key is incorrect or expired
- API key doesn't have required permissions

**403 Forbidden**
- Sender email not verified
- Account in sandbox mode (SES)
- Domain not verified (Mailgun)

**429 Too Many Requests**
- Rate limit exceeded
- Upgrade your plan or wait for reset

## Best Practices

1. **Use Environment Variables**
   - Never commit API keys to version control
   - Use different keys for development and production

2. **Monitor Usage**
   - Set up alerts for email quota limits
   - Track delivery rates and bounces

3. **Handle Failures Gracefully**
   - Log all email sending attempts
   - Implement retry logic for transient failures
   - Provide fallback contact methods

4. **Maintain Email Reputation**
   - Only send legitimate support tickets
   - Include unsubscribe links if sending marketing emails
   - Monitor bounce and complaint rates

## Cost Comparison

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| SendGrid | 100/day | $15/mo for 40k | Small to medium businesses |
| Mailgun | 5k/mo (3 months) | $35/mo for 50k | High-volume senders |
| Amazon SES | 62k/mo (if on EC2) | $0.10 per 1k | Large scale, AWS users |

## Security Considerations

1. **Protect API Keys**
   - Store in environment variables only
   - Rotate keys periodically
   - Use restricted permissions

2. **Validate Input**
   - Sanitize customer email addresses
   - Prevent email injection attacks
   - Limit message length

3. **Rate Limiting**
   - Implement rate limits on ticket creation
   - Prevent abuse and spam
   - Monitor for unusual patterns

## Support

If you encounter issues:
1. Check service status pages
2. Review API documentation
3. Contact email service support
4. Check community forums
