import React from "react"
import Layout from "@components/Layout"
import { Store } from "@utils/Store"
import Link from "next/link"
import { SingleProductSection } from "@components/cart/SingleProductSection"

const Cart = () => {
  const [cartState, setCartState] = React.useState({ cartItems: [], shippingAddress: {}, paymentMethod: "" })
  const { state } = React.useContext(Store)
  React.useEffect(() => {
    setCartState(state.cart)
  }, [state])

  const totalProductsPrice =
    cartState.cartItems?.reduce(
      (acc, { sizesQty }) => acc + Object.values(sizesQty).reduce((acc, { totalSizePrice }) => acc + totalSizePrice, 0),
      0
    ) ?? 0
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col items-center pb-10">
          <h2 className="pb-2 mb-2 text-2xl text-[#0B254B] font-medium">Your cart items</h2>
          <Link href={`/products`}>
            <h4 className="text-lg  text-green underline">Back to shopping</h4>
          </Link>
        </div>
        {cartState.cartItems?.length ? (
          <>
            <div className="grid grid-cols-8 gap-x-6 pb-4 border-b">
              <div className="col-span-4 font-semibold">Product</div>
              <div className="font-semibold">Price</div>
              <div className="font-semibold">Size</div>
              <div className="font-semibold">Quantity</div>
              <div className="font-semibold flex justify-end">Total</div>
            </div>
            {cartState.cartItems.map(({ product, sizesQty }) => (
              <SingleProductSection key={product._id} product={product} sizesQty={sizesQty} />
            ))}
            <div className="flex justify-end items-center mt-4">
              <div className="text-lg font-semibold me-4">Total</div>
              <div className="text-lg font-semibold me-4">$ {totalProductsPrice}</div>
              <Link href="/checkout" className="bg-green py-2 px-8 rounded-sm text-lg text-white">
                Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="flex justify-center">Your cart is empty</div>
        )}
      </div>
    </Layout>
  )
}

export default Cart
