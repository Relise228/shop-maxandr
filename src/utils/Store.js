import React, { createContext, useReducer } from "react"
import Cookies from "js-cookie"

export const Store = createContext()

const initialState = {
  cart: Cookies.get("mahandr_cart")
    ? JSON.parse(Cookies.get("mahandr_cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" }
}

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const { product, size, addedQty = 1 } = action.payload
      const existItem = state.cart.cartItems.find(item => item.product._id === product._id)
      const cartItems = existItem
        ? state.cart.cartItems.map(item =>
            item.product._id === existItem.product._id
              ? { ...item, sizesQty: { ...item.sizesQty, [size]: (item.sizesQty[size] ?? 0) + addedQty } }
              : item
          )
        : [...state.cart.cartItems, { product, sizesQty: { [size]: addedQty } }]
      Cookies.set("mahandr_cart", JSON.stringify({ ...state.cart, cartItems }))

      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(item => item.product._id !== action.payload.product._id)
      Cookies.set("mahandr_cart", JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: ""
        }
      }
    case "CART_CLEAR_ITEMS":
      return { ...state, cart: { ...state.cart, cartItems: [] } }

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload
          }
        }
      }
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload
        }
      }
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [totalProductsAmount, setTotalProductsAmount] = React.useState(0)

  React.useEffect(() => {
    const newTotalProductsAmount = state.cart.cartItems.length
      ? state.cart.cartItems.reduce(
          (acc, { sizesQty }) => acc + Object.values(sizesQty).reduce((acc, curSizeQty) => acc + curSizeQty, 0),
          0
        )
      : 0
    setTotalProductsAmount(newTotalProductsAmount)
  }, [state])

  const value = { state, dispatch, totalProductsAmount }
  return <Store.Provider value={value}>{children}</Store.Provider>
}
