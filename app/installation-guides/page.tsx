import Link from "next/link"
import { Download, Video, FileText } from "lucide-react"

export default function InstallationGuidesPage() {
  const guides = [
    {
      title: "Telescoping Flagpole Installation",
      description: "Complete guide for installing telescoping flagpoles",
      type: "PDF Guide",
      icon: FileText,
    },
    {
      title: "In-Ground Flagpole Installation",
      description: "Step-by-step instructions for permanent installations",
      type: "Video Tutorial",
      icon: Video,
    },
    {
      title: "Wall Mount Installation",
      description: "How to properly mount flagpoles to walls and buildings",
      type: "PDF Guide",
      icon: FileText,
    },
    {
      title: "Flagpole Lighting Setup",
      description: "Installing solar and LED lighting systems",
      type: "Video Tutorial",
      icon: Video,
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1C2C] mb-4">Installation Guides</h1>
          <p className="text-lg text-[#0B1C2C]/70">
            Professional installation guides and video tutorials to help you set up your flagpole correctly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {guides.map((guide, index) => {
            const Icon = guide.icon
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#C8A55C]/10 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-[#C8A55C]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#C8A55C] font-medium mb-1">{guide.type}</p>
                    <h3 className="text-xl font-serif font-bold text-[#0B1C2C] mb-2">{guide.title}</h3>
                    <p className="text-[#0B1C2C]/70 mb-4">{guide.description}</p>
                    <button className="inline-flex items-center gap-2 text-[#C8A55C] hover:text-[#a88947] font-medium transition-colors">
                      <Download className="w-4 h-4" />
                      Download Guide
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-4">Need Help?</h2>
          <p className="text-[#0B1C2C]/70 mb-6">
            Our installation experts are here to help. Contact us for personalized assistance with your flagpole
            installation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C8A55C] hover:bg-[#a88947] text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  )
}
