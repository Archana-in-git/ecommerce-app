import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getProductById, updateProduct } from "../services/productService";

const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (e) => {
    const updatedVariants = [...(product.variants || [])];
    updatedVariants[0] = { ...updatedVariants[0], price: e.target.value };
    setProduct({ ...product, variants: updatedVariants });
  };

  // Image upload handler
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(`/products/${id}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      // ✅ Log the returned URL
      console.log("Uploaded image URL from backend:", data.imageUrl);

      // Append new image URL to imageUrls array
      setProduct((prev) => ({
        ...prev,
        imageUrls: prev.imageUrls
          ? [...prev.imageUrls, data.imageUrl]
          : [data.imageUrl],
      }));
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed");
    }
  };

  const handleRemoveImage = (indexToRemove) => {
  setProduct((prevProduct) => ({
    ...prevProduct,
    imageUrls: prevProduct.imageUrls.filter((_, idx) => idx !== indexToRemove),
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product);
      alert("Product updated!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update product");
    }
  };

  if (loading || !product) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

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
    <Box maxWidth="600px" mx="auto" mt={5} sx={{ color: "white" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={product.name || ""}
          onChange={handleChange}
          margin="normal"
          sx={whiteTextFieldStyle}
        />
        <TextField
          fullWidth
          label="Brand"
          name="brand"
          value={product.brand || ""}
          onChange={handleChange}
          margin="normal"
          sx={whiteTextFieldStyle}
        />
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={product.category || ""}
          onChange={handleChange}
          margin="normal"
          sx={whiteTextFieldStyle}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={product.variants?.[0]?.price || ""}
          onChange={handleVariantChange}
          margin="normal"
          sx={whiteTextFieldStyle}
        />

        {product.imageUrls && product.imageUrls.length > 0 && (
          <Box my={2} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {product.imageUrls.map((imgUrl, idx) => (
              <Box key={idx} sx={{ position: "relative" }}>
                <img
                  src={
                    imgUrl.startsWith("http") ? imgUrl : `${BASE_URL}${imgUrl}`
                  }
                  alt={`Product image ${idx + 1}`}
                  style={{ maxWidth: "100px", borderRadius: "8px" }}
                />
                {/* Optional: Add remove button here if needed */}
                  <Button
      size="small"
      color="error"
      variant="contained"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        minWidth: "24px",
        height: "24px",
        fontSize: "12px",
        p: 0,
      }}
      onClick={() => handleRemoveImage(idx)}
    >
      ×
    </Button>

              </Box>
            ))}
          </Box>
        )}
        <Button variant="outlined" component="label" sx={{ mb: 2 }}>
          Change Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Update Product
        </Button>
      </form>
    </Box>
  );
};

export default AdminEditProduct;
