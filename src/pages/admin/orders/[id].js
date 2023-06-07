import Cart from "@components/Cart/Cart"
import StagesGeneralInfoCard from "@components/Checkout/StagesGeneralInfoCard"
import Layout from "@components/Layout"
import Button from "@components/reusable/Button"
import { API_ORDERS } from "@utils/constants"
import { getError } from "@utils/helpers"
import { Store } from "@utils/Store"
import axios from "axios"
import { format } from "date-fns"
import { useRouter } from "next/router"
import React from "react"
import { useErrorWithToaster } from "../../../hooks/useErrorWithToaster"

const SingleOrderPage = () => {
  const router = useRouter()
  const orderId = router.query.id
  const { cart } = React.useContext(Store)

  const [orderData, setOrderData] = React.useState(null)
  const [deliveredAt, setDeliveredAt] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { setErrorMessage } = useErrorWithToaster({ withToaster: true })

  React.useEffect(() => {
    const getOrder = async () => {
      if (orderId) {
        setIsLoading(true)
        try {
          const { data } = await axios.get(`${API_ORDERS}/${orderId}`)
          setOrderData(data)
          setDeliveredAt(data.deliveredAt)
          setIsLoading(false)
          setErrorMessage("")
        } catch (e) {
          setIsLoading(false)
          setErrorMessage(getError(e))
        }
      }
    }
    getOrder()
  }, [orderId])

  const deliverOrder = React.useCallback(async () => {
    if (orderId) {
      setIsLoading(true)
      try {
        const { data } = await axios.get(`${API_ORDERS}/${orderId}/deliver`)
        setDeliveredAt(data.deliveredAt)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        setErrorMessage(getError(e))
      }
    }
  }, [orderId])

  const cartState = React.useMemo(
    () =>
      orderData
        ? {
            details: orderData.orderDetails,
            paymentMethod: orderData.paymentMethod,
            shippingAddress: orderData.shippingAddress,
            cartItems: orderData.orderItems.map(({ orderedSizesQuantity, product }) => ({
              product: product,
              sizesQty: orderedSizesQuantity.reduce(
                (acc, cur) => ({ ...acc, [cur.size]: { quantity: cur.quantity, totalSizePrice: cur.quantity * product.price } }),
                {}
              )
            })),
            totalProductsPrice: orderData.orderTotalPrice
          }
        : null,
    [orderData]
  )

  return (
    <Layout>
      <div className="container mx-auto">
        <Cart
          cartItems={cartState?.cartItems}
          totalProductsPrice={cartState?.totalProductsPrice}
          backTo={{ href: "/admin/orders", label: "orders" }}
          uneditableCart
          cartHeader="Ordered products"
        />

        <div className="flex flex-col mt-4">
          <div className="flex items-center justify-center pb-2">
            <h2 className="text-2xl text-[#0B254B] font-medium">Order details</h2>
          </div>
          <StagesGeneralInfoCard cart={cart} showAllStagesCards uneditableStages />
        </div>
        <div className="border border-gray-200 flex flex-col rounded-lg mt-8">
          <div className={`flex justify-between mx-5 py-5 items-center border-b`}>
            <div className="flex">
              <div className="text-gray-500 me-2 capitalize text-sm">Paid</div>
              <div className="text-sm">
                {orderData?.paidAt ? format(new Date(orderData?.paidAt), "dd/MM/yy HH:mm") : "Not delivered"}
              </div>
            </div>
          </div>
          <div className={`flex justify-between mx-5 py-5 items-center`}>
            <div className="flex">
              <div className="text-gray-500 me-2 capitalize text-sm">Delivered</div>
              <div className="text-sm">{deliveredAt ? format(new Date(deliveredAt), "dd/MM/yy HH:mm") : "Not delivered"}</div>
            </div>
            {deliveredAt ? null : (
              <Button disabled={isLoading} className="text-sm" onClick={deliverOrder}>
                Deliver
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SingleOrderPage
