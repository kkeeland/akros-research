import { NextRequest, NextResponse } from "next/server"

const PROTECTED_PATHS = ["/products", "/collections", "/categories", "/cart", "/checkout"]
const AGE_VERIFIED_COOKIE = "akro_age_verified"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ageVerified = request.cookies.get(AGE_VERIFIED_COOKIE)

  // Skip age gate for static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/age-gate") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  // Check if path requires age verification
  const needsVerification = PROTECTED_PATHS.some((p) => pathname.includes(p))

  if (needsVerification && !ageVerified) {
    const url = request.nextUrl.clone()
    url.pathname = "/age-gate"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)"],
}
