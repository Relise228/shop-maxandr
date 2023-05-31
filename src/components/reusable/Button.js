import React from "react"

const Button = ({ underlinedButton, onClick, className, ...props }) => {
  if (underlinedButton) {
    return (
      <h4 className={`text-green underline cursor-pointer ${className}`} onClick={onClick}>
        {props.children}
      </h4>
    )
  }

  return (
    <button {...props} className={`bg-green py-2 px-4 rounded-sm text-lg text-white ${className}`} onClick={onClick}>
      {props.children}
    </button>
  )
}

export default Button
