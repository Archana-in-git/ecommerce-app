import express from "express";
import {
  createProduct,
  getAllProducts, // updated from getAllProducts
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getAdminProducts, // added for admin product listing
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js"; // for multer

const router = express.Router();

// Create a new product
router.post("/",protect,admin, createProduct);

// Get all products for admin
router.get("/admin", protect, admin, getAdminProducts);

// Delete product
router.delete("/:id", protect, admin, deleteProduct);

// Get all products or filtered products
router.get("/", getAllProducts); // changed from "/:id" to "/" for list endpoint

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product by ID
router.put("/:id",protect,admin, updateProduct);

router.post(
  "/:id/upload",
  protect,
  admin,
  uploadMiddleware.single("image"),
  uploadProductImage
);

// // Delete a product by ID
// router.delete("/:id", deleteProduct);

export default router;
