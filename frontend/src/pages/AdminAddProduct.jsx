import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { addProduct } from "../services/productService"; // you’ll create this API function

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    imageUrls: [],
    variants: [{ price: "", stock: "", variantName: "" }],
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addProduct(product);
      alert("Product added successfully");
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  return (
    <Container>
      <Typography variant="h5">Add New Product</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Name" name="name" onChange={handleChange} />
        <TextField label="Brand" name="brand" onChange={handleChange} />
        <TextField label="Category" name="category" onChange={handleChange} />
        <TextField
          label="Image URLs (comma separated)"
          name="imageUrls"
          onChange={(e) =>
            setProduct({ ...product, imageUrls: e.target.value.split(",") })
          }
        />
        {/* Add more variant fields if needed */}
        <Button variant="contained" onClick={handleSubmit}>
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;