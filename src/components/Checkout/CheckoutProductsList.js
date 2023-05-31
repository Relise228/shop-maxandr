import { CounterCircleWrapper } from "@components/reusable/CounterCircleWrapper"
import Image from "next/image"
import React from "react"
import { Store } from "../../utils/Store"
const CheckoutProductsList = () => {
  const [cartState, setCartState] = React.useState({ cartItems: [], shippingAddress: {}, paymentMethod: "" })
  const { state, totalProductsPrice } = React.useContext(Store)
  React.useEffect(() => {
    setCartState(state.cart)
  }, [state])

  const productsList = React.useMemo(
    () =>
      cartState.cartItems.map(({ product, sizesQty }) => ({
        ...product,
        productTotals: Object.values(sizesQty).reduce(
          (acc, cur) => ({ ...acc, price: acc.price + cur.totalSizePrice, quantity: acc.quantity + cur.quantity }),
          { quantity: 0, price: 0 }
        )
      })),
    [cartState.cartItems]
  )

  return (
    <div className="flex flex-col">
      {productsList.map(productData => (
        <div key={productData._id} className="flex items-center py-4 border-b border-gray-400">
          <CounterCircleWrapper count={productData.productTotals.quantity}>
            <Image
              src={productData.image.url}
              alt={productData.name}
              className="object-contain group-hover:opacity-75"
              width={100}
              height={100}
            />
          </CounterCircleWrapper>

          <div className="flex flex-col justify-center ms-3">
            <h2 className=" text-lg text-[#0B254B] font-medium capitalize">{productData.name}</h2>
            <h4 className="text-green font-semibold text-xl">$ {productData.price}</h4>
            <div className="flex items-center">
              <div className="me-3">Subtotal</div>
              <h4 className="text-green font-semibold text-xl">$ {productData.productTotals.price}</h4>
            </div>
          </div>
        </div>
      ))}
      <div className="flex p-4 justify-between">
        <h4>Total</h4>
        <h2 className="text-2xl font-semibold">$ {totalProductsPrice}</h2>
      </div>
    </div>
  )
}

export { CheckoutProductsList }
