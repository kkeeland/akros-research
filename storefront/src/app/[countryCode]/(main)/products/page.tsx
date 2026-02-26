import { Metadata } from "next"
import ProductGrid from "@/components/products/product-grid"
import { getProductsList } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our catalog of premium research peptides and compounds.",
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  let products: any[] = []

  try {
    const region = await getRegion(countryCode)
    const response = await getProductsList({
      limit: 24,
      region_id: region?.id,
    })
    products = response.products || []
  } catch {
    // Backend may not be running
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-gold mb-2">
          Catalog
        </p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold">
          All Products
        </h1>
        <p className="text-text-secondary mt-2">
          Premium research chemicals, rigorously tested for purity and quality.
        </p>
      </div>

      <ProductGrid products={products} countryCode={countryCode} />
    </div>
  )
}
