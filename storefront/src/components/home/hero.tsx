import Link from "next/link"

export default function Hero({ countryCode }: { countryCode: string }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(184,150,12,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(43,45,66,0.1)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Eyebrow */}
        <p className="text-[11px] font-semibold tracking-[0.20em] uppercase text-brand-gold mb-6">
          Precision-Grade Research Chemicals
        </p>

        {/* Headline */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
          Advancing
          <span className="text-gold-gradient"> Science</span>
          <br />
          Through Purity
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          Premium peptides and research compounds, rigorously tested for
          ≥99% purity. Trusted by researchers and institutions worldwide.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${countryCode}/products`} className="btn-primary px-8 py-3.5">
            Browse Products
          </Link>
          <Link
            href={`/${countryCode}/research`}
            className="btn-secondary px-8 py-3.5"
          >
            Research Information
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
