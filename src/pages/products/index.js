import Layout from '@components/Layout'
import db from '@utils/db'
import React from "react"

const ProductsPage = () => {
  return <Layout>ProductsPage</Layout>
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

export default ProductsPage
