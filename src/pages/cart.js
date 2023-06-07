import React from "react"
import Layout from "@components/Layout"
import { Store } from "@utils/Store"
import Cart from "@components/Cart/Cart"

const CartPage = () => {
  const { totalProductsPrice, cart: cartState } = React.useContext(Store)

  return (
    <Layout>
      <Cart
        cartItems={cartState.cartItems}
        totalProductsPrice={totalProductsPrice}
        backTo={{ href: "/products", label: "shopping" }}
      />
    </Layout>
  )
}

export default CartPage
