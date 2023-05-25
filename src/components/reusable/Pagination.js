import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

const Pagination = ({ totalPages, pageNumber, pageChangeHandler }) => {
  const allPagesArr = Array.from({ length: totalPages }, (_, i) => i + 1)
  const getPageNums = () => {
    if (totalPages <= 3) return allPagesArr
    if (pageNumber > 1 && pageNumber < totalPages) {
      return allPagesArr.slice(pageNumber - 2, pageNumber + 1)
    }
    return pageNumber + 2 <= totalPages
      ? allPagesArr.slice(pageNumber - 1, pageNumber + 2)
      : pageNumber + 1 <= totalPages
      ? allPagesArr.slice(pageNumber - 2, pageNumber + 1)
      : allPagesArr.slice(pageNumber - 3, pageNumber)
  }

  const pageNumbers = getPageNums()

  const onIconClick = iconType => {
    if (iconType === "prev") {
      if (pageNumber > 1) pageChangeHandler(pageNumber - 1)
    }
    if (iconType === "next") {
      if (pageNumber < totalPages) pageChangeHandler(pageNumber + 1)
    }
  }
  return (
    <div className="flex items-center justify-center">
      <FontAwesomeIcon
        size="2xl"
        icon={faChevronLeft}
        onClick={() => onIconClick("prev")}
        className={`${pageNumber === 1 ? "text-gray-300" : ""} cursor-pointer`}
      />
      {pageNumbers.map(page => (
        <div
          key={page}
          onClick={() => pageChangeHandler(page)}
          className={`p-2 m-4 font-medium cursor-pointer ${pageNumber === page ? "text-red-500" : "text-gray-400"}`}
        >
          {page}
        </div>
      ))}
      <FontAwesomeIcon
        size="2xl"
        icon={faChevronRight}
        onClick={() => onIconClick("next")}
        className={`${pageNumber === totalPages ? "text-gray-300" : ""} cursor-pointer`}
      />
    </div>
  )
}

export { Pagination }
