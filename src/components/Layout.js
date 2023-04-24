import React from "react"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <main className="relative min-h-screen h-[2000px] bg-white">
      <Header />
      {children}
    </main>
  )
}

export default Layout
