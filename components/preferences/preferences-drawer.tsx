"use client"

import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Globe, X, MapPin, ShieldCheck, Check, RefreshCw, Navigation, Info, ExternalLink, Map } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useGeo } from "@/lib/geo/context"
import Link from "next/link"

interface PreferencesDrawerProps {
  isOpen: boolean
  onClose: () => void
  side?: "right" | "bottom"
}

export function PreferencesDrawer({ isOpen, onClose, side = "right" }: PreferencesDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side={side}
        className="p-0 flex flex-col z-[90] bg-white shadow-2xl transition-all duration-500 ease-in-out"
      >
        <PreferencesContent onClose={onClose} />
      </SheetContent>
    </Sheet>
  )
}

interface PreferencesContentProps {
  onClose: () => void
}

export function PreferencesContent({ onClose }: PreferencesContentProps) {
  const [marketingEnabled, setMarketingEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState<"location" | "privacy">("location")
  const { location, loading: geoLoading } = useGeo()
  const [loading, setLoading] = useState(false)

  const handleRefreshLocation = () => {
    setLoading(true)
    window.location.reload()
  }

  const city = location?.city || ""
  const regionName = location?.region || "Unknown"
  const regionCode = location?.region_code || ""
  const countryCode = location?.country_code || "US"
  const country = location?.country || "United States"

  const stateSlug = regionName.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="p-2.5 bg-[#0B1C2C] text-white shrink-0 border-b-2 border-[#C8A55C]/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Globe className="w-4 h-4 text-[#C8A55C]" />
            Site Preferences
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#C8A55C] transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-1.5 mt-2">
          <button
            onClick={() => setActiveTab("location")}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all ${
              activeTab === "location" ? "bg-[#C8A55C] text-[#0B1C2C]" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <MapPin className="w-2.5 h-2.5 inline mr-1" />
            Location
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all ${
              activeTab === "privacy" ? "bg-[#C8A55C] text-[#0B1C2C]" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <ShieldCheck className="w-2.5 h-2.5 inline mr-1" />
            Privacy
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 bg-white overscroll-contain touch-pan-y">
        <div className="max-w-md mx-auto space-y-3">
          {activeTab === "location" && (
            <div className="space-y-2.5">
              {/* Current Location Card */}
              <div className="bg-gradient-to-br from-[#0B1C2C] to-[#1a2e44] p-3 rounded-xl text-white shadow-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#C8A55C] flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-[#0B1C2C]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-300">Your Location</p>
                      <p className="font-bold text-base">
                        {geoLoading ? "Detecting..." : city || regionName || "Unknown"}
                      </p>
                    </div>
                  </div>
                  {!geoLoading && !loading && location && (
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center py-1 border-t border-white/10">
                    <span className="text-gray-300">Region:</span>
                    <span className="font-semibold">{regionName}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-white/10">
                    <span className="text-gray-300">Country:</span>
                    <span className="font-semibold">{country}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[9px] font-bold text-[#0B1C2C] uppercase tracking-wider">Quick Actions</h4>

                <Link href={`/capitals/${stateSlug}`} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-[#C8A55C] to-[#B69446] hover:from-[#b8954c] hover:to-[#a6853d] text-white h-9 rounded-lg font-bold text-xs shadow-lg hover:shadow-xl transition-all">
                    <MapPin className="w-3 h-3 mr-1.5" />
                    Browse {regionName} Products
                    <ExternalLink className="w-2.5 h-2.5 ml-1.5" />
                  </Button>
                </Link>

                <Link href="/states" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#C8A55C] text-[#0B1C2C] hover:bg-[#C8A55C] hover:text-white h-9 rounded-lg font-bold text-xs transition-all bg-transparent"
                  >
                    <Map className="w-3 h-3 mr-1.5" />
                    Browse All States
                    <ExternalLink className="w-2.5 h-2.5 ml-1.5" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-1.5">
                <Button
                  onClick={handleRefreshLocation}
                  disabled={loading || geoLoading}
                  className="w-full bg-[#0B1C2C] hover:bg-[#1a2e44] text-white h-9 rounded-lg font-bold text-xs shadow-md"
                >
                  <RefreshCw className={`w-3 h-3 mr-1.5 ${loading || geoLoading ? "animate-spin" : ""}`} />
                  {loading || geoLoading ? "Detecting..." : "Refresh Location"}
                </Button>

                <div className="bg-blue-50 border border-blue-200 p-2 rounded-lg flex gap-1.5">
                  <Info className="w-3 h-3 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-blue-800">
                    We use your location for accurate shipping rates and region-specific products.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[9px] font-bold text-[#0B1C2C] uppercase tracking-wider">Benefits</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {["Accurate shipping", "Local products", "Weather options", "Fast delivery"].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[10px]">
                      <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check className="w-2 h-2 text-green-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[#0B1C2C]">
                  <ShieldCheck className="w-4 h-4 text-[#C8A55C]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Cookie Preferences</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="essential-cookies" className="font-bold text-[#0B1C2C] text-xs">
                        Essential Cookies
                      </Label>
                      <p className="text-[9px] text-gray-500 max-w-[200px]">
                        Required for site function. Cannot be disabled.
                      </p>
                    </div>
                    <Switch id="essential-cookies" checked={true} disabled />
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="marketing-cookies" className="font-bold text-[#0B1C2C] text-xs">
                        Marketing & Analytics
                      </Label>
                      <p className="text-[9px] text-gray-500 max-w-[200px]">Help us improve your experience.</p>
                    </div>
                    <Switch
                      id="marketing-cookies"
                      checked={marketingEnabled}
                      onCheckedChange={setMarketingEnabled}
                      className="data-[state=checked]:bg-[#C8A55C]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg space-y-1.5">
                <h4 className="text-[9px] font-bold text-[#0B1C2C] uppercase tracking-wider">Your Privacy</h4>
                <div className="space-y-0.5 text-[9px] text-gray-600">
                  <p>• Never sell your information</p>
                  <p>• Location for shipping only</p>
                  <p>• Opt out anytime</p>
                  <p>• Encrypted & secure</p>
                </div>
              </div>

              <Button
                onClick={onClose}
                className="w-full bg-[#0B1C2C] hover:bg-[#1a2e44] text-white h-9 rounded-lg font-bold text-xs shadow-lg"
              >
                Save Settings
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
