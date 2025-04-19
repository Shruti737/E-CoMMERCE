import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: [
    {
      itemId: {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        description: String,
        price: Number,
        category: String,
        subCategory: String,
        sizes: [String],
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
      size:{
        type: String
      },
      price: Number,
    },
  ],
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
