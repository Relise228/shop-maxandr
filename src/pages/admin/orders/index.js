import Layout from "@components/Layout"
import { TableHeader } from "@components/reusable/Table/TableHeader"
import { TableRowWrapper } from "@components/reusable/Table/TableRowWrapper"
import { TableWithPaginationWrapper } from "@components/reusable/Table/TableWithPaginationWrapper"
import { API_ORDERS } from "@utils/constants"
import axios from "axios"
import Link from "next/link"
import React from "react"
import { usePaginationHook } from "../../../hooks/usePagination"
import { format } from "date-fns"

const AdminOrdersPage = () => {
  const [orders, setOrders] = React.useState([])
  const [sort, setSort] = React.useState({ sortBy: "name", sortOrder: "asc" })
  const [totalPages, setTotalPages] = React.useState(1)

  const { pageNumber, Pagination } = usePaginationHook({ totalPages, initialPageNumber: 1 })

  const getOrders = async () => {
    const { sortBy, sortOrder } = sort
    const res = await axios.get(API_ORDERS, {
      params: {
        sortBy,
        sortOrder,
        page: pageNumber
      }
    })
    setOrders(res.data.results)
    setTotalPages(res.data.totalPages)
  }
  React.useEffect(() => {
    getOrders()
  }, [sort, pageNumber])

  const columns = [
    { fieldName: "_id", label: "Order ID" },
    { fieldName: "customer.name", label: "Customer", sortable: true },
    { fieldName: "orderTotalPrice", label: "Price, $", sortable: true },
    { fieldName: "paymentMethod", label: "Payment", sortable: true },
    { fieldName: "deliveredAt", label: "Delivered at", sortable: true },
    { fieldName: "paidAt", label: "Paid at", sortable: true },
    { fieldName: "action", label: "Action" }
  ]

  const sortHandler = ({ sortBy, sortOrder }) => setSort({ sortBy, sortOrder })
  return (
    <Layout>
      <TableWithPaginationWrapper Pagination={Pagination}>
        <TableHeader columns={columns} sortHandler={sortHandler} sortState={sort} />
        <tbody>
          {orders.map((order, idx) => (
            <TableRowWrapper key={order._id} rowIndex={idx}>
              <th scope="row" className="px-6 py-4">
                {order._id}
              </th>
              <td className="px-6 py-4">
                {order.customer.name ? `${order.customer.name} (${order.customer.email})` : order.customer.email}
              </td>
              <td className="px-6 py-4">{order.orderTotalPrice}</td>
              <td className="px-6 py-4">{order.paymentMethod}</td>
              <td className="px-6 py-4">
                {order.deliveredAt ? format(new Date(order.deliveredAt), "dd/MM/yy HH:mm") : "Not delivered"}
              </td>
              <td className="px-6 py-4">{order.paidAt ? format(new Date(order.paidAt), "dd/MM/yy HH:mm") : "Not paid"}</td>
              <td className="px-6 py-4">
                <Link href={`/admin/orders/${order._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  See
                </Link>
              </td>
            </TableRowWrapper>
          ))}
        </tbody>
      </TableWithPaginationWrapper>
    </Layout>
  )
}

export default AdminOrdersPage
