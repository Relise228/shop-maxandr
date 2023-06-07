import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

const SortWrapper = ({ fieldName, sortDirection = "asc", activeSortFieldName, setSort, children }) => {
  const icon = sortDirection === "asc" ? faArrowDown : faArrowUp

  const sortHandler = () => {
    let newSortDir = "asc"
    if (activeSortFieldName === fieldName) {
      newSortDir = sortDirection === "asc" ? "desc" : "asc"
    }

    setSort(fieldName, newSortDir)
  }

  return (
    <div className="flex items-center cursor-pointer " onClick={sortHandler}>
      {children}
      {activeSortFieldName === fieldName && <FontAwesomeIcon icon={icon} className="ms-2" />}
    </div>
  )
}

export default SortWrapper
