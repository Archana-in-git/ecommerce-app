import express from "express";
import {
  createProduct,
  getProducts, // updated from getAllProducts
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create a new product
router.post("/", createProduct);

// Get all products or filtered products
router.get("/", getProducts); // changed from "/:id" to "/" for list endpoint

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product by ID
router.put("/:id", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

export default router;
