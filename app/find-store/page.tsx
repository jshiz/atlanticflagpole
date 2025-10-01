import { MapPin, Phone, Clock, Navigation } from "lucide-react"

export default function FindStorePage() {
  const locations = [
    {
      name: "Atlantic Flagpoles - Boston",
      address: "123 Liberty Street, Boston, MA 02101",
      phone: "(617) 555-0100",
      hours: "Mon-Fri: 8am-6pm, Sat: 9am-4pm, Sun: Closed",
      type: "Flagship Store & Showroom",
    },
    {
      name: "Atlantic Flagpoles - New York",
      address: "456 Freedom Ave, New York, NY 10001",
      phone: "(212) 555-0200",
      hours: "Mon-Fri: 9am-7pm, Sat: 10am-5pm, Sun: Closed",
      type: "Retail Location",
    },
    {
      name: "Atlantic Flagpoles - Philadelphia",
      address: "789 Independence Blvd, Philadelphia, PA 19103",
      phone: "(215) 555-0300",
      hours: "Mon-Fri: 8am-6pm, Sat: 9am-4pm, Sun: Closed",
      type: "Retail Location",
    },
  ]

  const dealers = [
    { state: "Connecticut", count: 12 },
    { state: "Maine", count: 8 },
    { state: "Massachusetts", count: 24 },
    { state: "New Hampshire", count: 10 },
    { state: "New Jersey", count: 18 },
    { state: "New York", count: 32 },
    { state: "Pennsylvania", count: 22 },
    { state: "Rhode Island", count: 6 },
    { state: "Vermont", count: 7 },
  ]

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Find a Store</h1>
          <p className="text-lg text-[#0B1C2C]/70">
            Visit one of our retail locations or find an authorized dealer near you
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Our Retail Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="bg-[#C8A55C]/10 px-3 py-1 rounded-full inline-block mb-3">
                  <span className="text-xs font-medium text-[#C8A55C]">{location.type}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1C2C] mb-4">{location.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C8A55C] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#0B1C2C]/70">{location.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#C8A55C] flex-shrink-0" />
                    <p className="text-sm text-[#0B1C2C]/70">{location.phone}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#C8A55C] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#0B1C2C]/70">{location.hours}</p>
                  </div>
                </div>
                <button className="mt-4 w-full flex items-center justify-center gap-2 bg-[#C8A55C] hover:bg-[#a88947] text-white font-medium px-4 py-2 rounded-md transition-colors">
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-6">Authorized Dealers</h2>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <p className="text-[#0B1C2C]/70 mb-6">
              Find an authorized Atlantic Flagpoles dealer in your area. Our dealers carry a selection of our most
              popular products and can provide expert advice.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {dealers.map((dealer, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-[#F5F3EF] rounded-md">
                  <span className="font-medium text-[#0B1C2C]">{dealer.state}</span>
                  <span className="text-sm text-[#0B1C2C]/70">{dealer.count} dealers</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-[#0B1C2C] mb-4">Find a Dealer Near You</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter your ZIP code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C8A55C] focus:border-transparent"
                />
                <button className="bg-[#C8A55C] hover:bg-[#a88947] text-white font-medium px-6 py-2 rounded-md transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-5xl mx-auto bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Can't Find a Location?</h2>
          <p className="text-[#0B1C2C]/70 mb-6">
            We ship nationwide! Order online and have your flagpole delivered directly to your door with free shipping
            on orders over $99.
          </p>
          <div className="flex gap-4">
            <a
              href="/products"
              className="inline-block bg-[#C8A55C] hover:bg-[#a88947] text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Shop Online
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-[#C8A55C] text-[#C8A55C] hover:bg-[#C8A55C] hover:text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
