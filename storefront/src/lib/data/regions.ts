import { sdk } from "./client"

export async function listRegions() {
  return sdk.store.region
    .list({}, { next: { tags: ["regions"] } })
    .then(({ regions }) => regions)
}

export async function getRegion(countryCode: string) {
  const regions = await listRegions()

  const region = regions.find((r: any) =>
    r.countries?.some(
      (c: any) => c.iso_2 === countryCode.toLowerCase()
    )
  )

  return region || regions[0]
}
