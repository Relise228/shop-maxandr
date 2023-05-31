import Button from "@components/reusable/Button"
import { Store } from "@utils/Store"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { CheckoutProductsList } from "./CheckoutProductsList"
import { CheckoutStageBar } from "./CheckoutStageBar"

const CheckoutWrapper = ({ activeStep, additionalGoToNextHandler, dontShowNextButton, ...props }) => {
  const { cart } = React.useContext(Store)

  const stages = React.useMemo(() => ["cart", "details", "shipping", "payment"], [])
  const router = useRouter()

  const prevStage = stages[activeStep - 1] ?? ""
  const nextStage = stages[activeStep + 1] ?? "Pay now"

  const backToHref = prevStage === "cart" ? "/cart" : `/checkout/${prevStage.toLowerCase()}`
  const nextToHref = nextStage === "cart" ? "/cart" : `/checkout/${nextStage.toLowerCase()}`

  const stagesGeneralInfo = Object.values({ details: cart.details, shippingAddress: cart.shippingAddress }).map((data, idx) => ({
    stageName: stages[idx + 1],
    stageInfo: Object.values(data)
      .filter(item => item)
      .join(", ")
  }))

  const stagesGeneralInfoToShow = activeStep > 1 ? stagesGeneralInfo.slice(0, activeStep - 1) : []
  console.log(stagesGeneralInfoToShow, "stagesGeneralInfoToShow")
  const handleGoToNext = e => {
    e.preventDefault()
    additionalGoToNextHandler && additionalGoToNextHandler()
    activeStep < stages.length - 1 && router.push(nextToHref)
  }
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col container max-w-lg mx-auto px-12">
        <CheckoutStageBar activeStep={activeStep} stages={stages} />
        {stagesGeneralInfoToShow.length ? (
          <div className="border border-gray-200 flex flex-col rounded-lg mb-4">
            {stagesGeneralInfoToShow.map(({ stageName, stageInfo }, index) => (
              <div
                key={`${stageName}_${stageInfo}`}
                className={`flex justify-between mx-5 py-5 ${index < stagesGeneralInfoToShow.length - 1 ? "border-b" : ""}`}
              >
                <div className="flex">
                  <div className="text-gray-500 me-2 capitalize text-sm">{stageName}</div>
                  <div className="text-sm">{stageInfo}</div>
                </div>
                <Link href={`/checkout/${stageName}`} className="text-green underline">
                  Edit
                </Link>
              </div>
            ))}
          </div>
        ) : null}
        <form onSubmit={handleGoToNext}>
          {props.children}
          <div className="mt-12 flex justify-between items-center">
            <Link href={backToHref} className="underline text-green capitalize">
              Back to {prevStage}
            </Link>
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
