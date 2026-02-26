import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
      <h1 className="text-3xl font-heading font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
        <div className="card-panel p-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the AKRO Research website and purchasing our products,
              you agree to be bound by these Terms of Service. If you do not agree to all
              of these terms, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">2. Research Use Only</h2>
            <p>
              All products sold by AKRO Research are for in-vitro research, laboratory
              use, and educational purposes only. Products are NOT intended for human
              or veterinary use, food additives, drug use, household use, or cosmetic use.
              By purchasing, you confirm that you understand and agree to this restriction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">3. Eligibility</h2>
            <p>
              You must be at least 18 years of age to purchase products from AKRO Research.
              By making a purchase, you represent and warrant that you are at least 18 years old.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">4. Product Information</h2>
            <p>
              We strive to ensure all product descriptions and specifications are accurate.
              However, we do not warrant that product descriptions or content on this site
              are complete, reliable, current, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">5. Pricing and Payment</h2>
            <p>
              All prices are listed in USD unless otherwise noted. We reserve the right to
              change prices at any time. Payment is processed securely through our
              third-party payment processors.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">6. Limitation of Liability</h2>
            <p>
              AKRO Research shall not be liable for any damages arising from the use or
              inability to use our products, including but not limited to direct, indirect,
              incidental, or consequential damages. Use of products is at the purchaser&apos;s
              own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">7. Contact</h2>
            <p>
              For questions regarding these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@akroresearch.com" className="text-brand-gold hover:underline">
                legal@akroresearch.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
