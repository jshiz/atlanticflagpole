export const dynamic = "force-dynamic"

export default function InstallationPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-serif font-bold text-[#0B1C2C] mb-6">Installation Guide</h1>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#0B1C2C]/10">
            <p className="text-[#0B1C2C]/80 mb-4">
              We're currently preparing comprehensive installation guides for our flagpoles. This content will be
              available soon.
            </p>

            <p className="text-[#0B1C2C]/80">
              For installation assistance, please contact our support team or refer to the documentation included with
              your purchase.
            </p>
          </div>
        </article>
      </div>
    </main>
  )
}
