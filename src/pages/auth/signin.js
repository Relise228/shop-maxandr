import { ONLY_ADMIN_PATHNAMES } from "@utils/constants"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const SigninPage = () => {
  const [isAdminRequired, setIsAdminRequired] = React.useState(false)
  const router = useRouter()
  const session = useSession()
  React.useEffect(() => {
    if (session.status === "unauthenticated") {
      signIn("google")
    } else if (session.status === "authenticated") {
      if (ONLY_ADMIN_PATHNAMES.includes(router.query.callbackUrl)) {
        if (session.data.user.email === "mlysenko0601@gmail.com" || session.data.user.email === "andreysmit43@gmail.com") {
          router.push(router.query.callbackUrl || "/")
        } else {
          setIsAdminRequired(true)
        }
      } else {
        setIsAdminRequired(false)
        router.push(router.query.callbackUrl || "/")
      }
    }
  }, [session])
  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      {isAdminRequired ? (
        <p>
          You should{" "}
          <Link
            href={`/api/auth/signin`}
            className="underline"
            onClick={e => {
              e.preventDefault()
              signIn()
            }}
          >
            sign in
          </Link>{" "}
          as admin to see this page
        </p>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  )
}

export default SigninPage
