import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductByHandle } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import { formatPrice } from "@/lib/util/prices"
import ProductActions from "@/components/products/product-actions"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  return {
    title: handle.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { countryCode, handle } = await params

  let product: any = null

  try {
    const region = await getRegion(countryCode)
    product = await getProductByHandle(handle, region?.id || "")
  } catch {
    // Backend may not be running
  }

  if (!product) {
    notFound()
  }

  const price = product.variants?.[0]?.calculated_price

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="card-panel overflow-hidden aspect-square relative">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-elevated">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-text-muted/20"
              >
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                <path d="M8.5 2h7" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand-gold mb-3">
            Research Chemical
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {product.title}
          </h1>

          {price && (
            <p className="text-2xl font-semibold text-brand-gold mb-6">
              {formatPrice(price.calculated_amount, price.currency_code)}
            </p>
          )}

          {product.description && (
            <p className="text-text-secondary leading-relaxed mb-8">
              {product.description}
            </p>
          )}

          <div className="border-t border-border-subtle pt-8">
            <ProductActions
              productId={product.id}
              variants={product.variants || []}
            />
          </div>

          {/* Product Details */}
          <div className="mt-10 space-y-6">
            <div className="card-panel p-6">
              <h3 className="text-sm font-semibold mb-3">Product Details</h3>
              <dl className="space-y-2 text-sm">
                {product.material && (
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Material</dt>
                    <dd>{product.material}</dd>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Weight</dt>
                    <dd>{product.weight}g</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-text-muted">Purity</dt>
                  <dd className="text-brand-gold">≥99%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">CoA</dt>
                  <dd className="text-success">Available</dd>
                </div>
              </dl>
            </div>

            <div className="card-panel p-6 gold-border">
              <h3 className="text-sm font-semibold text-brand-gold mb-2">
                Research Use Only
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                This product is sold strictly for research, laboratory, and
                educational purposes. Not for human or veterinary use. By
                purchasing, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
