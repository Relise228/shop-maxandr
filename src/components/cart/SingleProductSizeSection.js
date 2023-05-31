import React from "react"
import { useUpdateProductQuantity } from "../../hooks/useUpdateProductQuantity"

const SingleProductSizeSection = ({ size, quantity, product, totalSizePrice }) => {
  const { updateQuantity } = useUpdateProductQuantity(product)

  return (
    <>
      <div className="font-semibold flex items-center py-2">{size.toUpperCase()}</div>
      <div className="font-semibold flex items-center  py-2">
        <div className="flex justify-between items-center border border-green w-20">
          <div className="px-2 text-green cursor-pointer select-none" onClick={() => updateQuantity(product, size, 1)}>
            +
          </div>
          {quantity}
          <div className="px-2 cursor-pointer select-none" onClick={() => updateQuantity(product, size, -1)}>
            -
          </div>
        </div>
      </div>
      <div className="font-semibold flex items-center justify-end py-2">$ {totalSizePrice}</div>
    </>
  )
}

export { SingleProductSizeSection }
