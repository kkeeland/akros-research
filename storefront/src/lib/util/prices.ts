export function formatPrice(amount: number, currencyCode: string = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount / 100)
}

export function getPercentageDiff(original: number, calculated: number): number {
  const diff = original - calculated
  const decrease = (diff / original) * 100
  return Math.round(decrease)
}
