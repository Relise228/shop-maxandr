import { Pagination } from "@components/reusable/Pagination"
import React from "react"

export const usePaginationHook = ({ totalPages, initialPageNumber = 1 }) => {
  const [pageNumber, setPageNumber] = React.useState(initialPageNumber)

  const MemoizedPaging = React.useMemo(
    () => totalPages && <Pagination totalPages={totalPages} pageNumber={pageNumber} setPageNumber={setPageNumber} />,
    [totalPages, pageNumber]
  )

  return { Pagination: MemoizedPaging, pageNumber }
}
