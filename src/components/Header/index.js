import React from "react"
import Logo from "@assets/logo.svg"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons"
import { signIn, signOut, useSession } from "next-auth/react"
import FlyoutMenuDiscovery from "./FlyoutMenuDiscovery"
import { Store } from "@utils/Store"
import { CounterCircleWrapper } from "@components/reusable/CounterCircleWrapper"

const Header = () => {
  const { data: session, status } = useSession()
  const { totalProductsAmount } = React.useContext(Store)

  return (
    <div className="header fixed w-full top-0 py-5 bg-white shadow-md z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <Image src={Logo} alt="logo" />
            </Link>
          </div>
          <nav>
            <ul className="flex items-center font-medium gap-x-12">
              <li>
                <FlyoutMenuDiscovery />
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contactus">Contact us</Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-x-5">
            {!session && (
              <>
                <Link
                  href={`/api/auth/signin`}
                  onClick={e => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  Sign in
                </Link>
              </>
            )}
            {session?.user && (
              <>
                <Link
                  href={`/api/auth/signout`}
                  onClick={e => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  Sign out
                </Link>
                <Link href="/profile">
                  <FontAwesomeIcon icon={faUser} fontSize={20} />
                </Link>
              </>
            )}

            <Link href="/cart">
              <CounterCircleWrapper count={totalProductsAmount}>
                <FontAwesomeIcon icon={faCartShopping} fontSize={20} />
              </CounterCircleWrapper>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
