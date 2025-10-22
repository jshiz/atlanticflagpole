import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, HelpCircle, Phone, Mail, MessageCircle } from "lucide-react"

export const metadata = {
  title: "Info Center | Atlantic Flagpole",
  description: "Find helpful resources, guides, and information about flagpoles, installation, maintenance, and more.",
}

export default function InfoCenterPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-6 text-center">Info Center</h1>
          <p className="text-lg text-[#0B1C2C]/70 mb-12 text-center">
            Everything you need to know about flagpoles, installation, maintenance, and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link
              href="/help-center"
              className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#C8A55C]/10 rounded-lg">
                  <HelpCircle className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                    Help Center
                  </h3>
                  <p className="text-[#0B1C2C]/70">Browse our comprehensive help articles and guides</p>
                </div>
              </div>
            </Link>

            <Link
              href="/help-center/installation"
              className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#C8A55C]/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                    Installation Guides
                  </h3>
                  <p className="text-[#0B1C2C]/70">Step-by-step instructions for installing your flagpole</p>
                </div>
              </div>
            </Link>

            <Link
              href="/help-center/maintenance"
              className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#C8A55C]/10 rounded-lg">
                  <FileText className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                    Maintenance & Care
                  </h3>
                  <p className="text-[#0B1C2C]/70">Learn how to maintain and care for your flagpole</p>
                </div>
              </div>
            </Link>

            <Link
              href="/info-center/phoenix-365-day-home-trial"
              className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#C8A55C]/10 rounded-lg">
                  <FileText className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1C2C] mb-2 group-hover:text-[#C8A55C] transition-colors">
                    365-Day Home Trial
                  </h3>
                  <p className="text-[#0B1C2C]/70">Learn about our industry-leading 365-day guarantee</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-[#0B1C2C] mb-6 text-center">Need More Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex p-4 bg-[#C8A55C]/10 rounded-full mb-4">
                  <Phone className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <h3 className="font-semibold text-[#0B1C2C] mb-2">Call Us</h3>
                <p className="text-sm text-[#0B1C2C]/70 mb-3">Mon-Fri, 9am-5pm EST</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:1-800-123-4567">1-800-123-4567</a>
                </Button>
              </div>

              <div className="text-center">
                <div className="inline-flex p-4 bg-[#C8A55C]/10 rounded-full mb-4">
                  <Mail className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <h3 className="font-semibold text-[#0B1C2C] mb-2">Email Us</h3>
                <p className="text-sm text-[#0B1C2C]/70 mb-3">We'll respond within 24 hours</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:support@atlanticflagpole.com">Send Email</a>
                </Button>
              </div>

              <div className="text-center">
                <div className="inline-flex p-4 bg-[#C8A55C]/10 rounded-full mb-4">
                  <MessageCircle className="w-6 h-6 text-[#C8A55C]" />
                </div>
                <h3 className="font-semibold text-[#0B1C2C] mb-2">Live Chat</h3>
                <p className="text-sm text-[#0B1C2C]/70 mb-3">Chat with our team</p>
                <Button variant="outline" size="sm">
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
