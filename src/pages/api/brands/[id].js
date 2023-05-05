import db from "@utils/db"
import Brand from "../../../models/Brand"
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

  const brand = await Brand.findById(req.query.id)
  await db.disconnect()
  res.send(brand)
}

const putHandler = async (req, res) => {
  await db.connect()
  const brand = await Brand.findById(req.query.id)
  if (brand) {
    brand.name = req.body.name
    await brand.save()
    await db.disconnect()
    res.send({ message: "Brand updated successfully" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Brand not found" })
  }
}

const deleteHandler = async (req, res) => {
  await db.connect()
  const productWithBrand = await Product.findOne({ brand: req.query.id })

  if (productWithBrand) {
    await db.disconnect()
    res.status(400).send({ message: "Unable to delete. Brand is already used in a product." })
    return
  }
  const brand = await Brand.findOneAndDelete({ _id: req.query.id })
  if (brand) {
    await db.disconnect()
    res.send({ message: "Brand deleted successfully" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Brand not found" })
    return
  }
}

export default handler
