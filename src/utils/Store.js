import React, { createContext, useReducer } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { PAYMENT_METHOD_PAYPAL } from "./constants"

export const Store = createContext()

export const defaultCart = {
  cartItems: [],
  shippingAddress: {
    country: "",
    city: "",
    address: "",
    postalCode: ""
  },
  details: {
    contactPhone: "",
    firstName: "",
    secondName: ""
  },
  paymentMethod: PAYMENT_METHOD_PAYPAL
}

const initialState = {
  cart:
    typeof window !== "undefined" && localStorage.getItem("mahandr_cart")
      ? JSON.parse(localStorage.getItem("mahandr_cart"))
      : defaultCart
}

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const { product, size, addedQty = 1 } = action.payload
      const existItem = state.cart.cartItems.find(item => item.product._id === product._id)
      const cartItems = existItem
        ? state.cart.cartItems.map(item =>
            item.product._id === existItem.product._id
              ? {
                  ...item,
                  sizesQty: {
                    ...item.sizesQty,
                    [size]: {
                      quantity: (item.sizesQty[size]?.quantity ?? 0) + addedQty,
                      totalSizePrice: item.product.price * ((item.sizesQty[size]?.quantity ?? 0) + addedQty)
                    }
                  }
                }
              : item
          )
        : [
            ...state.cart.cartItems,
            { product, sizesQty: { [size]: { quantity: addedQty, totalSizePrice: product.price * addedQty } } }
          ]
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(item => item.product._id !== action.payload.product._id)
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case "CART_RESET":
      return {
        ...state,
        cart: defaultCart
      }
    case "CART_CLEAR_ITEMS":
      return { ...state, cart: { ...state.cart, cartItems: [] } }

    case "SAVE_ORDER_DETAILS":
      return {
        ...state,
        cart: {
          ...state.cart,
          details: { ...state.cart.details, ...action.payload }
        }
      }
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
  const [totalProductsPrice, setTotalProductsPrice] = React.useState(0)
  const [, setCartData] = useLocalStorage("mahandr_cart", defaultCart)
  const [cart, setCart] = React.useState(defaultCart)

  React.useEffect(() => {
    const newTotalProductsAmount = state.cart.cartItems?.length
      ? state.cart.cartItems.reduce(
          (acc, { sizesQty }) => acc + Object.values(sizesQty).reduce((acc, curSize) => acc + curSize.quantity, 0),
          0
        )
      : 0

    setTotalProductsAmount(newTotalProductsAmount)
    setTotalProductsPrice(
      state.cart.cartItems?.reduce(
        (acc, { sizesQty }) => acc + Object.values(sizesQty).reduce((acc, { totalSizePrice }) => acc + totalSizePrice, 0),
        0
      ) ?? 0
    )
    setCart(state.cart)
  }, [state.cart])

  React.useEffect(() => {
    setCartData(state.cart)
  }, [state.cart])

  const value = { state, dispatch, totalProductsAmount, totalProductsPrice, cart }
  return <Store.Provider value={value}>{children}</Store.Provider>
}
