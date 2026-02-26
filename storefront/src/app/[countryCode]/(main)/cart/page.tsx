import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cart",
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12">
      <h1 className="text-3xl font-heading font-bold mb-8">Shopping Cart</h1>

      {/* Empty Cart State */}
      <div className="card-panel p-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-text-muted/30 mx-auto mb-4"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
        <p className="text-text-muted mb-6">
          Browse our catalog to find premium research chemicals.
        </p>
        <Link href={`/${countryCode}/products`} className="btn-primary">
          Browse Products
        </Link>
      </div>
    </div>
  )
}
