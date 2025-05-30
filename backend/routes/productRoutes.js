const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// POST /api/products  - add a new product
router.post("/", productController.createProduct);

// GET /api/products  - get all products
router.get("/", productController.getAllProducts);

module.exports = router;
