import React, { useEffect, useState } from "react";
import axios from "../services/api"; // or adjust the path based on your axios instance
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getProductById, updateProduct } from "../services/productService";

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

    setProduct({ ...product, image: data.imageUrl }); // update state with uploaded image URL
  } catch (err) {
    console.error("Image upload failed", err);
    alert("Image upload failed");
  }
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

  return (
    <Box maxWidth="600px" mx="auto" mt={5}>
      <Typography variant="h5" gutterBottom>
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
        />
        <TextField
          fullWidth
          label="Brand"
          name="brand"
          value={product.brand || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={product.category || ""}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={product.variants?.[0]?.price || ""}
          onChange={handleVariantChange}
          margin="normal"
        />
        {product.image && (
  <Box my={2}>
    <img
      src={product.image}
      alt="Product"
      style={{ maxWidth: "150px", borderRadius: "8px", marginBottom: "8px" }}
    />
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

