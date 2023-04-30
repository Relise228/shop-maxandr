import Image from "next/image"
import Link from "next/link"
import React from "react"

const ProductItem = () => {
  return (
    <Link href="#" class="group">
      <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
          alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
          class="h-full w-full object-cover object-center group-hover:opacity-75"
          width={300}
          height={300}
        />
      </div>
      <h3 class="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
      <p class="mt-1 text-lg font-medium text-gray-900">$48</p>
    </Link>
  )
}

export default ProductItem
