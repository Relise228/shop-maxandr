import { PAYMENT_METHOD_CARD, PAYMENT_METHOD_PAYPAL } from "@utils/constants"
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
        orderedSizesQuantity: [
          {
            size: {
              type: String,
              enum: ["xs", "s", "m", "l", "xl", "xxl"],
              required: true
            },
            quantity: { type: Number, required: true, default: 0 }
          }
        ]
      }
    ],
    orderTotalPrice: { type: Number, required: true },
    shippingAddress: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    orderDetails: {
      contactPhone: { type: String, required: true },
      firstName: { type: String, required: true },
      secondName: { type: String, required: true }
    },
    paymentMethod: { type: String, enum: [PAYMENT_METHOD_PAYPAL, PAYMENT_METHOD_CARD], required: true },
    paymentResult: { id: String, status: String, email_address: String },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema)
export default Order
