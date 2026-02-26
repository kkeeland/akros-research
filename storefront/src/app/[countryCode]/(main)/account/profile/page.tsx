import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
}

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-10 py-12">
      <h1 className="text-2xl font-heading font-bold mb-8">Profile</h1>

      <div className="card-panel p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold tracking-[0.08em] uppercase text-text-secondary mb-2 block">
              First Name
            </label>
            <input type="text" className="input-field" placeholder="First Name" />
          </div>
          <div>
            <label className="text-xs font-semibold tracking-[0.08em] uppercase text-text-secondary mb-2 block">
              Last Name
            </label>
            <input type="text" className="input-field" placeholder="Last Name" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold tracking-[0.08em] uppercase text-text-secondary mb-2 block">
            Email
          </label>
          <input type="email" className="input-field" placeholder="Email" />
        </div>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  )
}
