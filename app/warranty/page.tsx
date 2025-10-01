import { Shield, CheckCircle, Clock, FileText } from "lucide-react"

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Warranty Information</h1>
          <p className="text-lg text-[#0B1C2C]/70">Industry-leading warranties on all our products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-[#C8A55C]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">Lifetime Warranty</h3>
            <p className="text-[#0B1C2C]/70">Select flagpoles come with lifetime structural warranty</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-[#C8A55C]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">Quality Guaranteed</h3>
            <p className="text-[#0B1C2C]/70">All products covered against manufacturing defects</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-[#C8A55C]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">Fast Claims</h3>
            <p className="text-[#0B1C2C]/70">Quick and easy warranty claim process</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-[#C8A55C]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">No Registration</h3>
            <p className="text-[#0B1C2C]/70">Warranty automatically applies to all purchases</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Flagpole Warranties</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <p>
                <strong className="text-[#0B1C2C]">Telescoping Flagpoles:</strong> Lifetime warranty on pole structure,
                5-year warranty on hardware and components
              </p>
              <p>
                <strong className="text-[#0B1C2C]">Aluminum Flagpoles:</strong> 20-year warranty on pole structure,
                5-year warranty on finish and hardware
              </p>
              <p>
                <strong className="text-[#0B1C2C]">Indoor Flagpoles:</strong> 5-year warranty on all components
              </p>
              <p>
                Our warranties cover manufacturing defects and structural failures under normal use. This includes
                issues with materials, workmanship, and finish quality.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">What's Covered</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Manufacturing defects in materials and workmanship</li>
                <li>Structural failures under normal use conditions</li>
                <li>Finish defects (peeling, flaking, excessive fading)</li>
                <li>Hardware failures (pulleys, cleats, rings)</li>
                <li>Rope and halyard defects</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">What's Not Covered</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Damage from improper installation or use</li>
                <li>Damage from extreme weather events (hurricanes, tornadoes)</li>
                <li>Normal wear and tear from regular use</li>
                <li>Damage from accidents, abuse, or neglect</li>
                <li>Modifications or alterations to the product</li>
                <li>Flags (separate warranty applies)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Filing a Warranty Claim</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <p>To file a warranty claim, please contact our customer service team with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your order number or proof of purchase</li>
                <li>Photos of the defect or issue</li>
                <li>Description of the problem</li>
                <li>Date of purchase and installation</li>
              </ul>
              <p>
                We'll review your claim and respond within 2-3 business days. If approved, we'll send replacement parts
                or a new product at no charge.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Questions About Your Warranty?</h2>
            <p className="text-[#0B1C2C]/70 mb-6">
              Our customer service team is here to help with any warranty questions or claims.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#C8A55C] hover:bg-[#a88947] text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
