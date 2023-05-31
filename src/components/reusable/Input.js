import React from "react"

const Input = ({ value, onChange, className, ...props }) => {
  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      className={`border border-greyBorder text-inputText focus:outline-none focus:border-green block p-1 ${className}`}
    />
  )
}

export default Input
