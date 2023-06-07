import db from "@utils/db"
import Product from "../../../models/Product"
require("../../../models/Brand")
require("../../../models/Category")
require("../../../models/Season")

const handler = async (req, res) => {
  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "POST") {
    return postHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}

const getHandler = async (req, res) => {
  await db.connect()
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const { sortBy = "createdAt", sortOrder = "desc", categories, brands, seasons, search } = req.query

  const skip = (page - 1) * limit
  const filters = {
    ...(categories && { category: { $in: categories.split(",") } }),
    ...(brands && { brand: { $in: brands.split(",") } }),
    ...(seasons && { season: { $in: seasons.split(",") } }),
    ...(search && {
      name: {
        $regex: search,
        $options: "i"
      }
    })
  }
  const totalProducts = await Product.countDocuments(filters)
  const totalPages = Math.ceil(totalProducts / limit)
  const products = await Product.find(filters)
    .populate({
      path: "category"
    })
    .populate({
      path: "season"
    })
    .populate({
      path: "brand"
    })
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })

  await db.disconnect()
  res.send({
    results: products,
    currentPage: page,
    totalPages,
    totalProducts
  })
}

const postHandler = async (req, res) => {
  await db.connect()
  const newProduct = new Product({
    ...(req.body ?? {})
  })

  const product = await newProduct.save()
  await db.disconnect()
  res.send({ message: "Product created successfully", product })
}

export default handler
