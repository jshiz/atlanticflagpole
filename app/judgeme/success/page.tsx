import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function JudgemeSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl">Judge.me Connected Successfully!</CardTitle>
            <CardDescription className="text-lg mt-2">
              Your Atlantic Flagpole store is now connected to Judge.me
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Judge.me reviews will now appear on your product pages</li>
                <li>✓ Review widgets are active throughout your site</li>
                <li>✓ Customer reviews will sync automatically</li>
                <li>✓ Review request emails will be sent to customers</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Important: Save Your Access Token</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                The OAuth access token has been generated. To use it in your application, you need to add it as an
                environment variable in Vercel.
              </p>
              <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2 list-decimal list-inside">
                <li>Check your server logs for the access token</li>
                <li>Go to your Vercel project → Settings → Environment Variables</li>
                <li>
                  Add a new variable:{" "}
                  <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">JUDGEME_API_TOKEN</code>
                </li>
                <li>Paste the access token as the value</li>
                <li>Redeploy your application</li>
              </ol>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Go to Homepage
              </Link>
              <Link
                href="/diagnostics"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                View Diagnostics
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
