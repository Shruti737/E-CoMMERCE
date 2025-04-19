import { Router } from "express";
import { addTocart, removeCart, getAllCart } from "../controllers/cartController.js";
import auth from "../middleware/auth.js";
const router = Router();
console.log("ROutes");

router.post('/addCart',auth, addTocart)
router.patch('/updateCart',auth, removeCart)
router.get('/getCart',auth,  getAllCart)

export default router

