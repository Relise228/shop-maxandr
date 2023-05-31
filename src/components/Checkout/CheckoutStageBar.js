import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export const CheckoutStageBar = ({ activeStep = 0, stages }) => {
  return (
    <div className="mb-5 flex flex-wrap items-center">
      {stages.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`me-3 capitalize ${index < activeStep ? "font-semibold text-green" : ""} 
       ${index === activeStep ? "font-semibold" : ""}`}
          >
            {step}
          </div>
          {index < stages.length - 1 ? <FontAwesomeIcon className="me-3" size="2xs" icon={faChevronRight} /> : null}
        </div>
      ))}
    </div>
  )
}
