import Product from "../models/Product.js";

// Create new product
export const createProduct = async (req, res) => {
  console.log("Received product data:", req.body);
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// Get products with optional search and filters
export const getAllProducts = async (req, res) => {
  try {
    const { search, category, location } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (location) {
      filter.location = location;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ NEW: Get all products without filters (for admin)
export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find(); // No filters
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product by ID
export const updateProduct = async (req, res) => {
  try {
    console.log("Updating product with ID:", req.params.id);
    console.log("Update data:", req.body);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete product by ID

export const deleteProduct = async (req, res) => {
  try {
    console.log("Deleting product with ID:", req.params.id);

    // Directly delete by ID
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product removed" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/products/:id/upload
export const uploadProductImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add the new image URL to the product's imageUrls array
    product.imageUrls.push(imageUrl);

    await product.save();

    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
