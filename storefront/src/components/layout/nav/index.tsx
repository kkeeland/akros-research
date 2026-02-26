"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, User, ShoppingBag, Menu, X } from "lucide-react"

export default function Nav({ countryCode = "us" }: { countryCode?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Research Disclaimer Banner */}
      <div className="disclaimer-banner">
        All products are sold strictly for research purposes only. Not for human
        consumption.
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 bg-surface/90 backdrop-blur-xl border-b border-border-subtle">
        {/* Logo */}
        <Link href={`/${countryCode}`} className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-[0.06em] uppercase text-text-primary">
            AKRO
          </span>
          <span className="text-xs tracking-[0.04em] text-brand-silver">
            Research
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href={`/${countryCode}/products`}
            className="text-[13px] font-medium tracking-[0.04em] text-text-secondary hover:text-text-primary transition-colors"
          >
            Products
          </Link>
          <Link
            href={`/${countryCode}/collections/peptides`}
            className="text-[13px] font-medium tracking-[0.04em] text-text-secondary hover:text-text-primary transition-colors"
          >
            Peptides
          </Link>
          <Link
            href={`/${countryCode}/research`}
            className="text-[13px] font-medium tracking-[0.04em] text-text-secondary hover:text-text-primary transition-colors"
          >
            Research
          </Link>
          <Link
            href={`/${countryCode}/about`}
            className="text-[13px] font-medium tracking-[0.04em] text-text-secondary hover:text-text-primary transition-colors"
          >
            About
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Search className="w-[18px] h-[18px]" />
          </button>

          <Link
            href={`/${countryCode}/account`}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <User className="w-[18px] h-[18px]" />
          </Link>

          <Link
            href={`/${countryCode}/cart`}
            className="relative text-text-secondary hover:text-text-primary transition-colors"
          >
            <ShoppingBag className="w-[18px] h-[18px]" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl pt-28 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            <Link
              href={`/${countryCode}/products`}
              className="text-lg font-medium text-text-primary"
              onClick={() => setMobileOpen(false)}
            >
              Products
            </Link>
            <Link
              href={`/${countryCode}/collections/peptides`}
              className="text-lg font-medium text-text-primary"
              onClick={() => setMobileOpen(false)}
            >
              Peptides
            </Link>
            <Link
              href={`/${countryCode}/research`}
              className="text-lg font-medium text-text-primary"
              onClick={() => setMobileOpen(false)}
            >
              Research
            </Link>
            <Link
              href={`/${countryCode}/about`}
              className="text-lg font-medium text-text-primary"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href={`/${countryCode}/contact`}
              className="text-lg font-medium text-text-primary"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
