import Hero from "@/components/home/hero"
import FeaturedProducts from "@/components/home/featured-products"
import TrustBadges from "@/components/home/trust-badges"
import CtaSection from "@/components/home/cta-section"
import { getProductsList } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"

export default async function HomePage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  let products: any[] = []

  try {
    const region = await getRegion(countryCode)
    const response = await getProductsList({
      limit: 8,
      region_id: region?.id,
    })
    products = response.products || []
  } catch {
    // Backend may not be running yet — render page without products
  }

  return (
    <>
      <Hero countryCode={countryCode} />
      <TrustBadges />
      <FeaturedProducts products={products} countryCode={countryCode} />
      <CtaSection countryCode={countryCode} />
    </>
  )
}
