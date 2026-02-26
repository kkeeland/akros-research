import { Metadata } from "next"
import ProductGrid from "@/components/products/product-grid"
import { getCollectionByHandle, getProductsList } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  return {
    title: handle.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  }
}

export default async function CollectionPage({ params }: Props) {
  const { countryCode, handle } = await params

  let collection: any = null
  let products: any[] = []

  try {
    const region = await getRegion(countryCode)
    collection = await getCollectionByHandle(handle)

    if (collection) {
      const response = await getProductsList({
        limit: 24,
        collection_id: [collection.id],
        region_id: region?.id,
      })
      products = response.products || []
    }
  } catch {
    // Backend may not be running
  }

  const title = collection?.title || handle.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-gold mb-2">
          Collection
        </p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold">
          {title}
        </h1>
        {collection?.metadata?.description && (
          <p className="text-text-secondary mt-2">
            {collection.metadata.description as string}
          </p>
        )}
      </div>

      <ProductGrid products={products} countryCode={countryCode} />
    </div>
  )
}
