import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "../services/api"; // axios instance with token etc
import { addProduct } from "../services/productService";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    category: "smartphone", // default category
    display: "",
    processor: "",
    battery: "",
    camera: "",
    os: "",
    sim: "",
    material: "",
    weight: "",
    imageUrls: [], // images URLs returned after upload
    variants: [{ storage: "", price: "", colorOptions: [] }],
  });

  // Store selected image files (before upload)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    const updatedVariants = [...product.variants];
    if (name === "colorOptions") {
      updatedVariants[0][name] = value.split(",").map((str) => str.trim());
    } else {
      updatedVariants[0][name] = value;
    }
    setProduct({ ...product, variants: updatedVariants });
  };

  // Handle file select (multiple allowed)
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async () => {
    setError(null);
    // Validate required fields
    if (
      !product.name ||
      !product.brand ||
      !product.category ||
      !product.variants[0].storage ||
      !product.variants[0].price
    ) {
      setError("Please fill all required fields");
      return;
    }

    // Prepare product data: convert price to Number, ensure proper variant format
    const fixedVariants = product.variants.map((v) => ({
      storage: v.storage.trim(),
      price: Number(v.price),
      colorOptions: v.colorOptions || [],
    }));

    const productToSend = {
      ...product,
      variants: fixedVariants,
    };

    setUploading(true);
    try {
      // 1. Create product first
      const createdProduct = await addProduct(productToSend);
      const productId = createdProduct._id || createdProduct.id;

      // 2. Upload images sequentially
      const uploadedImageUrls = [];

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await axios.post(
          `/products/${productId}/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        uploadedImageUrls.push(data.imageUrl);
      }

      // Optionally update product with image URLs if your backend supports it
      // or just navigate away if not needed

      alert("Product and images uploaded successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error adding product or uploading images", err);
      setError("Failed to add product or upload images");
    } finally {
      setUploading(false);
    }
  };

  const whiteTextFieldStyle = {
    input: { color: "white" },
    "& label": { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
    },
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, color: "white" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
        Add New Product
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          sx={whiteTextFieldStyle}
        />
        <TextField
          label="Brand"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          required
          sx={whiteTextFieldStyle}
        />
        <TextField
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          sx={whiteTextFieldStyle}
        />

        <Typography variant="subtitle1" mt={2} sx={{ color: "white" }}>
          Variant Details
        </Typography>

        <TextField
          label="Storage"
          name="storage"
          value={product.variants[0].storage}
          onChange={handleVariantChange}
          sx={whiteTextFieldStyle}
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.variants[0].price}
          onChange={handleVariantChange}
          sx={whiteTextFieldStyle}
          required
        />
        <TextField
          label="Color Options (comma separated)"
          name="colorOptions"
          value={product.variants[0].colorOptions.join(", ")}
          onChange={handleVariantChange}
          sx={whiteTextFieldStyle}
        />

        <Box>
          <Button variant="outlined" component="label" disabled={uploading}>
            {uploading ? "Uploading..." : "Select Images"}
            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              onChange={handleImageSelect}
            />
          </Button>
          <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
            {selectedFiles.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={`Selected ${i}`}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
            ))}
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={uploading}
        >
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default AdminAddProduct;
