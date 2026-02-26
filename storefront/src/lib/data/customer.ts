import { sdk } from "./client"

export async function getCustomer() {
  return sdk.store.customer.retrieve().catch(() => null)
}

export async function registerCustomer(data: {
  email: string
  password: string
  first_name: string
  last_name: string
}) {
  return sdk.auth.register("customer", "emailpass", {
    email: data.email,
    password: data.password,
  }).then(() =>
    sdk.store.customer.create({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    })
  )
}

export async function loginCustomer(email: string, password: string) {
  return sdk.auth.login("customer", "emailpass", {
    email,
    password,
  })
}

export async function logoutCustomer() {
  return sdk.auth.logout()
}

export async function getCustomerOrders(limit: number = 10, offset: number = 0) {
  return sdk.store.order.list({ limit, offset })
}

export async function getOrder(id: string) {
  return sdk.store.order.retrieve(id)
}
