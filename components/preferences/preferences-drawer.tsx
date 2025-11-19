"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Globe, X, MapPin, ShieldCheck, Check, RefreshCw, Navigation, Info } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface PreferencesDrawerProps {
  isOpen: boolean
  onClose: () => void
  side?: "right" | "bottom"
}

export function PreferencesDrawer({ isOpen, onClose, side = "right" }: PreferencesDrawerProps) {
  const [marketingEnabled, setMarketingEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState<'location' | 'privacy'>('location')
  const [location, setLocation] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('atlantic-geo-location')
        if (cached) {
          setLocation(JSON.parse(cached))
        }
      } catch (e) {
        console.error('[v0] Failed to load cached location', e)
      }
    }
  }, [isOpen])

  const handleRefreshLocation = () => {
    setLoading(true)
    window.location.reload()
  }

  const city = location?.city || ''
  const regionName = location?.region || 'Unknown'
  const countryCode = location?.country_code || 'US'
  const country = location?.country || 'United States'

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={side} 
        className={cn(
          "p-0 flex flex-col z-[90] bg-white shadow-2xl transition-all duration-500 ease-in-out",
          side === "right" 
            ? "w-[90vw] max-w-md h-full border-l-4 border-[#C8A55C] rounded-l-3xl" 
            : "w-full h-[85vh] mb-[56px] border-t-4 border-[#C8A55C] rounded-t-3xl rounded-b-none"
        )}
      >
        <SheetHeader className={cn(
          "p-4 bg-[#0B1C2C] text-white shrink-0 border-b-2 border-[#C8A55C]/30",
          side === "right" ? "rounded-tl-3xl" : "rounded-t-3xl"
        )}>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white flex items-center gap-2 text-lg font-bold">
              <Globe className="w-5 h-5 text-[#C8A55C]" />
              Site Preferences
            </SheetTitle>
            <button 
              onClick={onClose} 
              className="text-white hover:text-[#C8A55C] transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setActiveTab('location')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'location'
                  ? 'bg-[#C8A55C] text-[#0B1C2C]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <MapPin className="w-3 h-3 inline mr-1" />
              Location
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'privacy'
                  ? 'bg-[#C8A55C] text-[#0B1C2C]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ShieldCheck className="w-3 h-3 inline mr-1" />
              Privacy
            </button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="max-w-md mx-auto space-y-6">
            
            {activeTab === 'location' && (
              <div className="space-y-4">
                {/* Current Location Card */}
                <div className="bg-gradient-to-br from-[#0B1C2C] to-[#1a2e44] p-4 rounded-2xl text-white shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-[#C8A55C] flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-[#0B1C2C]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-300">Your Location</p>
                        <p className="font-bold text-lg">{city || regionName || "Detecting..."}</p>
                      </div>
                    </div>
                    {!loading && location && (
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center py-1.5 border-t border-white/10">
                      <span className="text-gray-300">Region:</span>
                      <span className="font-semibold">{regionName}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-t border-white/10">
                      <span className="text-gray-300">Country:</span>
                      <span className="font-semibold">{country}</span>
                    </div>
                  </div>
                </div>

                {/* Location Actions */}
                <div className="space-y-2">
                  <Button 
                    onClick={handleRefreshLocation}
                    disabled={loading}
                    className="w-full bg-[#C8A55C] hover:bg-[#b8954c] text-[#0B1C2C] h-11 rounded-xl font-bold text-sm shadow-md"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? 'Detecting Location...' : 'Refresh Location'}
                  </Button>
                  
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex gap-2">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800">
                      We use your location to calculate accurate shipping rates and show relevant products for your region.
                    </p>
                  </div>
                </div>

                {/* Shipping Benefits */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#0B1C2C] uppercase tracking-wider">Location Benefits</h4>
                  <div className="space-y-2">
                    {[
                      'Accurate shipping cost estimates',
                      'Region-specific product recommendations',
                      'Local weather-resistant options',
                      'Faster delivery time calculations'
                    ].map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#0B1C2C]">
                    <ShieldCheck className="w-5 h-5 text-[#C8A55C]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Cookie Preferences</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="space-y-1 flex-1">
                        <Label htmlFor="essential-cookies" className="font-bold text-[#0B1C2C] text-sm">Essential Cookies</Label>
                        <p className="text-xs text-gray-500 max-w-[220px]">Required for the site to function properly. Cannot be disabled.</p>
                      </div>
                      <Switch id="essential-cookies" checked={true} disabled />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="space-y-1 flex-1">
                        <Label htmlFor="marketing-cookies" className="font-bold text-[#0B1C2C] text-sm">Marketing & Analytics</Label>
                        <p className="text-xs text-gray-500 max-w-[220px]">Help us improve your experience and show relevant content.</p>
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

                {/* Privacy Info */}
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-[#0B1C2C] uppercase tracking-wider">Your Privacy Matters</h4>
                  <div className="space-y-2 text-xs text-gray-600">
                    <p>• We never sell your personal information</p>
                    <p>• Location data is used only for shipping calculations</p>
                    <p>• You can opt out of marketing cookies anytime</p>
                    <p>• All data is encrypted and securely stored</p>
                  </div>
                </div>

                <Button onClick={onClose} className="w-full bg-[#0B1C2C] hover:bg-[#1a2e44] text-white h-11 rounded-xl font-bold text-sm shadow-lg">
                  Save Privacy Settings
                </Button>
              </div>
            )}

          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
