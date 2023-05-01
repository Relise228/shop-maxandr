import React from "react"
import { SectionRow } from "./SectionRow"

const GeneralSection = ({ section, sectionData, setData }) => {
  const onEditSuccess = (newValue, id) =>
    setData(prev => ({ ...prev, [section]: prev[section].map(item => (item._id === id ? { ...item, name: newValue } : item)) }))

  const onCreateSuccess = newItem => setData(prev => ({ ...prev, [section]: [...prev[section], newItem] }))

  const onDeleteSuccess = deletedItemId =>
    setData(prev => ({ ...prev, [section]: prev[section].filter(item => item._id !== deletedItemId) }))

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-semibold capitalize">{section}</h2>
      {sectionData.map(item => (
        <SectionRow key={item._id} item={item} onEditSuccess={onEditSuccess} endpoint={section} onDeleteSuccess={onDeleteSuccess} />
      ))}
      <SectionRow creatableMode endpoint={section} onCreateSuccess={onCreateSuccess} />
    </div>
  )
}

export { GeneralSection }
