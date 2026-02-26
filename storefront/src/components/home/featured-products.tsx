import Link from "next/link"
import ProductCard from "@/components/products/product-card"

type Product = {
  id: string
  title: string
  handle: string
  thumbnail: string | null
  variants: {
    calculated_price?: {
      calculated_amount: number
      currency_code: string
    }
  }[]
}

export default function FeaturedProducts({
  products,
  countryCode,
}: {
  products: Product[]
  countryCode: string
}) {
  if (!products?.length) return null

  return (
    <section className="py-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-gold mb-2">
              Featured
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Popular Products
            </h2>
          </div>
          <Link
            href={`/${countryCode}/products`}
            className="text-sm text-text-secondary hover:text-brand-gold transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              countryCode={countryCode}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
