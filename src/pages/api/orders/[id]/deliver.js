import { getToken } from "next-auth/jwt"
import Order from "../../../../models/Order"
import db from "../../../../utils/db"

const handler = async (req, res) => {
  const user = await getToken({ req })
  if (!user) {
    return res.status(401).send({ message: "Error: signin required" })
  }

  await db.connect()
  const order = await Order.findById(req.query.id)
  if (order) {
    if (order.isDelivered) {
      return res.status(400).send({ message: "Error: order is already paid" })
    }
    order.isDelivered = true
    order.deliveredAt = new Date()

    const deliveredOrder = await order.save()
    await db.disconnect()
    res.send(deliveredOrder)
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Error: order not found" })
  }
}

export default handler
