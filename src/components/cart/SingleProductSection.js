import Button from "@components/reusable/Button"
import { Store } from "@utils/Store"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { SingleProductSizeSection } from "./SingleProductSizeSection"

const SingleProductSection = ({ product, sizesQty }) => {
  const { dispatch } = React.useContext(Store)

  const removeProduct = product => dispatch({ type: "CART_REMOVE_ITEM", payload: { product } })

  const productSizesQtyArr = React.useMemo(() => Object.entries(sizesQty), [sizesQty])

  return (
    <div key={product._id} className="grid grid-cols-8 gap-x-6 py-4 border-b">
      <div className="col-span-4 font-semibold flex items-center">
        <Image
          src={product.image.url}
          alt={product.name}
          className="object-contain group-hover:opacity-75 me-2"
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-center">
          <Link href={`/products/${product._id}`} className="pb-2 mb-2 text-2xl text-[#0B254B] font-medium capitalize">
            {product.name}
          </Link>
          <Button underlinedButton onClick={() => removeProduct(product)}>
            Remove
          </Button>
        </div>
      </div>
      <div className="font-semibold flex items-center">$ {product.price}</div>
      <div className="col-span-3 grid grid-cols-3 gap-x-6">
        {productSizesQtyArr.map(([size, { quantity, totalSizePrice }]) => (
          <SingleProductSizeSection
            key={`${product._id}_${size}`}
            size={size}
            quantity={quantity}
            product={product}
            totalSizePrice={totalSizePrice}
          />
        ))}
      </div>
    </div>
  )
}

export { SingleProductSection }
