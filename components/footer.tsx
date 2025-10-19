import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Sparkles } from "lucide-react"
import { JudgemeFooterWidget } from "./judgeme/judgeme-footer-widget"

const PinterestIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
)

const TumblrIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export async function Footer() {
  return (
    <>
      <JudgemeFooterWidget />

      {/* Main Footer Background Changed to Navy Blue Gradient */}
      <footer className="bg-gradient-to-b from-[#0B1C2C] to-[#0A2740] text-white pb-32">
        {/* Newsletter & Contact Section - Centered */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Newsletter Block - Centered */}
                <div className="text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#1F6FFF] flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-2xl">Stay In The Loop</h3>
                  <p className="text-white/90 max-w-md mx-auto">
                    Get exclusive deals, new product launches, and flagpole tips delivered to your inbox.
                  </p>
                  <form className="flex gap-2 max-w-md mx-auto pt-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-[#1F6FFF] focus:outline-none focus:ring-2 focus:ring-[#1F6FFF]/50 placeholder:text-white/60"
                      aria-label="Email address for newsletter"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#1F6FFF] hover:bg-[#1557CC] text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Contact Card - Centered */}
                <div className="text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#C8A55C] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-2xl">Got a Question?</h3>
                  <a
                    href="tel:518-400-0765"
                    className="text-3xl font-bold text-white hover:text-[#C8A55C] transition-colors block"
                  >
                    518-400-0765
                  </a>
                  <div className="pt-2 max-w-md mx-auto">
                    <input
                      type="search"
                      placeholder="What can we help you find today?"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-[#1F6FFF] focus:outline-none focus:ring-2 focus:ring-[#1F6FFF]/50 placeholder:text-white/60"
                      aria-label="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Section with Red Background Accent */}
        <div className="bg-[#E63946] border-b border-white/10">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto text-center">
              <h3 className="text-white font-bold text-2xl mb-8">Trusted & Secure</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Phoenix Flagpole Securi-Lok Logo */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white transition-all hover:shadow-lg hover:shadow-white/20 flex items-center justify-center">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/2133/9559/files/phoenix-flagpole-sticker-logo-final-2020-securi-lok-opt.png?v=1760562626"
                    alt="Phoenix Flagpole Securi-Lok Technology"
                    width={150}
                    height={150}
                    className="w-full h-auto max-w-[120px]"
                  />
                </div>

                {/* Made in USA Badge */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white transition-all hover:shadow-lg hover:shadow-white/20 flex items-center justify-center">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/2133/9559/files/flagpole-made-in-the-usa.png?v=1687894210"
                    alt="Made in the USA - American Made Flagpoles"
                    width={150}
                    height={150}
                    className="w-full h-auto max-w-[120px]"
                  />
                </div>

                {/* 365-Day Satisfaction Guarantee */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white transition-all hover:shadow-lg hover:shadow-white/20 flex items-center justify-center">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/2133/9559/files/365-day-satisfaction-guarantee-phoenix-flagpole-200px.png?v=1687894210"
                    alt="365-Day Satisfaction Guarantee"
                    width={150}
                    height={150}
                    className="w-full h-auto max-w-[120px]"
                  />
                </div>

                {/* 911 Limited Edition */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white transition-all hover:shadow-lg hover:shadow-white/20 flex items-center justify-center">
                  <Image
                    src="https://cdn.shopify.com/s/files/1/2133/9559/files/911-limited-edition-phoenix-flagpole-flagpole-bundle-200px.png?v=1687894210"
                    alt="911 Limited Edition Phoenix Flagpole Bundle"
                    width={150}
                    height={150}
                    className="w-full h-auto max-w-[120px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content - Centered */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Company Info & CTAs - Centered */}
            <div className="text-center mb-16 pb-16 border-b border-white/10">
              <h3 className="text-white font-bold text-3xl mb-4">Atlantic Flagpole</h3>
              <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                Premium American-made flagpoles with a lifetime guarantee. The last flagpole you will ever need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link
                  href="/flagpole-finder"
                  className="relative bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] hover:from-[#a88947] hover:to-[#C8A55C] px-6 py-3 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl group overflow-hidden text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Flagpole Finder
                  </span>
                </Link>
                <Link
                  href="/?quiz=open"
                  className="bg-[#1F6FFF] hover:bg-[#1557CC] px-6 py-3 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl text-center"
                >
                  Flagpole Quiz
                </Link>
              </div>
            </div>

            {/* Footer Links - Centered Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center">
              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/products" className="text-white/90 hover:text-white transition-colors">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-white/90 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/warranty" className="text-white/90 hover:text-white transition-colors">
                      Warranty
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/90 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Customer Service */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg mb-6">Customer Service</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/shipping" className="text-white/90 hover:text-white transition-colors">
                      Shipping Info
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-white/90 hover:text-white transition-colors">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-white/90 hover:text-white transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/installation" className="text-white/90 hover:text-white transition-colors">
                      Installation Guide
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Info Center */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg mb-6">Info Center</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/info-center/phoenix-365-day-home-trial"
                      className="text-white/90 hover:text-white transition-colors font-medium"
                    >
                      365-Day Home Trial
                    </Link>
                  </li>
                  <li>
                    <Link href="/reviews" className="text-white/90 hover:text-white transition-colors">
                      Customer Reviews
                    </Link>
                  </li>
                  <li>
                    <Link href="/testimonials" className="text-white/90 hover:text-white transition-colors">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-white/90 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media - Centered */}
            <div className="text-center mb-12 pb-12 border-b border-white/10">
              <h4 className="text-white font-semibold text-lg mb-6">Connect With Us</h4>
              <p className="text-white/90 mb-6 max-w-md mx-auto">
                Follow us on social media for updates, tips, and special offers
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="https://www.facebook.com/AtlanticFlagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="http://instagram.com/atlanticflagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://x.com/AtlanticFlagP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <XIcon />
                </Link>
                <Link
                  href="https://www.youtube.com/user/telescopingflagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.pinterest.com/atlanticflagandpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Pinterest"
                >
                  <PinterestIcon />
                </Link>
                <Link
                  href="https://www.tumblr.com/best-flag-pole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Tumblr"
                >
                  <TumblrIcon />
                </Link>
              </div>
            </div>

            {/* Safe Checkout Badge */}
            <div className="text-center mb-12 pb-12 border-b border-white/10">
              <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <Image
                  src="https://cdn.shopify.com/s/files/1/2133/9559/files/Guaranteed_Safe_Checkout_-_Fast_Shipping.png?v=1682186986"
                  alt="Guaranteed Safe Checkout - Fast Shipping"
                  width={800}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Bottom Bar - Centered */}
            <div className="text-center space-y-4">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80 mb-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/sitemap" className="hover:text-white transition-colors">
                  Sitemap
                </Link>
              </div>
              <p className="text-sm text-white/80">
                &copy; {new Date().getFullYear()} Atlantic Flagpole. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
