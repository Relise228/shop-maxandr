import db from "@utils/db"
import Category from "../../../models/Category"

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
  const categories = await Category.find()
  await db.disconnect()
  res.send(categories)
}

const postHandler = async (req, res) => {
  await db.connect()
  const newCategory = new Category({
    ...(req.body ?? {})
  })

  const category = await newCategory.save()
  await db.disconnect()
  res.send({ message: "Category created successfully", data: category })
}

export default handler
