import db from "@utils/db"
import Brand from "../../../models/Brand"

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
  const brands = await Brand.find()
  await db.disconnect()
  res.send(brands)
}

const postHandler = async (req, res) => {
  await db.connect()
  console.log(req.body, "req.body")
  const newBrand = new Brand({
    ...(req.body ?? {})
  })

  const brand = await newBrand.save()
  await db.disconnect()
  res.send({ message: "Brand created successfully", data: brand })
}

export default handler
