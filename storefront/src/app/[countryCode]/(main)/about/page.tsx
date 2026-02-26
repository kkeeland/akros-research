import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about AKRO Research and our commitment to quality research chemicals.",
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
      <div className="text-center mb-16">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-gold mb-3">
          About Us
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
          Advancing Research Through
          <span className="text-gold-gradient"> Excellence</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          AKRO Research is dedicated to providing the highest quality research
          chemicals and peptides to the scientific community.
        </p>
      </div>

      <div className="space-y-12">
        <div className="card-panel p-8 md:p-12">
          <h2 className="text-xl font-heading font-bold mb-4">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed">
            We believe that groundbreaking scientific discoveries start with
            exceptional raw materials. Our mission is to empower researchers
            worldwide by providing precision-grade peptides and compounds that
            meet the most rigorous standards of purity and consistency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-panel p-6 text-center">
            <div className="text-3xl font-bold text-brand-gold mb-2">99%+</div>
            <p className="text-sm text-text-muted">Purity Guaranteed</p>
          </div>
          <div className="card-panel p-6 text-center">
            <div className="text-3xl font-bold text-brand-gold mb-2">HPLC</div>
            <p className="text-sm text-text-muted">Verified Testing</p>
          </div>
          <div className="card-panel p-6 text-center">
            <div className="text-3xl font-bold text-brand-gold mb-2">CoA</div>
            <p className="text-sm text-text-muted">With Every Order</p>
          </div>
        </div>

        <div className="card-panel p-8 md:p-12">
          <h2 className="text-xl font-heading font-bold mb-4">Quality Assurance</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Every product undergoes rigorous third-party testing through
            independent laboratories. We utilize High-Performance Liquid
            Chromatography (HPLC) and Mass Spectrometry (MS) to verify the
            identity and purity of each batch.
          </p>
          <p className="text-text-secondary leading-relaxed">
            A Certificate of Analysis (CoA) is provided with every product,
            documenting test results and confirming compliance with our strict
            quality standards.
          </p>
        </div>
      </div>
    </div>
  )
}
