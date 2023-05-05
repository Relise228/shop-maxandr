import db from "@utils/db"
import Brand from "../../models/Brand"
import Category from "../../models/Category"
import Product from "../../models/Product"
import Season from "../../models/Season"

const handler = async (req, res) => {
  await db.connect()
  // await Category.deleteMany();
  // await Category.insertMany(data.categories);
  // await Brand.deleteMany();
  // await Brand.insertMany(data.brands);
  // await Season.deleteMany();
  // await Season.insertMany(data.season);
  // await Product.deleteMany();
  // await Product.insertMany(data.products);
  await db.disconnect()
  res.send({ message: "seeded successfully" })
}
export default handler
