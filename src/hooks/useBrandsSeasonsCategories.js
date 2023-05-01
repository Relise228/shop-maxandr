import { API_BRANDS, API_CATEGORIES, API_SEASONS } from "@utils/constants"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"

const useBrandsSeasonsCategories = () => {
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [data, setData] = useState({
    categories: [],
    brands: [],
    seasons: []
  })

  const options = useMemo(() => {
    const newOptions = {
      categories: [],
      brands: [],
      seasons: []
    }
    Object.entries(data).forEach(
      ([fieldName, fieldData]) =>
        (newOptions[fieldName] = fieldData.map(optionItem => ({
          value: optionItem._id,
          label: optionItem.name
        })))
    )

    return newOptions
  }, [data])

  const getData = async () => {
    setIsDataLoading(true)
    const endpoints = [API_BRANDS, API_CATEGORIES, API_SEASONS]
    const results = await Promise.all(endpoints.map(endpoint => axios.get(endpoint)))

    const [{ data: brands }, { data: categories }, { data: seasons }] = results
    setData({ brands, categories, seasons })
    setIsDataLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return { data, options, setData, isDataLoading }
}

export { useBrandsSeasonsCategories }
