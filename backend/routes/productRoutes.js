import express from "express";
import {
  createProduct,
  getAllProducts, // updated from getAllProducts
  getProductById,
  updateProduct,
  deleteProduct,
  getAdminProducts, // added for admin product listing
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new product
router.post("/", createProduct);

// Get all products for admin
router.get("/admin", protect, admin, getAdminProducts);

// Delete product
router.delete("/:id", protect, admin, deleteProduct);

// Get all products or filtered products
router.get("/", getAllProducts); // changed from "/:id" to "/" for list endpoint

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product by ID
router.put("/:id", updateProduct);

// // Delete a product by ID
// router.delete("/:id", deleteProduct);

export default router;
