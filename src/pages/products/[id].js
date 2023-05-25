import Layout from "@components/Layout"
import Button from "@components/reusable/Button"
import db from "@utils/db"
import { Store } from "@utils/Store"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import Product from "../../models/Product"

const SingleProductPage = ({ product }) => {
  const [selectedSize, setSelectedSize] = React.useState("")
  const { dispatch } = React.useContext(Store)

  return (
    <Layout>
      <div className="container mx-auto">
        <Link href={`/products`} className="underline text-sky-500">
          To products
        </Link>
        <div className="flex">
          <Image
            src={product.image.url}
            alt={product.name}
            className="object-cover object-center group-hover:opacity-75"
            width={500}
            height={500}
          />
          <div className="flex flex-col">
            <h4 className="font-bold ">{product.name}</h4>
            <div>{product.description}</div>
            <div>
              {product.sizeCountInStock.map(({ size, quantity }) =>
                quantity ? (
                  <p
                    key={size}
                    className={`text-lg ${selectedSize === size ? "font-semibold" : ""} p-2 m-2 capitalize cursor-pointer`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </p>
                ) : (
                  ""
                )
              )}
            </div>
            <Button
              disabled={!selectedSize}
              onClick={() => dispatch({ type: "CART_ADD_ITEM", payload: { product, size: selectedSize } })}
            >
              + Add to cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { id } = params

  await db.connect()
  const product = await Product.findOne({ _id: id }).lean()
  await db.disconnect()
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null
    }
  }
}

export default SingleProductPage
