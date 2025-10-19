import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Contact Us</h1>
          <p className="text-lg text-[#0B1C2C]/70">
            We're here to help with any questions about our products or services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#0B1C2C] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0B1C2C] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#0B1C2C] mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#0B1C2C] mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent"
                >
                  <option>Product Question</option>
                  <option>Order Status</option>
                  <option>Installation Help</option>
                  <option>Warranty Claim</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#0B1C2C] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C8A55C] hover:bg-[#a88947] text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-[#C8A55C]/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1C2C] mb-1">Phone</h3>
                  <p className="text-[#0B1C2C]/70">1-800-FLAGPOLE</p>
                  <p className="text-[#0B1C2C]/70">(1-800-352-4765)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-[#C8A55C]/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1C2C] mb-1">Email</h3>
                  <p className="text-[#0B1C2C]/70">support@atlanticflagpoles.com</p>
                  <p className="text-sm text-[#0B1C2C]/60 mt-1">We respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-[#C8A55C]/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1C2C] mb-1">Business Hours</h3>
                  <p className="text-[#0B1C2C]/70">Monday - Friday: 8am - 6pm EST</p>
                  <p className="text-[#0B1C2C]/70">Saturday: 9am - 4pm EST</p>
                  <p className="text-[#0B1C2C]/70">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-[#C8A55C]/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1C2C] mb-1">Address</h3>
                  <p className="text-[#0B1C2C]/70">Atlantic Flagpole</p>
                  <p className="text-[#0B1C2C]/70">123 Liberty Street</p>
                  <p className="text-[#0B1C2C]/70">Boston, MA 02101</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
