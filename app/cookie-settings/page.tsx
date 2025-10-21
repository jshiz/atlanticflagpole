"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useCookieConsent } from "@/components/cookie-consent/use-cookie-consent"
import { Shield, BarChart3, Target, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CookieSettingsPage() {
  const { consent, updateConsent, resetConsent } = useCookieConsent()
  const [localConsent, setLocalConsent] = useState(consent)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setLocalConsent(consent)
  }, [consent])

  const handleSave = () => {
    updateConsent(localConsent)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-4">Cookie Settings</h1>
          <p className="text-lg text-[#0B1C2C]/70">
            Manage your cookie preferences and control how we use cookies on our site.
          </p>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">Your cookie preferences have been saved!</p>
          </div>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-[#0B1C2C]/10 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-[#0B1C2C]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle>Essential Cookies</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#0B1C2C]/60">Always Active</span>
                      <Switch checked={true} disabled />
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    Required for the website to function properly. These cookies enable core functionality such as
                    security, shopping cart, authentication, and network management.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-[#0B1C2C]/70 space-y-1">
                <p>
                  <strong>Examples:</strong>
                </p>
                <ul className="list-disc list-inside ml-2">
                  <li>Shopping cart session</li>
                  <li>Authentication tokens</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-[#C8A55C]/10 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle>Analytics Cookies</CardTitle>
                    <Switch
                      checked={localConsent.analytics}
                      onCheckedChange={(checked) => setLocalConsent({ ...localConsent, analytics: checked })}
                    />
                  </div>
                  <CardDescription className="mt-2">
                    Help us understand how visitors interact with our website by collecting and reporting information
                    anonymously. This helps us improve our site performance and user experience.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-[#0B1C2C]/70 space-y-1">
                <p>
                  <strong>Examples:</strong>
                </p>
                <ul className="list-disc list-inside ml-2">
                  <li>Google Analytics (page views, bounce rate, session duration)</li>
                  <li>Performance monitoring</li>
                  <li>Error tracking and debugging</li>
                  <li>A/B testing and optimization</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-[#8B4513]/10 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-[#8B4513]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle>Marketing Cookies</CardTitle>
                    <Switch
                      checked={localConsent.marketing}
                      onCheckedChange={(checked) => setLocalConsent({ ...localConsent, marketing: checked })}
                    />
                  </div>
                  <CardDescription className="mt-2">
                    Used to track visitors across websites to display relevant advertisements and measure campaign
                    effectiveness. These cookies help us show you products you might be interested in.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-[#0B1C2C]/70 space-y-1">
                <p>
                  <strong>Examples:</strong>
                </p>
                <ul className="list-disc list-inside ml-2">
                  <li>Retargeting and remarketing</li>
                  <li>Personalized product recommendations</li>
                  <li>Social media advertising</li>
                  <li>Email marketing campaigns</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1 bg-[#C8A55C] hover:bg-[#a88947] text-white">
              Save Preferences
            </Button>
            <Button
              onClick={resetConsent}
              variant="outline"
              className="border-[#0B1C2C] text-[#0B1C2C] hover:bg-[#0B1C2C]/5 bg-transparent"
            >
              Reset to Defaults
            </Button>
          </div>

          <div className="text-center">
            <Link href="/cookie-policy" className="text-sm text-[#C8A55C] hover:text-[#a88947] underline">
              Read our full Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
