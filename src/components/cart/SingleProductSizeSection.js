import React from "react"
import { useUpdateProductQuantity } from "../../hooks/useUpdateProductQuantity"

const SingleProductSizeSection = ({ size, quantity, product, totalSizePrice, uneditableCart }) => {
  const { updateQuantity } = useUpdateProductQuantity(product)

  return (
    <>
      <div className="font-semibold flex items-center py-2">{size.toUpperCase()}</div>
      <div className="font-semibold flex items-center  py-2">
        <div className="flex justify-between items-center border border-green w-20">
          <div
            className={`px-2 text-green ${uneditableCart ? "" : "cursor-pointer"} select-none`}
            onClick={() => {
              if (!uneditableCart) updateQuantity(product, size, 1)
            }}
          >
            +
          </div>
          {quantity}
          <div
            className={`px-2 ${uneditableCart ? "" : "cursor-pointer"} select-none`}
            onClick={() => {
              if (!uneditableCart) updateQuantity(product, size, -1)
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
