import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12">
      <h1 className="text-2xl font-heading font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 space-y-8">
          {/* Shipping */}
          <div className="card-panel p-6">
            <h2 className="text-sm font-semibold tracking-[0.08em] uppercase text-text-secondary mb-4">
              Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="input-field"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email"
                className="input-field col-span-2"
              />
              <input
                type="text"
                placeholder="Address"
                className="input-field col-span-2"
              />
              <input type="text" placeholder="City" className="input-field" />
              <input type="text" placeholder="State" className="input-field" />
              <input
                type="text"
                placeholder="ZIP Code"
                className="input-field"
              />
              <input
                type="text"
                placeholder="Country"
                className="input-field"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="card-panel p-6">
            <h2 className="text-sm font-semibold tracking-[0.08em] uppercase text-text-secondary mb-4">
              Payment
            </h2>
            <p className="text-sm text-text-muted">
              Stripe payment integration will be configured when the Stripe API
              keys are added.
            </p>
          </div>

          {/* Compliance */}
          <div className="card-panel p-6 gold-border">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-brand-gold/30 text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-xs text-text-secondary leading-relaxed">
                I confirm that all products in this order are for{" "}
                <strong className="text-brand-gold">research purposes only</strong>{" "}
                and not for human or veterinary use. I have read and agree to the{" "}
                <a
                  href={`/${countryCode}/terms`}
                  className="text-brand-gold underline"
                >
                  Terms of Service
                </a>
                .
              </span>
            </label>
          </div>

          <button className="btn-primary w-full py-3.5">Place Order</button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="card-panel p-6 sticky top-24">
            <h2 className="text-sm font-semibold tracking-[0.08em] uppercase text-text-secondary mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Tax</span>
                <span>—</span>
              </div>
              <div className="border-t border-border-subtle pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
