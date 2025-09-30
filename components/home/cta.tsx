import Link from "next/link"

export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-[#F5F3EF]">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1C2C] mb-4">
          Why Buy From Atlantic Flag & Pole
        </h2>
        <p className="text-lg md:text-xl text-[#333333] mb-8 leading-relaxed">
          Our family builds the finest, most enduring flagpole on the market. Backed by a lifetime guarantee and crafted
          with pride in the USA.
        </p>
        <Link href="/products" className="btn-gold text-lg px-8 py-4">
          Shop Flagpoles
        </Link>
      </div>
    </section>
  )
}
