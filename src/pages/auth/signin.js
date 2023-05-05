import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"

const SigninPage = () => {
  const router = useRouter()
  const session = useSession()
  React.useEffect(() => {
    if (session.status === "unauthenticated") {
      signIn("google")
    } else if (session.status === "authenticated") {
      router.push(router.query.callbackUrl || "/")
    }
  }, [session.status])

  return <p>Redirecting...</p>
}

export default SigninPage
