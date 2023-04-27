import React from "react"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <main className="relative min-h-screen h-[2000px] bg-white mt-24">
      <Header />
      <main className="">{children}</main>
    </main>
  )
}

export default Layout
