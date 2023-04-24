import React from "react"
import Logo from "@assets/logo.svg"
import ProfileIcon from "@assets/profile.svg"
import CartIcon from "@assets/cart.svg"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
  return (
    <div className="header fixed w-full top-0 py-5 bg-white shadow-md">
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
                <Link href="/discovery">Discovery</Link>
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
            <Link href="/profile">
              <FontAwesomeIcon icon={faUser} fontSize={20} />
            </Link>
            <Link href="/cart">
              <FontAwesomeIcon icon={faCartShopping} fontSize={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
