import Link from "next/link"
import React from "react"

const StagesGeneralInfoCard = ({
  cart,
  stages = ["cart", "details", "shipping", "payment"],
  activeStep,
  uneditableStages,
  showAllStagesCards
}) => {
  const stagesGeneralInfo = Object.values({
    details: cart.details,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod
  }).map((data, idx) => ({
    stageName: stages[idx + 1],
    stageInfo:
      typeof data !== "string"
        ? Object.values(data)
            .filter(item => item)
            .join(", ")
        : data
  }))

  const stagesGeneralInfoToShow = showAllStagesCards
    ? stagesGeneralInfo
    : activeStep > 1
    ? stagesGeneralInfo.slice(0, activeStep - 1)
    : []

  return (
    <>
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
              {uneditableStages ? null : (
                <Link href={`/checkout/${stageName}`} className="text-green underline">
                  Edit
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

export default StagesGeneralInfoCard
