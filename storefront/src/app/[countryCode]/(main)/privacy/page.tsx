import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
      <h1 className="text-3xl font-heading font-bold mb-8">Privacy Policy</h1>

      <div className="card-panel p-8 space-y-6 text-text-secondary text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-3">Information We Collect</h2>
          <p>
            We collect information you provide directly, including name, email address,
            shipping address, and payment information when you make a purchase. We also
            collect standard web analytics data to improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-3">How We Use Your Information</h2>
          <p>
            Your information is used to process orders, communicate with you about your
            purchases, and improve our products and services. We do not sell your personal
            information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-3">Data Security</h2>
          <p>
            We implement industry-standard security measures including SSL encryption
            for all data transmission. Payment information is processed securely through
            PCI-compliant payment processors and is never stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-3">Cookies</h2>
          <p>
            We use cookies to maintain your shopping session, remember preferences, and
            verify age verification status. You can control cookie settings through your
            browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary mb-3">Contact</h2>
          <p>
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:privacy@akroresearch.com" className="text-brand-gold hover:underline">
              privacy@akroresearch.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
