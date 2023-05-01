import { GeneralSection } from "@components/Section/GeneralSection"
import Layout from "@components/Layout"
import React from "react"
import { useBrandsSeasonsCategories } from "../../hooks/useBrandsSeasonsCategories"

const AdminConfigsPage = () => {
  const { data, setData, isDataLoading } = useBrandsSeasonsCategories()
  console.log(data)
  return (
    <Layout>
      <div className="mx-auto max-w-screen-md">
        {isDataLoading
          ? "Loading"
          : Object.entries(data).map(([section, sectionData]) => (
              <GeneralSection key={section} section={section} sectionData={sectionData} setData={setData} />
            ))}
      </div>
    </Layout>
  )
}

export default AdminConfigsPage
