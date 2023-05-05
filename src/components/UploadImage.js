import React, { useEffect } from "react"
import { useCloudinary } from "../hooks/useCloudinary"

const UploadImage = ({ setImage }) => {
  const { image, isLoading, uploadHandler } = useCloudinary()

  useEffect(() => {
    if (image) {
      setImage(image)
    }
  }, [image])

  return (
    <div className="mb-4">
      <label htmlFor="imageFile">Upload image</label>
      <input type="file" className="w-full" id="imageFile" onChange={uploadHandler} />
      {isLoading && <div>Uploading....</div>}
    </div>
  )
}

export { UploadImage }
