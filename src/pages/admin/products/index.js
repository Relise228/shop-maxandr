import Layout from "@components/Layout"
import { API_PRODUCTS } from "@utils/constants"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const AdminProductsPage = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const res = await axios.get(API_PRODUCTS)
    setProducts(res.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Layout>
      <Link href={`/admin/products/create`} className="bg-orange-300 py-2 px-4 rounded-lg m-8 my-8">
        Create
      </Link>
      {products.map(product => (
        <div key={product._id} className="container mx-4 my-4">
          <div className="flex justify-between items-center">
            <Link
              href={`/admin/products/${product._id}`}
              className="flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              <div className="me-2"> {product.name}</div>
              <Image
                src={product.image.url}
                alt={product.name}
                width={100}
                height={100}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }}
              />
            </Link>
            <div>${product.price}</div>
            <div>{product.brand?.name}</div>
            <div>{product.category?.name}</div>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default AdminProductsPage
