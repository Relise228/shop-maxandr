import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: {
      type: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
      },
      required: true
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    numReviews: Number,
    rating: Number,
    feedback: [{ author: { email: String, name: String }, content: String }],
    sizeCountInStock: [
      {
        size: {
          type: String,
          enum: ["xs", "s", "m", "l", "xl", "xxl"],
          required: true
        },
        quantity: { type: Number, required: true, default: 0 }
      }
    ],
    brand: { type: mongoose.Types.ObjectId, ref: "Brand", required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true
    },
    season: { type: mongoose.Types.ObjectId, ref: "Season" }
  },
  {
    timestamps: true
  }
)

// productSchema.remove(['brandId', 'categoryId', 'seasonId']);

const Product = mongoose.models?.Product || mongoose.model("Product", productSchema)
export default Product
