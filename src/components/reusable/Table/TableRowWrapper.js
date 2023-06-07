import React from "react"

const TableRowWrapper = ({ rowIndex, children }) => {
  return (
    <tr className={`${rowIndex % 2 ? "bg-gray-50 dark:bg-gray-800" : "bg-white border-b dark:bg-gray-900"}  dark:border-gray-700`}>
      {children}
    </tr>
  )
}

export { TableRowWrapper }
