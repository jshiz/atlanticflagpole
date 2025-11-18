import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube } from 'lucide-react'

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

export function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-b from-[#0B1C2C] to-[#0A2740] text-white pb-32">
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Newsletter Block */}
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#1F6FFF] flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-xl">Stay In The Loop</h3>
                  <p className="text-white/90 text-sm max-w-md mx-auto">
                    Get exclusive deals, new product launches, and flagpole tips delivered to your inbox.
                  </p>
                  <form className="flex gap-2 max-w-md mx-auto pt-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm border border-white/20 focus:border-[#1F6FFF] focus:outline-none focus:ring-2 focus:ring-[#1F6FFF]/50 placeholder:text-white/60"
                      aria-label="Email address for newsletter"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#1F6FFF] hover:bg-[#1557CC] text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Contact Card */}
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#C8A55C] flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-xl">Got a Question?</h3>
                  <a
                    href="tel:518-400-0765"
                    className="text-2xl font-bold text-white hover:text-[#C8A55C] transition-colors block"
                  >
                    518-400-0765
                  </a>
                  <div className="pt-1 max-w-md mx-auto">
                    <input
                      type="search"
                      placeholder="What can we help you find today?"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm border border-white/20 focus:border-[#1F6FFF] focus:outline-none focus:ring-2 focus:ring-[#1F6FFF]/50 placeholder:text-white/60"
                      aria-label="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#0A2740] to-[#0B1C2C] border-y border-white/10">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-white font-bold text-2xl mb-8">Trusted & Secure</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-[#C8A55C] hover:bg-white/10 transition-all flex items-center justify-center relative h-32">
                  <Image
                    src="/images/design-mode/phoenix-flagpole-sticker-logo-final-2020-securi-lok-opt.png"
                    alt="Phoenix Flagpole Securi-Lok Technology"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-[#C8A55C] hover:bg-white/10 transition-all flex items-center justify-center relative h-32">
                  <Image
                    src="/images/design-mode/flagpole-made-in-the-usa.png"
                    alt="Made in the USA - American Made Flagpoles"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-[#C8A55C] hover:bg-white/10 transition-all flex items-center justify-center relative h-32">
                  <Image
                    src="/images/design-mode/365-day-satisfaction-guarantee-phoenix-flagpole-200px.png"
                    alt="365-Day Satisfaction Guarantee"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-[#C8A55C] hover:bg-white/10 transition-all flex items-center justify-center relative h-32">
                  <Image
                    src="/images/design-mode/911-limited-edition-phoenix-flagpole-flagpole-bundle-200px.png"
                    alt="911 Limited Edition Phoenix Flagpole Bundle"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Added safe checkout image to footer */}
              <div className="mt-12 flex justify-center">
                <div className="relative w-full max-w-md h-24">
                  <Image
                    src="/images/safecheckout.png"
                    alt="Guaranteed Safe Checkout"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 pb-8 border-b border-white/10">
              <h3 className="text-white font-bold text-2xl mb-3">Atlantic Flagpole</h3>
              <p className="text-white/90 max-w-2xl mx-auto mb-6 text-base leading-relaxed">
                Premium American-made flagpoles with a lifetime guarantee. The last flagpole you will ever need.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Link
                  href="/flagpole-finder"
                  className="relative bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] hover:from-[#a88947] hover:to-[#C8A55C] px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all shadow-lg hover:shadow-xl group overflow-hidden text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">Flagpole Finder</span>
                </Link>
                <Link
                  href="/?quiz=open"
                  className="bg-[#1F6FFF] hover:bg-[#1557CC] px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all shadow-lg hover:shadow-xl text-center"
                >
                  Flagpole Quiz
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center">
              <div className="space-y-3">
                <h4 className="text-white font-semibold text-base mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/products" className="text-white/90 hover:text-white transition-colors text-sm">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-white/90 hover:text-white transition-colors text-sm">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/warranty" className="text-white/90 hover:text-white transition-colors text-sm">
                      Warranty
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white/90 hover:text-white transition-colors text-sm">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-semibold text-base mb-4">Customer Service</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/shipping" className="text-white/90 hover:text-white transition-colors text-sm">
                      Shipping Info
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-white/90 hover:text-white transition-colors text-sm">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-white/90 hover:text-white transition-colors text-sm">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/installation" className="text-white/90 hover:text-white transition-colors text-sm">
                      Installation Guide
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-semibold text-base mb-4">Info Center</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/info-center/phoenix-365-day-home-trial"
                      className="text-white/90 hover:text-white transition-colors text-sm font-medium"
                    >
                      365-Day Home Trial
                    </Link>
                  </li>
                  <li>
                    <Link href="/reviews" className="text-white/90 hover:text-white transition-colors text-sm">
                      Customer Reviews
                    </Link>
                  </li>
                  <li>
                    <Link href="/testimonials" className="text-white/90 hover:text-white transition-colors text-sm">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-white/90 hover:text-white transition-colors text-sm">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mb-6 pb-6 border-b border-white/10">
              <h4 className="text-white font-semibold text-base mb-4">Connect With Us</h4>
              <div className="flex gap-3 justify-center">
                <Link
                  href="https://www.facebook.com/AtlanticFlagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link
                  href="http://instagram.com/atlanticflagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link
                  href="https://x.com/AtlanticFlagP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <XIcon />
                </Link>
                <Link
                  href="https://www.youtube.com/user/telescopingflagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.pinterest.com/atlanticflagandpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Pinterest"
                >
                  <PinterestIcon />
                </Link>
                <Link
                  href="https://www.tumblr.com/best-flag-pole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#E63946] flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Tumblr"
                >
                  <TumblrIcon />
                </Link>
              </div>
            </div>

            <div className="bg-[#0B1C2C] -mx-4 px-4 py-6 mt-6 rounded-t-2xl border-t border-white/10">
              <div className="text-center space-y-3">
                <div className="flex flex-wrap justify-center gap-4 text-xs text-white/80 mb-2">
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/cookie-policy" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                  <Link href="/cookie-settings" className="hover:text-white transition-colors">
                    Cookie Settings
                  </Link>
                  <Link href="/accessibility" className="hover:text-white transition-colors">
                    Accessibility
                  </Link>
                  <Link href="/sitemap" className="hover:text-white transition-colors">
                    Sitemap
                  </Link>
                </div>
                <p className="text-xs text-white/80">
                  &copy; {new Date().getFullYear()} Atlantic Flagpole. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
