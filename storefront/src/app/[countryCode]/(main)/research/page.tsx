import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Research Information",
  description: "Important information about the research-use-only nature of AKRO Research products.",
}

export default function ResearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
      <div className="text-center mb-16">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-gold mb-3">
          Important Information
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
          For Research Use Only
        </h1>
      </div>

      <div className="space-y-8">
        <div className="card-panel p-8 gold-border">
          <h2 className="text-xl font-heading font-bold text-brand-gold mb-4">
            Research Use Disclaimer
          </h2>
          <p className="text-text-secondary leading-relaxed">
            All products sold by AKRO Research are intended strictly for
            in-vitro research, laboratory experimentation, and educational
            purposes. They are <strong className="text-text-primary">not</strong>{" "}
            intended for human or veterinary use, nor for use in food, drug,
            household, or cosmetic applications.
          </p>
        </div>

        <div className="card-panel p-8">
          <h2 className="text-xl font-heading font-bold mb-4">
            Purchaser Responsibilities
          </h2>
          <ul className="space-y-4 text-text-secondary">
            <li className="flex gap-3">
              <span className="text-brand-gold mt-1">•</span>
              <span>
                Purchasers must be at least 18 years of age and associated with
                or employed by a research institution, university, or
                pharmaceutical company.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold mt-1">•</span>
              <span>
                Products must be handled by qualified and trained professionals
                in compliance with applicable local, state, and federal
                regulations.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold mt-1">•</span>
              <span>
                It is the purchaser&apos;s responsibility to ensure that all
                products are used in accordance with applicable laws and
                regulations.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-gold mt-1">•</span>
              <span>
                AKRO Research assumes no liability for any misuse of products
                sold through our platform.
              </span>
            </li>
          </ul>
        </div>

        <div className="card-panel p-8">
          <h2 className="text-xl font-heading font-bold mb-4">
            Quality & Testing
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Every batch of product we sell undergoes rigorous third-party
            analytical testing to verify identity and purity. Our standard
            testing methods include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle">
              <h3 className="text-sm font-semibold mb-1">HPLC Analysis</h3>
              <p className="text-xs text-text-muted">
                High-Performance Liquid Chromatography for purity verification
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle">
              <h3 className="text-sm font-semibold mb-1">Mass Spectrometry</h3>
              <p className="text-xs text-text-muted">
                MS analysis for molecular identity confirmation
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle">
              <h3 className="text-sm font-semibold mb-1">Endotoxin Testing</h3>
              <p className="text-xs text-text-muted">
                LAL testing for endotoxin levels where applicable
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface-elevated border border-border-subtle">
              <h3 className="text-sm font-semibold mb-1">Certificate of Analysis</h3>
              <p className="text-xs text-text-muted">
                Full CoA provided with every product purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
