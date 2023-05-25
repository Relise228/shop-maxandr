import Button from "@components/reusable/Button"
import React from "react"
import { SingleFilterBarSection } from "./SingleFilterBarSection"

export const FilterBar = ({ filterSections, setFilter, filterState, applyFilters }) => {
  return (
    <div className="flex flex-col">
      <Button onClick={applyFilters}>Apply</Button>
      {filterSections.map((filterSection, index) => (
        <SingleFilterBarSection
          key={`filterSection_${index}_${filterSection.header}`}
          filterSection={filterSection}
          setFilter={setFilter}
          filterState={filterState}
        />
      ))}
    </div>
  )
}
