import Layout from "@components/Layout"
import Button from "@components/reusable/Button"
import db from "@utils/db"
import { Store } from "@utils/Store"
import Image from "next/image"
import React from "react"
import Product from "../../models/Product"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"

const SingleProductPage = ({ product }) => {
  const [selectedSize, setSelectedSize] = React.useState(null)
  const { dispatch } = React.useContext(Store)

  const router = useRouter()

  const navigateBack = () => {
    router.back()
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(product.price ?? 0)

  return (
    <Layout>
      <div className="container mx-auto">
        <button onClick={navigateBack} className="text-black font-bold">
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          Back
        </button>
        <div className="flex mt-6 gap-x-8">
          <div className="w-[540px] h-[433px] relative ">
            <Image src={product.image.url} alt={product.name} style={{ objectFit: "cover" }} fill />
          </div>

          <div className="flex flex-col flex-1">
            <h4 className="font-bold text-2xl capitalize">{`${product.name}®`}</h4>
            <div className="w-[75%] grid grid-rows-1 grid-flow-col gap-24  mt-8">
              <div>
                <p className=" text-green font-bold text-2xl"> {formattedPrice}</p>
                <p className="font-semibold text-xl mt-8">Quantity</p>
              </div>
              <div>
                <p className="font-semibold text-xl">Size</p>
                <div className="flex">
                  {product.sizeCountInStock.map(
                    ({ size, quantity }) =>
                      quantity && (
                        <p
                          key={size}
                          className={`text-xl font-semibold ${
                            selectedSize === size ? "font-bold bg-gray-100" : ""
                          } w-10 h-10 flex justify-center items-center cursor-pointer my-5 text-green uppercase`}
                          onClick={() => setSelectedSize(prev => (prev === size ? null : size))}
                        >
                          {size}
                        </p>
                      )
                  )}
                </div>
                <p className="font-semibold text-xl">Description</p>
                <p className="text-lg font-normal mt-5">{product.description}</p>
                <Button
                  className="bg-white hover:bg-green py-2 px-4 rounded-lg text-lg font-medium mb-2 text-green hover:text-white border-green border-2 w-full mt-8 cursor-pointer transition-all "
                  disabled={!selectedSize}
                  onClick={() => dispatch({ type: "CART_ADD_ITEM", payload: { product, size: selectedSize } })}
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mr-4" />+ Add to cart
                </Button>
              </div>
            </div>
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
