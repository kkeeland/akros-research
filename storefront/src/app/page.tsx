import { redirect } from "next/navigation"
import { DEFAULT_REGION } from "@/lib/config"

export default function RootPage() {
  redirect(`/${DEFAULT_REGION}`)
}
