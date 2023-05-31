import db from "@utils/db"
import Order from "../../../models/Order"
import Product from "../../../models/Product"

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
  const categories = await Order.find()
  await db.disconnect()
  res.send(categories)
}

const postHandler = async (req, res) => {
  await db.connect()

  req.body.orderItems.forEach(async orderItem => {
    const orderedQuantities = orderItem.orderedSizesQuantity

    const matchingProduct = await Product.findById(orderItem.product)
    const { sizeCountInStock } = matchingProduct

    const newSizeCountInStock = sizeCountInStock.map(singleSizeCount => {
      const newQuantity =
        singleSizeCount.quantity -
        (orderedQuantities.find(({ size: orderedSize }) => orderedSize === singleSizeCount.size)?.quantity ?? 0)
      return {
        ...singleSizeCount,
        quantity: newQuantity
      }
    })

    matchingProduct.sizeCountInStock = newSizeCountInStock
    await matchingProduct.save()
  })

  const newOrder = new Order({
    ...(req.body ?? {}),
    isPaid: true,
    isDelivered: false,
    paidAt: new Date()
  })

  const order = await newOrder.save()
  await db.disconnect()
  res.send({
    message: "Order created successfully",
    data: order
  })
}

export default handler
