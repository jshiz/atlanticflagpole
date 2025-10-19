import Link from "next/link"
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

      <footer className="bg-navy text-ivory pb-32">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-gold font-bold text-lg">Atlantic Flagpoles</h3>
              <p className="text-sm leading-relaxed">
                Premium American-made flagpoles with a lifetime guarantee. The last flagpole you will ever need.
              </p>
              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/flagpole-finder"
                  className="relative bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] hover:from-[#a88947] hover:to-[#C8A55C] px-4 py-2.5 rounded-md text-white font-semibold transition-all text-sm shadow-lg hover:shadow-xl group overflow-hidden text-center"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#C8A55C] to-[#d4b56f] opacity-50 blur-xl animate-pulse" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Flagpole Finder
                  </span>
                </Link>
                <Link
                  href="/?quiz=open"
                  className="bg-[#0B1C2C] hover:bg-[#0B1C2C]/90 px-4 py-2.5 rounded-md text-white font-semibold transition-colors text-sm text-center"
                >
                  Flagpole Quiz
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-gold font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products" className="hover:text-gold transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gold transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="hover:text-gold transition-colors">
                    Warranty
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gold transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="text-gold font-semibold">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/shipping" className="hover:text-gold transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-gold transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-gold transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/installation" className="hover:text-gold transition-colors">
                    Installation Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect With Us */}
            <div className="space-y-4">
              <h4 className="text-gold font-semibold">Connect With Us</h4>
              <p className="text-sm">Follow us on social media for updates and special offers</p>
              <div className="flex gap-4">
                <Link
                  href="https://www.facebook.com/AtlanticFlagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="http://instagram.com/atlanticflagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://x.com/AtlanticFlagP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XIcon />
                </Link>
                <Link
                  href="https://www.youtube.com/user/telescopingflagpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.pinterest.com/atlanticflagandpole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                  aria-label="Pinterest"
                >
                  <PinterestIcon />
                </Link>
                <Link
                  href="https://www.tumblr.com/best-flag-pole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                  aria-label="Tumblr"
                >
                  <TumblrIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-afp-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} Atlantic Flagpoles. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
