import ProductCard from "./product-card"

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

export default function ProductGrid({
  products,
  countryCode,
}: {
  products: Product[]
  countryCode: string
}) {
  if (!products?.length) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          countryCode={countryCode}
        />
      ))}
    </div>
  )
}
