import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import "../styles/productDetails.css";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data);
        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      })
      .catch(console.error);
  }, [id]);

  const handleVariantChange = (e) => {
    const variant = product.variants.find((v) => v.storage === e.target.value);
    setSelectedVariant(variant);
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-details-container">
      <Grid container spacing={4} alignItems="flex-start">
        {/* Product Image */}
        <Grid item xs={12} md={5}>
          <Box className="product-image-wrapper">
            <img
              src={product.imageUrls?.[0]}
              alt={product.name}
              className="product-image"
            />
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={7}>
          <Card className="product-card light-card">
            <CardContent>
              <Typography variant="h4" className="product-title" gutterBottom>
                {product.name}
              </Typography>

              <Typography variant="subtitle1" className="product-brand">
                Brand: {product.brand}
              </Typography>

              <Box className="specs">
                <Typography variant="body2">
                  Display: {product.display}
                </Typography>
                <Typography variant="body2">
                  Processor: {product.processor}
                </Typography>
                <Typography variant="body2">
                  Camera: {product.camera}
                </Typography>
                <Typography variant="body2">
                  Battery: {product.battery}
                </Typography>
                <Typography variant="body2">OS: {product.os}</Typography>
                <Typography variant="body2">SIM: {product.sim}</Typography>
                <Typography variant="body2">
                  Material: {product.material}
                </Typography>
                <Typography variant="body2">
                  Weight: {product.weight}
                </Typography>
              </Box>

              {product.variants?.length > 0 && (
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel id="variant-select-label">
                    Select Variant
                  </InputLabel>
                  <Select
                    labelId="variant-select-label"
                    value={selectedVariant?.storage || ""}
                    label="Select Variant"
                    onChange={handleVariantChange}
                  >
                    {product.variants.map((v) => (
                      <MenuItem key={v.storage} value={v.storage}>
                        {v.storage} | ₹{v.price} | Colors:{" "}
                        {v.colorOptions.join(", ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Typography className="product-price" variant="h6" sx={{ mt: 2 }}>
                Price: ₹{selectedVariant?.price}
              </Typography>

              <Button
                variant="contained"
                className="add-to-cart-btn"
                onClick={() => addToCart({ ...product, selectedVariant })}
                disabled={!selectedVariant}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetails;
