import React from "react"
import { CheckoutWrapper } from "@components/Checkout/CheckoutWrapper"
import Layout from "@components/Layout"
import Input from "@components/reusable/Input"
import { useCheckoutForm } from "../../hooks/useCheckoutForm"

const DetailsPage = () => {
  const { handleChange, handleSaveForm, form } = useCheckoutForm({ formType: "details", actionType: "SAVE_ORDER_DETAILS" })

  const { firstName, secondName, contactPhone } = form

  return (
    <Layout>
      <CheckoutWrapper additionalGoToNextHandler={handleSaveForm} activeStep={1}>
        <h2 className="font-semibold text-lg mb-4">Contact info</h2>
        <Input
          required
          type="number"
          placeholder="Mobile phone number"
          value={contactPhone}
          onChange={e => handleChange({ contactPhone: e.target.value ?? "" })}
          className="mb-2 w-full"
        />
        <Input
          required
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={e => handleChange({ firstName: e.target.value ?? "" })}
          className="mb-2 w-full"
        />
        <Input
          required
          type="text"
          placeholder="Second name"
          value={secondName}
          onChange={e => handleChange({ secondName: e.target.value ?? "" })}
          className="w-full"
        />
      </CheckoutWrapper>
    </Layout>
  )
}

export default DetailsPage
