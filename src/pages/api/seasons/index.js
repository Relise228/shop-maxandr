import db from "@utils/db"
import Season from "../../../models/Season"

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
  const seasons = await Season.find()
  await db.disconnect()
  res.send(seasons)
}

const postHandler = async (req, res) => {
  await db.connect()
  const newSeason = new Season({
    ...(req.body ?? {})
  })

  const season = await newSeason.save()
  await db.disconnect()
  res.send({ message: "Season created successfully", data: season })
}

export default handler
