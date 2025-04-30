import { Router } from "express";
import { createOrder, verifyCreateOrder} from "../controllers/OrderController.js"
import auth from "../middleware/auth.js";
const router = Router();
console.log("ROutes");

router.post('/createOrder', createOrder)
router.post('/verifyOrder', verifyCreateOrder)

export default router

