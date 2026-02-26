import Link from "next/link"

export default function Footer({ countryCode = "us" }: { countryCode?: string }) {
  return (
    <footer className="border-t border-border-subtle bg-surface-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="text-sm font-semibold tracking-[0.06em] uppercase">
                AKRO
              </span>
              <span className="text-xs tracking-[0.04em] text-brand-silver ml-1">
                Research
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Premium research chemicals and peptides. Committed to purity,
              quality, and scientific advancement.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.08em] uppercase text-text-secondary mb-4">
              Products
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${countryCode}/products`}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href={`/${countryCode}/collections/peptides`}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Peptides
                </Link>
              </li>
              <li>
                <Link
                  href={`/${countryCode}/collections/compounds`}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Compounds
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.08em] uppercase text-text-secondary mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${countryCode}/about`}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={`/${countryCode}/research`}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Research Info
                </Link>
              </li>
              <li>
                <Link
                  href={`/${countryCode}/contact`}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.08em] uppercase text-text-secondary mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${countryCode}/terms`}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href={`/${countryCode}/privacy`}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} AKRO Research. All rights reserved.
          </p>
          <p className="text-xs text-brand-gold/70">
            All products are for research purposes only. Not for human consumption.
          </p>
        </div>
      </div>
    </footer>
  )
}
