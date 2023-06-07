import { withAuth } from "next-auth/middleware"
import { ONLY_ADMIN_PATHNAMES } from "./utils/constants"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      // `/admin` requires admin role
      if (ONLY_ADMIN_PATHNAMES.includes(req.nextUrl.pathname)) {
        return token?.isAdmin
      }
      // `/checkout` only requires the user to be logged in
      return !!token
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
})

export const config = {
  matcher: ["/admin/products", "/admin/orders", "/checkout/details", "/checkout/shipping", "/checkout/payment"]
}
