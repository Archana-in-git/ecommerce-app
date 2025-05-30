import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
      <CardMedia
        component="img"
        height="200"
        image={
          product.imageUrl ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand}
        </Typography>
        <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
          ₹{product.variants[0]?.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
