import { CreateUpdateProductForm } from "@components/CreateUpdateProductForm"
import Layout from "@components/Layout"
import React from "react"

const CreateProductPage = () => {
  return (
    <Layout>
      <h1 className="mb-4 text-xl">Create product</h1>
      <CreateUpdateProductForm />
    </Layout>
  )
}

export default CreateProductPage
