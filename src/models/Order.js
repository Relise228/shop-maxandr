import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    customer: { email: { type: String, required: true }, name: String },
    orderItems: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true }
    },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    orderTotalPrice: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema)
export default Order
