import { Store } from "@utils/Store"
import React from "react"

const SingleProductSizeSection = ({ size, quantity, product, totalSizePrice }) => {
  const { dispatch } = React.useContext(Store)

  const updateQuantity = (product, size, addedQty) => dispatch({ type: "CART_ADD_ITEM", payload: { product, size, addedQty } })

  return (
    <>
      <div className="font-semibold flex items-center py-2">{size.toUpperCase()}</div>
      <div className="font-semibold flex items-center  py-2">
        <div className="flex justify-between items-center border border-green w-20">
          <div className="px-2 text-green cursor-pointer select-none" onClick={() => updateQuantity(product, size, 1)}>
            +
          </div>
          {quantity}
          <div
            className="px-2 cursor-pointer select-none"
            onClick={() => {
              if (quantity === 0) return
              updateQuantity(product, size, -1)
            }}
          >
            -
          </div>
        </div>
      </div>
      <div className="font-semibold flex items-center justify-end py-2">$ {totalSizePrice}</div>
    </>
  )
}

export { SingleProductSizeSection }
