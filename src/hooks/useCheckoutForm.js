import { defaultCart, Store } from "@utils/Store"
import React from "react"

const useCheckoutForm = ({ formType = "details", actionType = "SAVE_ORDER_DETAILS" }) => {
  const { dispatch, state } = React.useContext(Store)

  const [form, setForm] = React.useState(defaultCart[formType])
  React.useEffect(() => {
    setForm(state.cart[formType] || defaultCart[formType])
  }, [state])

  const handleChange = fieldValue => setForm(prev => (typeof prev === "object" ? { ...prev, ...fieldValue } : fieldValue))
  const handleSaveForm = () => dispatch({ type: actionType, payload: form })

  return { handleChange, handleSaveForm, form }
}

export { useCheckoutForm }
