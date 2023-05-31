import React from "react"

const CounterCircleWrapper = ({ count, ...props }) => {
  return (
    <span className="relative">
      {props.children}
      {count > 0 ? (
        <span className="absolute -top-3 -right-3 rounded-full bg-green py-0.5 px-1.5 text-xs font-semibold text-white">{count}</span>
      ) : null}
    </span>
  )
}

export { CounterCircleWrapper }
