import Image from "next/image"
import Link from "next/link"
import React from "react"

const ProductItem = ({ product }) => {
  return (
    <Link href={`/products/${product._id}`} className="group card">
      <div className="h-72 mx-auto aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={product.image.url}
          alt={product.name}
          className="object-contain w-full h-full group-hover:opacity-75"
          width={300}
          height={300}
        />
      </div>
      <h3 className="mt-2 ps-2 text-lg font-semibold capitalize text-gray-700">{product.name}</h3>
      <p className="mt-1 pe-2 text-lg text-right font-semibold text-green">{product.price} $</p>
    </Link>
  )
}

export default ProductItem
