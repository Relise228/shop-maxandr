import db from "@utils/db"
import { getToken } from "next-auth/jwt"
import Order from "../../../../models/Order"

const handler = async (req, res) => {
  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method not allowed" })
  }
}
const getHandler = async (req, res) => {
  const user = await getToken({ req })
  if (!user) {
    return res.status(401).send({ message: "Error: signin required" })
  }

  await db.connect()

  const order = await Order.findById(req.query.id).populate({
    path: "orderItems.product",
    model: "Product"
  })
  await db.disconnect()
  res.send(order)
}

const deleteHandler = async (req, res) => {
  await db.connect()

  const order = await Order.findOneAndDelete({ _id: req.query.id })
  if (order) {
    await db.disconnect()
    res.send({ message: "Order deleted successfully" })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Order not found" })
    return
  }
}

export default handler
