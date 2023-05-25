import React from "react"

const Button = props => {
  return (
    <button className="bg-green py-2 px-4 rounded-lg text-lg mb-2 text-white" {...props}>
      {props.children}
    </button>
  )
}

export default Button
