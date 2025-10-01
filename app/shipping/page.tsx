import { Truck, Package, RotateCcw, Shield } from "lucide-react"

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Shipping & Returns</h1>
          <p className="text-lg text-[#0B1C2C]/70">Fast, reliable shipping with hassle-free returns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-[#C8A55C]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">Free Shipping</h3>
            <p className="text-[#0B1C2C]/70">Free standard shipping on all orders over $99</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-[#C8A55C]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">Fast Processing</h3>
            <p className="text-[#0B1C2C]/70">Most orders ship within 1-2 business days</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-[#C8A55C]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">Easy Returns</h3>
            <p className="text-[#0B1C2C]/70">30-day return policy on most items</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-[#C8A55C]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#C8A55C]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">Secure Packaging</h3>
            <p className="text-[#0B1C2C]/70">All items carefully packaged for safe delivery</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Shipping Information</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <p>
                <strong className="text-[#0B1C2C]">Standard Shipping:</strong> 5-7 business days - FREE on orders over
                $99
              </p>
              <p>
                <strong className="text-[#0B1C2C]">Expedited Shipping:</strong> 2-3 business days - $29.99
              </p>
              <p>
                <strong className="text-[#0B1C2C]">Express Shipping:</strong> 1-2 business days - $49.99
              </p>
              <p>
                Orders are processed Monday through Friday (excluding holidays). Orders placed after 2 PM EST will be
                processed the next business day.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Return Policy</h2>
            <div className="space-y-4 text-[#0B1C2C]/70">
              <p>
                We want you to be completely satisfied with your purchase. If you're not happy with your order, you can
                return most items within 30 days of delivery for a full refund.
              </p>
              <p>
                <strong className="text-[#0B1C2C]">Return Requirements:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Items must be unused and in original packaging</li>
                <li>Include all accessories and documentation</li>
                <li>Contact us to initiate a return and receive a return authorization</li>
                <li>Custom or personalized items are not eligible for return</li>
              </ul>
              <p>
                <strong className="text-[#0B1C2C]">Refund Processing:</strong> Refunds are processed within 5-7 business
                days after we receive your return.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Need Help?</h2>
            <p className="text-[#0B1C2C]/70 mb-6">
              Have questions about shipping or returns? Our customer service team is here to help.
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
