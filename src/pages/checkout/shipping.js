import { CheckoutWrapper } from "@components/Checkout/CheckoutWrapper"
import Layout from "@components/Layout"
import Input from "@components/reusable/Input"
import React from "react"
import { useCheckoutForm } from "../../hooks/useCheckoutForm"

const ShippingPage = () => {
  const { handleChange, handleSaveForm, form } = useCheckoutForm({ formType: "shippingAddress", actionType: "SAVE_SHIPPING_ADDRESS" })

  const { country, city, address, postalCode } = form
  return (
    <Layout>
      <CheckoutWrapper additionalGoToNextHandler={handleSaveForm} activeStep={2}>
        <h2 className="font-semibold text-lg mb-4">Shipping info</h2>
        <Input
          required
          type="text"
          placeholder="Country"
          value={country}
          onChange={e => handleChange({ country: e.target.value ?? "" })}
          className="mb-2 w-full"
        />
        <Input
          required
          type="text"
          placeholder="City"
          value={city}
          onChange={e => handleChange({ city: e.target.value ?? "" })}
          className="mb-2 w-full"
        />
        <Input
          required
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => handleChange({ address: e.target.value ?? "" })}
          className="mb-2 w-full"
        />
        <Input
          required
          type="number"
          placeholder="Postal code"
          value={postalCode}
          onChange={e => handleChange({ postalCode: e.target.value ?? "" })}
          className="w-full"
        />
      </CheckoutWrapper>
    </Layout>
  )
}

export default ShippingPage
