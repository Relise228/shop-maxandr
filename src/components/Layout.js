import React from "react"
import { ToastContainer } from "react-toastify"
import Header from "./Header"
import "react-toastify/dist/ReactToastify.css"

const Layout = ({ children }) => {
  return (
    <main className="relative min-h-screen h-[2000px] bg-white">
      <ToastContainer position="bottom-center" />
      <Header />
      <main className="mt-24">{children}</main>
    </main>
  )
}

export default Layout
