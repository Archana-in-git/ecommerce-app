import React from "react";
import { useCart } from "../context/CartContext";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
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
      <Typography variant="h6" sx={{ padding: 4 }}>
        Your cart is empty.
      </Typography>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={`${item._id}-${item.selectedVariant?.storage}`}
          >
            <Card>
              <CardContent>
                <img
                  src={item.imageUrls?.[0]}
                  alt={item.name}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                <Typography variant="h6">{item.name}</Typography>
                {item.selectedVariant && (
                  <Typography>
                    Variant: Storage {item.selectedVariant.storage}, Price ₹
                    {item.selectedVariant.price}
                  </Typography>
                )}
                <Typography>Qty: {item.quantity}</Typography>
                <Typography>
                  Price: ₹
                  {item.selectedVariant?.price || item.variants?.[0]?.price} ×{" "}
                  {item.quantity}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
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

      <Typography variant="h5" sx={{ marginTop: 4 }}>
        Total: ₹{getTotal()}
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={clearCart}
        sx={{ marginTop: 2 }}
      >
        Clear Cart
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        component={Link}
        to="/checkout"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Cart;
