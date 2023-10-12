import mongoose from "mongoose";

const  orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      shippingInfo: {
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        landmark: {
          type: String,
          required: true,
        },
        pincode: {
          type: Number,
          required: true,
        },
      },
      paymentInfo : {
        razorpayOrderId: {
          type: String,
          required: true,
        },
        razorpayPaymentId: {
          type: String,
          required: true,
        },
      },
      orderItems: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true,
          },
          color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      paidAt: {
        type: Date,
        default: Date.now(),
      },
      month: {
        type: String,
        default: new Date().getMonth(),
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      totalPriceAfterDiscount: {
        type: Number,
        required: true,
      },
      orderStatus: {
        type: String,
        default: 'Ordered',
      },
    },
    {
      timestamps: true,
    }

);

//Export the model
export default mongoose.model("Order", orderSchema);