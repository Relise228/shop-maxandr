import { Pagination } from "@components/reusable/Pagination"
import React from "react"

export const usePaginationHook = ({ totalPages, initialPageNumber = 1, onPageChangeCallback }) => {
  const [pageNumber, setPageNumber] = React.useState(initialPageNumber)
  const pageChangeHandler = newPageNumber => {
    setPageNumber(newPageNumber)
    onPageChangeCallback && onPageChangeCallback(newPageNumber)
  }

  const MemoizedPaging = React.useMemo(
    () => totalPages && <Pagination pageChangeHandler={pageChangeHandler} totalPages={totalPages} pageNumber={pageNumber} />,
    [totalPages, pageNumber]
  )

  return { Pagination: MemoizedPaging, pageNumber }
}
