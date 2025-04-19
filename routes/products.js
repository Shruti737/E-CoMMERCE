import { Router } from "express";
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/productController.js";
import upload from '../middleware/multer.js'
import auth from "../middleware/auth.js";

const productrouter = Router();

/**
 * @swagger
 * /api/product/removeProduct/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Remove a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       400:
 *         description: Bad Request
 */
productrouter.delete('/removeProduct/:id', auth, removeProduct);

/**
 * @swagger
 * /api/product/addProduct:
 *   post:
 *     tags:
 *       - Product
 *     summary: Add a new product
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: price
 *         type: number
 *       - in: formData
 *         name: category
 *         type: string
 *       - in: formData
 *         name: subCategory
 *         type: string
 *       - in: formData
 *         name: sizes
 *         type: string
 *       - in: formData
 *         name: bestseller
 *         type: boolean
 *       - in: formData
 *         name: image1
 *         type: file
 *       - in: formData
 *         name: image2
 *         type: file
 *       - in: formData
 *         name: image3
 *         type: file
 *       - in: formData
 *         name: image4
 *         type: file
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Bad Request
 */
productrouter.post(
  "/addProduct", auth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  (req, res, next) => {
    console.log("Files received:", req.files);
    console.log("Request body:", req.body);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    next();
  },
  addProduct
);

/**
 * @swagger
 * /api/product/listProduct:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get all products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched products
 */
productrouter.get('/listProduct', auth, listProduct);

/**
 * @swagger
 * /api/product/singleProduct/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get single product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
productrouter.get('/singleProduct/:id', auth, singleProduct);

export default productrouter;
