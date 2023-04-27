import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useCreateUpdateProduct } from "../hooks/useCreateUpdateProduct"
import { CustomListBox } from "./CustomListBox"
import { UploadImage } from "./UploadImage"

const CreateUpdateProductForm = () => {
  const router = useRouter()

  const { isLoading, err, options, formValues, handleFieldChange, handleSizeCountInStockChange, submitHandler, sizes, deleteHandler } =
    useCreateUpdateProduct(router.query.id)

  return (
    <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
      <div className="mb-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300"
          id="name"
          autoFocus
          required
          onChange={e => handleFieldChange("name", e.target.value)}
          value={formValues.name}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          className="w-full border border-gray-300"
          id="slug"
          required
          onChange={e => handleFieldChange("slug", e.target.value)}
          value={formValues.slug}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          className="w-full border border-gray-300"
          id="price"
          required
          onChange={e => handleFieldChange("price", e.target.value)}
          value={formValues.price}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image">image</label>
        <input type="text" className="w-full border border-gray-300" id="image" onChange={() => {}} value={formValues.image.url} />
      </div>
      <UploadImage setImage={uploadedImage => handleFieldChange("image", uploadedImage)} />

      <div className="mb-4">
        <label htmlFor="category">category</label>
        <CustomListBox
          onChange={value => handleFieldChange("category", value)}
          selectedOption={formValues.category}
          options={options.categories}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="brand">brand</label>
        <CustomListBox
          onChange={value => handleFieldChange("brand", value)}
          selectedOption={formValues.brand}
          options={options.brands}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="season">season</label>
        <CustomListBox
          onChange={value => handleFieldChange("season", value)}
          selectedOption={formValues.season}
          options={options.seasons}
        />
      </div>

      {sizes.map(size => (
        <div key={size} className="mb-4">
          <label htmlFor={`Stock q-ty ${size}`}>Stock q-ty {size.toUpperCase()}</label>
          <input
            type="text"
            className="w-full border border-gray-300"
            id={`sizeCountInStock${size}`}
            onChange={e => handleSizeCountInStockChange(size, e.target.value)}
            value={formValues.sizeCountInStock[size]}
            required
          />
        </div>
      ))}

      <div className="mb-4">
        <label htmlFor="description">description</label>
        <textarea
          type="text"
          className="w-full border border-gray-300"
          id="description"
          onChange={e => handleFieldChange("description", e.target.value)}
          value={formValues.description}
          required
          rows="5"
        />
      </div>
      <div className="mb-4">
        <button disabled={isLoading} className="bg-orange-300 py-2 px-4 rounded-lg mx-2">
          {isLoading ? "Loading" : "Submit"}
        </button>
        {router.query.id && (
          <button onClick={deleteHandler} className="bg-orange-300 py-2 px-4 rounded-lg mx-2">
            {isLoading ? "Loading" : "Delete"}
          </button>
        )}
        <Link href={`/admin/products`} className="bg-orange-300 py-2 px-4 rounded-lg">
          Go Back
        </Link>
      </div>
    </form>
  )
}

export { CreateUpdateProductForm }
