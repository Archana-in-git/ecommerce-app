import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "../services/api";
import { addProduct } from "../services/productService";

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    imageUrls: [],
    variants: [{ price: "", stock: "", variantName: "" }],
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (e) => {
    const updatedVariants = [...product.variants];
    updatedVariants[0] = {
      ...updatedVariants[0],
      [e.target.name]: e.target.value,
    };
    setProduct({ ...product, variants: updatedVariants });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setProduct((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, data.imageUrl],
      }));
    } catch (err) {
      console.error("Image upload failed", err);
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (!product.name || !product.brand || !product.category) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await addProduct(product);
      alert("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error adding product", err);
      setError("Failed to add product");
    }
  };

  // Common style for white text inputs
  const whiteTextFieldStyle = {
    input: { color: "white" },
    "& label": { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "#1976d2" }, // Optional blue focus
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
          label="Variant Name"
          name="variantName"
          value={product.variants[0].variantName}
          onChange={handleVariantChange}
          sx={whiteTextFieldStyle}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.variants[0].price}
          onChange={handleVariantChange}
          sx={whiteTextFieldStyle}
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={product.variants[0].stock}
          onChange={handleVariantChange}
          sx={whiteTextFieldStyle}
        />

        {/* Image Upload */}
        <Box>
          <Button variant="outlined" component="label" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
            {product.imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Uploaded ${i}`}
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
