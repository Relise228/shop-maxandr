import React from "react"

export const SingleFilterBarSection = ({ filterSection, setFilter, filterState }) => {
  const { header, list, fieldName } = filterSection
  const changeHandler = (value, isChecked) => setFilter(fieldName, value, isChecked)
  const currentSectionFilterState = filterState[fieldName]
  return (
    <div className="flex flex-col mb-4">
      <div className="capitalize font-semibold underline text-lg mb-2">{header}</div>
      <div className="flex flex-col">
        {list.map(item => (
          <div key={`${filterSection}_${item.value}`} className="flex items-center mb-4">
            <input
              checked={currentSectionFilterState.includes(item.value)}
              type="checkbox"
              className={`${item.value === "all" ? "appearance-none" : ""} checked:bg-green form-checkbox`}
              onChange={e => changeHandler(item.value, e.target.checked)}
            />
            <label className="ml-2 text-sm font-medium text-gray-900 ">{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
