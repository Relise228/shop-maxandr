import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.email === "mlysenko0601@gmail.com" || token?.email === "andreysmit43@gmail.com"
      }
      // `/checkout` only requires the user to be logged in
      return !!token
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
})

export const config = { matcher: ["/admin", "/checkout/details", "/checkout/shipping", "/checkout/payment"] }
