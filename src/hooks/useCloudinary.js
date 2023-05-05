import { CLOUDINARY_BASE_ENDPOINT } from "@utils/constants"
import axios from "axios"
import { useState } from "react"

const useCloudinary = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(false)
  const [error, setError] = useState("")

  const uploadHandler = async e => {
    const url = `${CLOUDINARY_BASE_ENDPOINT}/upload`
    try {
      setIsLoading(true)
      const {
        data: { signature, timestamp }
      } = await axios("/api/admin/cloudinary-sign")

      const file = e.target.files[0]
      const formData = new FormData()

      formData.append("file", file)
      formData.append("signature", signature)
      formData.append("timestamp", timestamp)
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      const { data } = await axios.post(url, formData)
      setImage({ url: data.secure_url, public_id: data.public_id })
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setError(err)
    }
  }

  return { uploadHandler, isLoading, image, error }
}

export { useCloudinary }
