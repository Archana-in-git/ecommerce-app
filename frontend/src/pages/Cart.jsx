import React from "react";
import { useCart } from "../context/CartContext";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const getTotal = () =>
    cartItems.reduce(
      (sum, item) =>
        sum +
        (item.selectedVariant?.price || item.variants?.[0]?.price || 0) *
          item.quantity,
      0
    );

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          padding: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          Your cart is empty.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem", maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: "white" }}>
        Your Cart
      </Typography>

      <Grid container spacing={4}>
        {cartItems.map((item) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={`${item._id}-${item.selectedVariant?.storage}`}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              elevation={4}
            >
              <CardContent>
                <Box
                  component="img"
                  src={item.imageUrls?.[0]}
                  alt={item.name}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 1,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                {item.selectedVariant && (
                  <Typography sx={{ mb: 1 }}>
                    Variant: Storage {item.selectedVariant.storage}, Price ₹
                    {item.selectedVariant.price}
                  </Typography>
                )}
                <Typography sx={{ mb: 1 }}>Qty: {item.quantity}</Typography>
                <Typography sx={{ mb: 2 }}>
                  Price: ₹
                  {item.selectedVariant?.price || item.variants?.[0]?.price} ×{" "}
                  {item.quantity}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={() =>
                    removeFromCart({
                      _id: item._id,
                      selectedVariant: item.selectedVariant,
                    })
                  }
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          Total: ₹{getTotal()}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            color="error"
            onClick={clearCart}
            sx={{ minWidth: 140 }}
          >
            Clear Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
            sx={{ minWidth: 140 }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
