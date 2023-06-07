import { CheckoutWrapper } from "@components/Checkout/CheckoutWrapper"
import Layout from "@components/Layout"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { API_ORDERS, PAYMENT_METHOD_CARD, PAYMENT_METHOD_PAYPAL } from "@utils/constants"
import { getError } from "@utils/helpers"
import { Store } from "@utils/Store"
import axios from "axios"
import { useSession } from "next-auth/react"
import React from "react"
import { toast } from "react-toastify"
import { useCheckoutForm } from "../../hooks/useCheckoutForm"

const PaymentPage = () => {
  const {
    handleChange,
    handleSaveForm: savePaymentMethodInStorage,
    form: selectedPaymentMethod
  } = useCheckoutForm({ formType: "paymentMethod", actionType: "SAVE_PAYMENT_METHOD" })
  const { data: session } = useSession()
  const { totalProductsPrice, state, dispatch } = React.useContext(Store)
  const [isOrderPaid, setIsOrderPaid] = React.useState(false)

  const possiblePaymentMethods = React.useMemo(() => [PAYMENT_METHOD_PAYPAL, PAYMENT_METHOD_CARD], [])

  React.useEffect(() => {
    if (selectedPaymentMethod) savePaymentMethodInStorage()
  }, [selectedPaymentMethod])

  React.useEffect(() => {
    if (isOrderPaid) {
      return () => dispatch({ type: "CART_CLEAR_ITEMS" })
    }
  }, [isOrderPaid])

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalProductsPrice }
          }
        ]
      })
      .then(orderID => {
        return orderID
      })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await axios.post(API_ORDERS, {
          customer: { email: session?.user?.email, name: session?.user?.name },
          orderItems: state.cart.cartItems.map(({ product, sizesQty }) => ({
            product: product._id,
            orderedSizesQuantity: Object.entries(sizesQty).map(([size, { quantity }]) => ({
              size,
              quantity
            }))
          })),
          orderTotalPrice: totalProductsPrice,
          shippingAddress: state.cart.shippingAddress,
          orderDetails: state.cart.details,
          paymentMethod: selectedPaymentMethod,
          paymentResult: {
            id: details.id,
            status: details.status,
            email_address: details.email_address
          },
          isPaid: true
        })
        setIsOrderPaid(true)
      } catch (err) {
        toast.error(getError(err))
      }
    })
  }
  const onError = err => {
    toast.error(getError(err))
  }
  return (
    <Layout>
      <CheckoutWrapper dontShowNextButton activeStep={3} paymentConfirmed={isOrderPaid}>
        {isOrderPaid ? (
          <div className="flex items-center flex-col justify-center mt-8">
            <FontAwesomeIcon size="7x" icon={faCircleCheck} className="text-green mb-4" />
            <h2 className="pb-2 mb-2 text-2xl text-[#0B254B] font-medium">Payment Confirmed</h2>
            <p>Thank you {session?.user?.name || ""} for your order.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-8">
              {possiblePaymentMethods.map(paymentMethod => (
                <div key={paymentMethod} className="flex items-center me-4">
                  <input
                    type="radio"
                    value={paymentMethod}
                    name="default-radio"
                    className="w-4 h-4 text-green bg-gray-100 border-gray-300"
                    checked={selectedPaymentMethod === paymentMethod}
                    onChange={e => handleChange(e.target.value)}
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize">{paymentMethod}</label>
                </div>
              ))}
            </div>

            {selectedPaymentMethod === PAYMENT_METHOD_PAYPAL ? (
              <div className="w-full">
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
              </div>
            ) : selectedPaymentMethod === PAYMENT_METHOD_CARD ? (
              "Here will be cards form from stripe maybe"
            ) : null}
          </>
        )}
      </CheckoutWrapper>
    </Layout>
  )
}

export default PaymentPage
