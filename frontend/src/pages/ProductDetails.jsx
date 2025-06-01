import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import "../styles/productDetails.css";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch(console.error);
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-details-container">
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <img
            src={product.imageUrls?.[0]}
            alt={product.name}
            className="product-details-image"
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Card className="product-details-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Brand: {product.brand}
              </Typography>
              <Typography variant="body1">
                Display: {product.display}
              </Typography>
              <Typography variant="body1">
                Processor: {product.processor}
              </Typography>
              <Typography variant="body1">Camera: {product.camera}</Typography>
              <Typography variant="body1">
                Battery: {product.battery}
              </Typography>
              <Typography variant="body1">OS: {product.os}</Typography>
              <Typography variant="body1">SIM: {product.sim}</Typography>
              <Typography variant="body1">
                Material: {product.material}
              </Typography>
              <Typography variant="body1">Weight: {product.weight}</Typography>

              {product.variants?.length > 0 && (
                <Typography variant="body1" className="variant-list">
                  Variants: {product.variants.map((v) => v.name).join(", ")}
                </Typography>
              )}

              <Typography variant="h6" color="secondary" className="price">
                ₹{product.price}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
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
