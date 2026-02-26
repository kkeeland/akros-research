import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Addresses",
}

export default function AddressesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-bold">Saved Addresses</h1>
        <button className="btn-secondary text-sm">Add Address</button>
      </div>

      <div className="card-panel p-12 text-center">
        <p className="text-text-muted">No saved addresses yet.</p>
      </div>
    </div>
  )
}
