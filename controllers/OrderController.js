import Razorpay from "razorpay";
import createRazorpayInstance from "../config/razorpay.js"
import Product from "../models/productModel.js";
import crypto from 'crypto';

// Function to create HMAC-SHA256 hash
const hmac_sha256 = (key, message) => {
    return crypto
      .createHmac("sha256", key)  // Create HMAC with SHA-256 algorithm
      .update(message)            // Update it with the message
      .digest("hex");             // Return the resulting hash as a hex string
  };
  

const createOrder = async(req, res) =>{
    const instance = createRazorpayInstance();
    const {productId} = req.body;

    const amount =  await Product.findOne({_id: productId})
    console.log(amount);
    console.log(amount.price);
    
var options = {
    amount: amount.price * 100,  
    currency: "INR",
    receipt: "receipt_order_1"
  };
  console.log(options);
  
  try {
      instance.orders.create(options, function(err, order) {
        if(err){
          return res.status(500).json({message: "Something went wrong", error: err.message})
        }else{
            return res.status(200).json({message: "Order created sucessfully", order})
        }
      });
  } catch (error) {
      return res.status(500).json({message: "Something wen wrong", error:error.message})
  }
}

const verifyCreateOrder = async(req, res)=>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    console.log(secret);
    console.log(razorpay_order_id);
    console.log(razorpay_payment_id);
    
    
    const generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, secret);
    console.log(generated_signature );
    
    if (generated_signature == razorpay_signature) {
       return res.status(200).json({message: "Payment is scucessfull"})

     }else{
        return res.status(400).json({message: "Payment is not successfull"})
     }
}
export {createOrder, verifyCreateOrder}