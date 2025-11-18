"use client"

import { MessageCircle, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CartSupportSection() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C8A55C] shadow-md flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-[#C8A55C] to-[#a88947] flex items-center justify-center text-white font-bold text-lg">
            AF
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-green-700">Available 24/7</span>
          </div>
          <h3 className="font-bold text-[#0B1C2C] text-lg">Our Flagpole Specialists are here for you.</h3>
          <p className="text-sm text-gray-600 mt-1">Expert guidance for your perfect flagpole setup</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="w-full border-2 border-[#C8A55C] hover:bg-[#C8A55C] hover:text-white transition-all"
          onClick={() => {
            // Add your chat integration here
            console.log("Opening chat...")
          }}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat Now
        </Button>
        <Button 
          variant="outline"
          className="w-full border-2 border-[#C8A55C] hover:bg-[#C8A55C] hover:text-white transition-all"
          asChild
        >
          <a href="tel:+18889640968">
            <Phone className="w-4 h-4 mr-2" />
            Call Us
          </a>
        </Button>
      </div>
    </div>
  )
}
