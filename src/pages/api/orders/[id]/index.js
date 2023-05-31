import db from "@utils/db"
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
  await db.connect()

  const order = await Order.findById(req.query.id)
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
