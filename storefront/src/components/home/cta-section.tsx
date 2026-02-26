import Link from "next/link"

export default function CtaSection({ countryCode }: { countryCode: string }) {
  return (
    <section className="py-24 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="card-panel p-12 md:p-16 relative overflow-hidden">
          {/* Gold accent glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-gold/5 blur-[80px] rounded-full" />

          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-gold mb-4 relative z-10">
            Start Your Research
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 relative z-10">
            Ready to Advance Your Studies?
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8 relative z-10">
            Browse our catalog of premium research peptides and compounds,
            each with Certificate of Analysis and guaranteed purity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href={`/${countryCode}/products`} className="btn-primary px-8">
              Shop Now
            </Link>
            <Link href={`/${countryCode}/contact`} className="btn-secondary px-8">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
