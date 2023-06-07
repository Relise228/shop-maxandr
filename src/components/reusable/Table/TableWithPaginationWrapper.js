import React from "react"

const TableWithPaginationWrapper = ({ Pagination, children }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-8">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">{children}</table>
      {Pagination}
    </div>
  )
}

export { TableWithPaginationWrapper }
