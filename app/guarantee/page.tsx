import { CheckCircle, Shield, RotateCcw, DollarSign } from "lucide-react"

export default function GuaranteePage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Our Guarantee</h1>
          <p className="text-lg text-[#0B1C2C]/70">
            Your satisfaction is our top priority. We stand behind every product we sell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="bg-[#C8A55C]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-[#C8A55C]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">Quality Guarantee</h3>
            <p className="text-[#0B1C2C]/70">
              Every flagpole we sell meets our rigorous quality standards. If you're not completely satisfied with the
              quality of your purchase, we'll make it right.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="bg-[#C8A55C]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-8 h-8 text-[#C8A55C]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">Price Match Guarantee</h3>
            <p className="text-[#0B1C2C]/70">
              Found a lower price on an identical product? We'll match it. We're committed to offering the best value in
              the industry.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="bg-[#C8A55C]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <RotateCcw className="w-8 h-8 text-[#C8A55C]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">30-Day Returns</h3>
            <p className="text-[#0B1C2C]/70">
              Not satisfied with your purchase? Return it within 30 days for a full refund. No questions asked, no
              restocking fees.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="bg-[#C8A55C]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-[#C8A55C]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">Lifetime Support</h3>
            <p className="text-[#0B1C2C]/70">
              Our commitment doesn't end at purchase. We provide lifetime customer support for all our products,
              including installation help and maintenance advice.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Price Match Guarantee Details</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <p>
                We're confident that we offer the best prices on quality flagpoles. If you find a lower advertised price
                on an identical product from an authorized dealer, we'll match it.
              </p>
              <p>
                <strong className="text-[#0B1C2C]">How it works:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Find a lower price on an identical product from an authorized dealer</li>
                <li>Contact us with proof of the lower price (screenshot, link, or advertisement)</li>
                <li>We'll verify the price and match it on your order</li>
                <li>Price match applies to the product price only (excludes shipping and taxes)</li>
              </ul>
              <p className="text-sm">
                *Price match excludes clearance items, used products, and unauthorized dealers. Must be verifiable at
                time of purchase.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Satisfaction Guarantee</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <p>
                Your complete satisfaction is our goal. If you're not happy with your purchase for any reason, you can
                return it within 30 days for a full refund.
              </p>
              <p>
                <strong className="text-[#0B1C2C]">Our promise:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>No restocking fees on returns</li>
                <li>Free return shipping on defective items</li>
                <li>Fast refund processing (5-7 business days)</li>
                <li>Hassle-free return process</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Installation Support</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <p>
                We want to make sure your flagpole installation goes smoothly. That's why we provide comprehensive
                installation support at no extra charge.
              </p>
              <p>
                <strong className="text-[#0B1C2C]">What's included:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Detailed installation guides and videos</li>
                <li>Phone and email support from our installation experts</li>
                <li>Troubleshooting assistance</li>
                <li>Recommendations for professional installers in your area</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#C8A55C] text-white rounded-lg p-8 shadow-md text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Questions About Our Guarantee?</h2>
            <p className="mb-6">Our customer service team is here to help with any questions about our guarantees.</p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#C8A55C] hover:bg-gray-100 font-medium px-6 py-3 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
