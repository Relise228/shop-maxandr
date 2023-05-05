import Layout from "@components/Layout"
import SortWrapper from "@components/reusable/SortWrapper"
import { API_PRODUCTS } from "@utils/constants"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { usePaginationHook } from "../../../hooks/usePagination"

const AdminProductsPage = () => {
  const [products, setProducts] = useState([])
  const [sort, setSort] = useState({ sortBy: "name", sortOrder: "asc" })
  const [totalPages, setTotalPages] = useState(1)

  const { pageNumber, Pagination } = usePaginationHook({ totalPages, initialPageNumber: 1 })

  const getProducts = async () => {
    const { sortBy, sortOrder } = sort
    const res = await axios.get(API_PRODUCTS, {
      params: {
        sortBy,
        sortOrder,
        page: pageNumber
        // limit: 2
        // brands: `644bd6390f27e39766d3d348,644bcadf0f27e39766d3d050`,
        // categories: `64497416420adfcb4e53e281`,
        // seasons: "644bd6300f27e39766d3d344"
      }
    })
    setProducts(res.data.results)
    setTotalPages(res.data.totalPages)
  }

  useEffect(() => {
    getProducts()
  }, [sort, pageNumber])

  return (
    <Layout>
      <Link href={`/admin/products/create`} className="bg-orange-300 py-2 px-4 rounded-lg m-8">
        Create
      </Link>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <SortWrapper
                  fieldName="name"
                  sortDirection={sort.sortOrder}
                  activeSortFieldName={sort.sortBy}
                  setSort={(sortBy, sortOrder) => setSort({ sortBy, sortOrder })}
                >
                  Product name
                </SortWrapper>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortWrapper
                  fieldName="price"
                  sortDirection={sort.sortOrder}
                  activeSortFieldName={sort.sortBy}
                  setSort={(sortBy, sortOrder) => setSort({ sortBy, sortOrder })}
                >
                  Price, $
                </SortWrapper>
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product._id}
                className={`${idx % 2 ? "bg-gray-50 dark:bg-gray-800" : "bg-white border-b dark:bg-gray-900"}  dark:border-gray-700`}
              >
                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="me-2">{product.name}</div>
                  <Image
                    src={product.image.url}
                    alt={product.name}
                    width={64}
                    height={64}
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }}
                  />
                </th>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.brand?.name}</td>
                <td className="px-6 py-4">{product.category?.name}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/products/${product._id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {Pagination}
      </div>
    </Layout>
  )
}

export default AdminProductsPage
