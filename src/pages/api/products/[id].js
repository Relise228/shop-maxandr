import cloudinary from "@utils/cloudinary"
import db from "@utils/db"
import Product from "../../../models/Product"

const handler = async (req, res) => {
  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "PUT") {
    return putHandler(req, res)
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}
const getHandler = async (req, res) => {
  await db.connect()

  const product = await Product.findById(req.query.id).populate("category").populate("brand").populate("season")
  await db.disconnect()
  res.send(product)
}

const putHandler = async (req, res) => {
  await db.connect()
  const product = await Product.findById(req.query.id)
  if (product) {
    const initialImagePublicId = product.image.public_id
    const productInputArr = Object.entries(req.body)
    productInputArr.forEach(([field, value]) => (product[field] = value))
    await product.save()
    await db.disconnect()

    if (initialImagePublicId !== req.body.image.public_id) {
      await cloudinary.uploader.destroy(initialImagePublicId)
    }
    res.send({ message: "Product updated successfully" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Product not found" })
  }
}

const deleteHandler = async (req, res) => {
  await db.connect()
  const product = await Product.findOneAndDelete({ _id: req.query.id })
  const public_id = product?.image.public_id
  if (product) {
    await db.disconnect()
    if (public_id) {
      await cloudinary.uploader.destroy(public_id)
    }
    res.send({ message: "Product deleted successfully" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Product not found" })
  }
}

export default handler
