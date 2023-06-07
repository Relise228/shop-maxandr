import Link from "next/link"
import React from "react"
import { SingleProductSection } from "./SingleProductSection"

const Cart = ({ cartItems, totalProductsPrice, backTo, uneditableCart, cartHeader = "Your cart items" }) => {
  const { href: backToHref = "/products", label: backToLabel = "shopping" } = backTo ?? {}
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col items-center pb-10">
          <h2 className="pb-2 mb-2 text-2xl text-[#0B254B] font-medium">{cartHeader}</h2>
          <Link href={`${backToHref}`}>
            <h4 className="text-lg  text-green underline">Back to {backToLabel}</h4>
          </Link>
        </div>
        {cartItems?.length ? (
          <>
            <div className="grid grid-cols-8 gap-x-6 pb-4 border-b">
              <div className="col-span-4 font-semibold">Product</div>
              <div className="font-semibold">Price</div>
              <div className="font-semibold">Size</div>
              <div className="font-semibold">Quantity</div>
              <div className="font-semibold flex justify-end">Total</div>
            </div>
            {cartItems.map(({ product, sizesQty }) => (
              <SingleProductSection key={product._id} product={product} sizesQty={sizesQty} uneditableCart={uneditableCart} />
            ))}
            <div className="flex justify-end items-center mt-4">
              <div className="text-lg font-semibold me-4">Total</div>
              <div className="text-lg font-semibold me-4">$ {totalProductsPrice}</div>
              {uneditableCart ? null : (
                <Link href="/checkout/details" className="bg-green py-2 px-8 rounded-sm text-lg text-white">
                  Checkout
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center">Your cart is empty</div>
        )}
      </div>
    </>
  )
}

export default Cart
