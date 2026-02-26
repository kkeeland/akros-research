"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Shield } from "lucide-react"

function AgeGateForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/us"

  const handleYes = () => {
    document.cookie = `akro_age_verified=true; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`
    router.push(redirect)
  }

  const handleNo = () => {
    window.location.href = "https://google.com"
  }

  return (
    <div className="card-panel p-10 md:p-12 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold-light mb-6">
        <Shield className="w-7 h-7 text-brand-gold" />
      </div>

      <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
        Age Verification Required
      </h1>
      <p className="text-sm text-text-secondary leading-relaxed mb-2">
        You must be 18 years or older to enter this website.
      </p>
      <p className="text-xs text-text-muted mb-8">
        All products are sold strictly for research purposes only.
      </p>

      <p className="text-sm font-medium text-text-primary mb-6">
        Are you 18 years of age or older?
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleYes}
          className="btn-primary flex-1 py-3.5 text-[15px]"
        >
          Yes, I am 18+
        </button>
        <button
          onClick={handleNo}
          className="btn-secondary flex-1 py-3.5 text-[15px]"
        >
          No
        </button>
      </div>

      <p className="text-[10px] text-text-muted mt-6 leading-relaxed">
        By entering, you agree to our Terms of Service and confirm that
        all purchases are for legitimate research purposes only.
      </p>
    </div>
  )
}

export default function AgeGatePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background relative">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(184,150,12,0.04)_0%,transparent_50%)]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-base font-semibold tracking-[0.08em] uppercase text-text-primary">
            AKRO
          </span>
          <span className="text-sm tracking-[0.04em] text-brand-silver ml-1.5">
            Research
          </span>
        </div>

        <Suspense
          fallback={
            <div className="card-panel p-10 text-center text-text-muted">
              Loading...
            </div>
          }
        >
          <AgeGateForm />
        </Suspense>
      </div>
    </div>
  )
}
