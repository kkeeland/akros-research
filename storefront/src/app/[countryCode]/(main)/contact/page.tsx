import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with AKRO Research for inquiries and support.",
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-10 py-16">
      <div className="text-center mb-12">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-gold mb-3">
          Contact
        </p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Get In Touch
        </h1>
        <p className="text-text-secondary">
          Questions about our products or need support? We&apos;re here to help.
        </p>
      </div>

      <div className="card-panel p-8">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="input-field" />
            <input type="text" placeholder="Last Name" className="input-field" />
          </div>
          <input type="email" placeholder="Email" className="input-field" />
          <input type="text" placeholder="Subject" className="input-field" />
          <textarea
            placeholder="Message"
            rows={5}
            className="input-field resize-none"
          />
          <button type="submit" className="btn-primary w-full py-3">
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-sm text-text-muted">
        <p>Or email us directly at</p>
        <a
          href="mailto:support@akroresearch.com"
          className="text-brand-gold hover:underline"
        >
          support@akroresearch.com
        </a>
      </div>
    </div>
  )
}
