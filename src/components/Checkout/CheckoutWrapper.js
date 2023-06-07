import Button from "@components/reusable/Button"
import { Store } from "@utils/Store"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { CheckoutProductsList } from "./CheckoutProductsList"
import { CheckoutStageBar } from "./CheckoutStageBar"
import StagesGeneralInfoCard from "./StagesGeneralInfoCard"

const CheckoutWrapper = ({ activeStep, additionalGoToNextHandler, dontShowNextButton, paymentConfirmed, ...props }) => {
  const { cart } = React.useContext(Store)

  const stages = React.useMemo(() => ["cart", "details", "shipping", "payment"], [])
  const router = useRouter()

  const prevStage = stages[activeStep - 1] ?? ""
  const nextStage = stages[activeStep + 1] ?? "Pay now"

  const backToHref = prevStage === "cart" ? "/cart" : `/checkout/${prevStage.toLowerCase()}`
  const nextToHref = nextStage === "cart" ? "/cart" : `/checkout/${nextStage.toLowerCase()}`

  const handleGoToNext = e => {
    e.preventDefault()
    additionalGoToNextHandler && additionalGoToNextHandler()
    activeStep < stages.length - 1 && router.push(nextToHref)
  }
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col container max-w-lg mx-auto px-12">
        <CheckoutStageBar activeStep={activeStep} stages={stages} />
        <StagesGeneralInfoCard
          cart={cart}
          stages={stages}
          activeStep={activeStep}
          uneditableStages={paymentConfirmed}
          showAllStagesCards={paymentConfirmed}
        />

        <form onSubmit={handleGoToNext}>
          {props.children}
          <div className="mt-12 flex justify-between items-center">
            {paymentConfirmed ? null : (
              <Link href={backToHref} className="underline text-green capitalize">
                Back to {prevStage}
              </Link>
            )}
            {!dontShowNextButton ? (
              <Button type="submit" className="bg-green py-2 px-8 rounded-sm text-lg text-white capitalize">
                {`${activeStep < stages.length - 1 ? "Go to" : ""} ${nextStage}`}
              </Button>
            ) : null}
          </div>
        </form>
      </div>
      <div className="bg-gray-200">
        <div className="container max-w-lg mx-auto px-12">
          <CheckoutProductsList />
        </div>
      </div>
    </div>
  )
}

export { CheckoutWrapper }
