import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";

const addTocart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    console.log(req.user);
    const userId = req.user.id.userId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      const existingProductIndex = cart.product.findIndex((p, index) => {
        return p.itemId.productId.toString() === productId && p.size === size;
      });

      if (existingProductIndex > -1) {
        cart.product[existingProductIndex].quantity += quantity;
      } else {
        cart.product.push({
          itemId: {
            productId: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            subCategory: product.subCategory,
            sizes: product.sizes,
          },
          size,
          quantity,
          price: product.price * quantity,
        });
      }

      await cart.save();
    } else {
      const newCart = new Cart({
        userId,
        user: userId,
        product: [
          {
            itemId: {
              productId: product._id,
              name: product.name,
              description: product.description,
              price: product.price,
              category: product.category,
              subCategory: product.subCategory,
              sizes: product.sizes,
            },
            size,
            quantity,
            price: product.price * quantity,
          },
        ],
      });

      await newCart.save();
    }

    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const removeCart = async () => {
  try {
    
  } catch (error) {
    
  }
};

const getAllCart = async () => {};

export { addTocart, removeCart, getAllCart };
