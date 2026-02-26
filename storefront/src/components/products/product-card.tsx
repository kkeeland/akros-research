import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/util/prices"

type ProductCardProps = {
  product: {
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
  countryCode: string
}

export default function ProductCard({ product, countryCode }: ProductCardProps) {
  const price = product.variants?.[0]?.calculated_price

  return (
    <Link
      href={`/${countryCode}/products/${product.handle}`}
      className="group card-panel-hover overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-square relative bg-surface-elevated overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-muted/30"
            >
              <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
              <path d="M8.5 2h7" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium truncate group-hover:text-brand-gold transition-colors">
          {product.title}
        </h3>
        {price && (
          <p className="text-sm text-text-secondary mt-1">
            {formatPrice(price.calculated_amount, price.currency_code)}
          </p>
        )}
      </div>
    </Link>
  )
}
