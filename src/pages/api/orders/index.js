import db from "@utils/db"
import { getToken } from "next-auth/jwt"
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
  const user = await getToken({ req })
  if (!user) {
    return res.status(401).send({ message: "Error: signin required" })
  }

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const { sortBy = "createdAt", sortOrder = "desc", customerEmail, delivered } = req.query

  const skip = (page - 1) * limit
  const filters = {
    ...(customerEmail && {
      "customer.email": {
        $regex: customerEmail,
        $options: "i"
      }
    })
  }
  const totalOrders = await Order.countDocuments(filters)
  const totalPages = Math.ceil(totalOrders / limit)
  const orders = await Order.find(filters)

    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })

  await db.disconnect()
  res.send({
    results: orders,
    currentPage: page,
    totalPages,
    totalOrders
  })
}

const postHandler = async (req, res) => {
  const user = await getToken({ req })
  if (!user) {
    return res.status(401).send({ message: "Error: signin required" })
  }

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
