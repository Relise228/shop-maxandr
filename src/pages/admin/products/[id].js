import { CreateUpdateProductForm } from "@components/CreateUpdateProductForm"
import Layout from "@components/Layout"
import React from "react"

const UpdateProductPage = () => {
  return (
    <Layout>
      <h1 className="mb-4 text-xl">Update product</h1>

      <CreateUpdateProductForm />
    </Layout>
  )
}

export default UpdateProductPage
