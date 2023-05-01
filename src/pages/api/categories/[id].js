import db from "@utils/db"
import Category from "../../../models/Category"
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

  const category = await Category.findById(req.query.id)
  await db.disconnect()
  res.send(category)
}

const putHandler = async (req, res) => {
  await db.connect()
  const category = await Category.findById(req.query.id)
  if (category) {
    category.name = req.body.name
    await category.save()
    await db.disconnect()
    res.send({ message: "Category updated successfully" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Category not found" })
  }
}

const deleteHandler = async (req, res) => {
  await db.connect()
  const productWithCategory = await Product.findOne({ category: req.query.id })

  if (productWithCategory) {
    await db.disconnect()
    res.status(400).send({ message: "Unable to delete. Category is already used in a product." })
    return
  }
  const category = await Category.findOneAndDelete(req.query.id)
  if (category) {
    await db.disconnect()
    res.send({ message: "Category deleted successfully" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Category not found" })
    return
  }
}

export default handler
