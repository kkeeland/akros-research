import Link from "next/link"

export default async function CheckoutLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  return (
    <>
      {/* Minimal header */}
      <header className="h-16 flex items-center justify-between px-6 lg:px-10 border-b border-border-subtle">
        <Link href={`/${countryCode}`} className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-[0.06em] uppercase">
            AKRO
          </span>
          <span className="text-xs tracking-[0.04em] text-brand-silver">
            Research
          </span>
        </Link>
        <span className="text-xs text-text-muted">Secure Checkout</span>
      </header>
      <main className="min-h-screen">{children}</main>
    </>
  )
}
