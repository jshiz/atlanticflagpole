export const dynamic = "force-dynamic"

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-6">Cookie Policy</h1>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#0B1C2C]/10 space-y-6">
            <section>
              <p className="text-[#0B1C2C]/80 mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-[#0B1C2C]/80">
                This Cookie Policy explains how Atlantic Flagpole ("we", "us", or "our") uses cookies and similar
                technologies when you visit our website. This policy should be read together with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">What Are Cookies?</h2>
              <p className="text-[#0B1C2C]/80">
                Cookies are small text files that are placed on your device when you visit a website. They are widely
                used to make websites work more efficiently and provide information to website owners. Cookies help us
                understand how you use our site and improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">Types of Cookies We Use</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">1. Essential Cookies (Always Active)</h3>
                  <p className="text-[#0B1C2C]/80 mb-2">
                    These cookies are necessary for the website to function and cannot be switched off. They are usually
                    only set in response to actions you take, such as setting privacy preferences, logging in, or
                    filling in forms.
                  </p>
                  <ul className="list-disc list-inside text-[#0B1C2C]/80 ml-4">
                    <li>
                      <strong>Shopping Cart:</strong> Remembers items you've added to your cart
                    </li>
                    <li>
                      <strong>Authentication:</strong> Keeps you logged in during your session
                    </li>
                    <li>
                      <strong>Security:</strong> Protects against fraud and ensures secure connections
                    </li>
                    <li>
                      <strong>Load Balancing:</strong> Distributes traffic across our servers
                    </li>
                  </ul>
                  <p className="text-sm text-[#0B1C2C]/60 mt-2">
                    <strong>Duration:</strong> Session cookies (deleted when you close your browser) or up to 30 days
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">2. Analytics Cookies (Optional)</h3>
                  <p className="text-[#0B1C2C]/80 mb-2">
                    These cookies help us understand how visitors interact with our website by collecting and reporting
                    information anonymously. This data helps us improve our site's performance and user experience.
                  </p>
                  <ul className="list-disc list-inside text-[#0B1C2C]/80 ml-4">
                    <li>
                      <strong>Google Analytics:</strong> Tracks page views, session duration, and user behavior
                    </li>
                    <li>
                      <strong>Performance Monitoring:</strong> Identifies slow pages and technical issues
                    </li>
                    <li>
                      <strong>Error Tracking:</strong> Helps us fix bugs and improve functionality
                    </li>
                  </ul>
                  <p className="text-sm text-[#0B1C2C]/60 mt-2">
                    <strong>Duration:</strong> Up to 2 years
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0B1C2C] mb-2">3. Marketing Cookies (Optional)</h3>
                  <p className="text-[#0B1C2C]/80 mb-2">
                    These cookies track your browsing activity across websites to display relevant advertisements and
                    measure campaign effectiveness. They help us show you products you might be interested in.
                  </p>
                  <ul className="list-disc list-inside text-[#0B1C2C]/80 ml-4">
                    <li>
                      <strong>Retargeting:</strong> Shows you relevant ads on other websites
                    </li>
                    <li>
                      <strong>Personalization:</strong> Recommends products based on your interests
                    </li>
                    <li>
                      <strong>Social Media:</strong> Enables sharing and social media advertising
                    </li>
                  </ul>
                  <p className="text-sm text-[#0B1C2C]/60 mt-2">
                    <strong>Duration:</strong> Up to 1 year
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">Why We Collect This Data</h2>
              <ul className="list-disc list-inside text-[#0B1C2C]/80 space-y-2 ml-4">
                <li>
                  <strong>Improve User Experience:</strong> Understand how you use our site to make it better
                </li>
                <li>
                  <strong>Shopping Cart Functionality:</strong> Remember items you've added to your cart
                </li>
                <li>
                  <strong>Personalization:</strong> Show you relevant products and content
                </li>
                <li>
                  <strong>Performance Optimization:</strong> Identify and fix technical issues
                </li>
                <li>
                  <strong>Marketing Effectiveness:</strong> Measure the success of our advertising campaigns
                </li>
                <li>
                  <strong>Security:</strong> Protect against fraud and unauthorized access
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">How Long We Store Cookies</h2>
              <p className="text-[#0B1C2C]/80 mb-2">Cookie storage duration varies by type:</p>
              <ul className="list-disc list-inside text-[#0B1C2C]/80 space-y-1 ml-4">
                <li>
                  <strong>Session Cookies:</strong> Deleted when you close your browser
                </li>
                <li>
                  <strong>Essential Cookies:</strong> Up to 30 days
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Up to 2 years
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Up to 1 year
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">Your Rights and Choices</h2>
              <p className="text-[#0B1C2C]/80 mb-2">You have the right to control how we use cookies on our site:</p>
              <ul className="list-disc list-inside text-[#0B1C2C]/80 space-y-2 ml-4">
                <li>
                  <strong>Accept or Reject:</strong> Choose which types of cookies you want to allow
                </li>
                <li>
                  <strong>Change Preferences:</strong> Update your cookie settings at any time
                </li>
                <li>
                  <strong>Browser Settings:</strong> Configure your browser to block or delete cookies
                </li>
                <li>
                  <strong>Opt-Out:</strong> Reject non-essential cookies without affecting site functionality
                </li>
              </ul>
              <p className="text-[#0B1C2C]/80 mt-4">
                To manage your cookie preferences, visit our{" "}
                <a href="/cookie-settings" className="text-[#C8A55C] hover:text-[#a88947] underline">
                  Cookie Settings
                </a>{" "}
                page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">Third-Party Cookies</h2>
              <p className="text-[#0B1C2C]/80">
                Some cookies are placed by third-party services that appear on our pages. We do not control these
                cookies. Third parties include:
              </p>
              <ul className="list-disc list-inside text-[#0B1C2C]/80 space-y-1 ml-4 mt-2">
                <li>Google Analytics (analytics and performance)</li>
                <li>Social media platforms (sharing and advertising)</li>
                <li>Payment processors (secure transactions)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">Contact Us</h2>
              <p className="text-[#0B1C2C]/80">If you have questions about our use of cookies, please contact us:</p>
              <div className="mt-3 text-[#0B1C2C]/80">
                <p>
                  <strong>Email:</strong> privacy@atlanticflagpoles.com
                </p>
                <p>
                  <strong>Phone:</strong> 1-800-FLAGPOLE (1-800-352-4765)
                </p>
                <p>
                  <strong>Address:</strong> 123 Liberty Street, Boston, MA 02101
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0B1C2C] mb-3">Updates to This Policy</h2>
              <p className="text-[#0B1C2C]/80">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal
                reasons. We will notify you of any significant changes by posting the new policy on this page with an
                updated "Last Updated" date.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}
