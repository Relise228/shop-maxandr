import { Store } from "@utils/Store"
import React from "react"
import { toast } from "react-toastify"

const useUpdateProductQuantity = product => {
  const { dispatch, state } = React.useContext(Store)
  const sizeCountInStockObject = React.useMemo(
    () => product.sizeCountInStock.reduce((acc, cur) => ({ ...acc, [cur.size]: cur.quantity }), {}),
    [product]
  )

  const currentProductItemFromCart = state.cart.cartItems?.find(item => item.product._id === product._id)
  const updateQuantity = (product, size, addedQty) => {
    if (!currentProductItemFromCart) return
    if (addedQty > 0) {
      if (currentProductItemFromCart.sizesQty[size]?.quantity + addedQty > sizeCountInStockObject[size]) {
        toast.error(`You reached maximum amount of ${product.name} - ${size.toUpperCase()}`)
        return
      }
      dispatch({ type: "CART_ADD_ITEM", payload: { product, size, addedQty } })
    } else {
      if (currentProductItemFromCart.sizesQty[size]?.quantity + addedQty < 0) return
      dispatch({ type: "CART_ADD_ITEM", payload: { product, size, addedQty } })
    }
  }

  return { updateQuantity }
}

export { useUpdateProductQuantity }
