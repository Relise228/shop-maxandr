import { API_PRODUCTS } from "@utils/constants"
import { getError } from "@utils/helpers"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useBrandsSeasonsCategories } from "./useBrandsSeasonsCategories"

const useCreateUpdateProduct = productId => {
  const sizes = ["xs", "s", "m", "l", "xl", "xxl"]

  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState("")
  const { options } = useBrandsSeasonsCategories()

  const [formValues, setFormValues] = useState({
    name: "",
    slug: "",
    price: "",
    image: { public_id: "", url: "" },
    category: { value: "", label: "" },
    brand: { value: "", label: "" },
    season: { value: "", label: "" },
    description: "",
    sizeCountInStock: sizes.reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {})
  })
  const router = useRouter()

  const setProductValues = async () => {
    const {
      data: { name, slug, price, image, category, brand, season, description, sizeCountInStock }
    } = await axios.get(`${API_PRODUCTS}/${productId}`)

    const formattedSizeCountInStock = {}
    sizeCountInStock.forEach(sizeCountItem => (formattedSizeCountInStock[sizeCountItem.size] = sizeCountItem.quantity))

    setFormValues({
      name,
      slug,
      price,
      image,
      category: { value: category._id, label: category.name },
      brand: { value: brand._id, label: brand.name },
      season: { value: season._id, label: season.name },
      description,
      sizeCountInStock: formattedSizeCountInStock
    })
  }

  useEffect(() => {
    if (productId) {
      setProductValues()
    }
  }, [productId])

  const handleFieldChange = (field, value) => {
    if (field === "sizeCountInStock") return
    setFormValues({ ...formValues, [field]: value })
  }
  const handleSizeCountInStockChange = (size, value) => {
    setFormValues({
      ...formValues,
      sizeCountInStock: { ...formValues.sizeCountInStock, [size]: value }
    })
  }

  const formatProduct = formValues => ({
    ...formValues,
    sizeCountInStock: Object.entries(formValues.sizeCountInStock).map(([size, quantity]) => ({ size, quantity })),
    category: formValues.category.value,
    brand: formValues.brand.value,
    season: formValues.season.value
  })

  const submitHandler = async e => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const payload = formatProduct(formValues)
      if (productId) {
        await axios.put(`/api/products/${productId}`, payload)
      } else {
        await axios.post(`/api/products`, payload)
      }

      setErr("")
      setIsLoading(false)
      router.push("/admin/products")
    } catch (err) {
      setErr(getError(err))
      setIsLoading(false)
    }
  }

  const deleteHandler = async e => {
    e.preventDefault()
    try {
      setIsLoading(true)
      if (productId) {
        await axios.delete(`/api/products/${productId}`)
      }

      setErr("")
      setIsLoading(false)
      router.push("/admin/products")
    } catch (err) {
      setErr(getError(err))
      setIsLoading(false)
    }
  }

  return { isLoading, err, options, formValues, handleFieldChange, handleSizeCountInStockChange, submitHandler, sizes, deleteHandler }
}

export { useCreateUpdateProduct }
