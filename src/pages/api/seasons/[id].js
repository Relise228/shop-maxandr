import db from "@utils/db"
import Product from "../../../models/Product"
import Season from "../../../models/Season"

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

  const season = await Season.findById(req.query.id)
  await db.disconnect()
  res.send(season)
}

const putHandler = async (req, res) => {
  await db.connect()
  const season = await Season.findById(req.query.id)
  if (season) {
    season.name = req.body.name
    await season.save()
    await db.disconnect()
    res.send({ message: "Season updated successfully" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Season not found" })
  }
}

const deleteHandler = async (req, res) => {
  await db.connect()
  const productWithSeason = await Product.findOne({ season: req.query.id })

  if (productWithSeason) {
    await db.disconnect()
    res.status(400).send({ message: "Unable to delete. Season is already used in a product." })
    return
  }
  const season = await Season.findOneAndDelete(req.query.id)
  if (season) {
    await db.disconnect()
    res.send({ message: "Season deleted successfully" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Season not found" })
    return
  }
}

export default handler
