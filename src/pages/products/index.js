import Layout from "@components/Layout"
import ProductItem from "@components/reusable/ProductItem"
import db from "@utils/db"
import React from "react"
import Product from "../../models/Product"
import "../../models/Category"
import "../../models/Brand"
import "../../models/Season"

const ProductsPage = ({ products }) => {
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  await db.connect()
  const products = await Product.find().populate("category").populate("brand").populate("season").skip(0).limit(8).lean()
  await db.disconnect()
  return {
    props: {
      products: products ? db.convertDocToObj(products) : null
    }
  }
}

export default ProductsPage
