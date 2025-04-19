import { Router } from "express";
import { loginUser, adminLogin, registerUser, changeRole } from "../controllers/userController.js";
import asyncHandler from "../middleware/author.js";

const router = Router();

router.post('/adminLogin',asyncHandler, adminLogin)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/changeRole/:id', changeRole)
export default router;