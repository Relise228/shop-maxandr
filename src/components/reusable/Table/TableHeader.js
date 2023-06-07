import React from "react"
import SortWrapper from "./SortWrapper"

const TableHeader = ({ sortHandler, sortState, columns }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map(({ fieldName, label, sortable }) => (
          <th key={fieldName} scope="col" className="px-6 py-3">
            {sortable ? (
              <SortWrapper
                fieldName={fieldName}
                sortDirection={sortState.sortOrder}
                activeSortFieldName={sortState.sortBy}
                setSort={(sortBy, sortOrder) => sortHandler({ sortBy, sortOrder })}
              >
                {label}
              </SortWrapper>
            ) : (
              label
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export { TableHeader }
