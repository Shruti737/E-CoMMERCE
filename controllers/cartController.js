import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import mongoose from "mongoose";

// Add to Cart
const addTocart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    const userId = req.user.id.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const existingProductIndex = cart.product.findIndex((p) => {
        return p.itemId.toString() === productId && p.size === size;
      });

      if (existingProductIndex > -1) {
        cart.product[existingProductIndex].quantity += quantity;
      } else {
        cart.product.push({
          itemId: product._id,
          size,
          quantity,
          price: product.price * quantity,
        });
      }

      await cart.save();
    } else {
      console.log("super else block hit");

      const newCart = new Cart({
        user: userId,
        product: [
          {
            itemId: product._id,
            size,
            quantity: Number(quantity),
            price: product.price * quantity,
          },
        ],
      });

      await newCart.save();
    }

    return res.status(200).json({ message: "Cart updated successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove Item from Cart
const removeCart = async (req, res) => {
  try {
    const userId = req.user.id.userId;
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid itemId" });
    }

    const findUserCart = await Cart.findOne({ user: userId });
    console.log(findUserCart);

    if (!findUserCart) {
      return res.status(404).json({ message: "User cart not exist" });
    }

    const removeItemFromCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { product: { itemId: new mongoose.Types.ObjectId(itemId) } } },
      { new: true }
    );

    return res.status(200).json({
      message: "Item deleted successfully",
      cart: removeItemFromCart,
    });

  } catch (error) {
    console.error("removeCart Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Cart Items
const getAllCart = async (req, res) => {
  try {
    const userId = req.user.id.userId;
    const data = await Cart.find({ user: userId });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { addTocart, removeCart, getAllCart };
