import Image from "next/image"
import Link from "next/link"
import React from "react"

const ProductItem = ({ product }) => {
  return (
    <Link href={`/products/${product._id}`} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={product.image.url}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
          width={300}
          height={300}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
    </Link>
  )
}

export default ProductItem
