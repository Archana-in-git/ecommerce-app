import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const isFormValid = Object.values(shippingInfo).every(
      (val) => val.trim() !== ""
    );
    if (!isFormValid || cartItems.length === 0) {
      setError(
        "Please fill in all shipping fields and add items to your cart."
      );
      return;
    }

    try {
      setError("");
      const totalPrice = cartItems.reduce(
        (acc, item) =>
          acc +
          (item.selectedVariant?.price || item.variants?.[0]?.price || 0) *
            item.quantity,
        0
      );

      const orderItems = cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        image: item.imageUrls?.[0],
        quantity: item.quantity,
        selectedVariant: item.selectedVariant,
        price: item.selectedVariant?.price || item.variants?.[0]?.price || 0,
      }));

      await axios.post(
        "/api/orders",
        {
          orderItems,
          shippingInfo,
          paymentMethod,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      clearCart();
      setOpenSnackbar(true);
      setTimeout(() => navigate("/"), 3000); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Order failed.");
    }
  };

  const totalPrice = cartItems
    .reduce(
      (acc, item) =>
        acc +
        (item.selectedVariant?.price || item.variants?.[0]?.price || 0) *
          item.quantity,
      0
    )
    .toFixed(2);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={4}>
        {/* Shipping Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Grid container spacing={2}>
              {["fullName", "address", "city", "postalCode", "country"].map(
                (field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={shippingInfo[field]}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                )
              )}
            </Grid>

            <Box mt={3}>
              <FormLabel component="legend">Payment Method</FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="Credit Card"
                  control={<Radio />}
                  label="Credit Card"
                />
                <FormControlLabel
                  value="PayPal"
                  control={<Radio />}
                  label="PayPal"
                />
              </RadioGroup>
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {cartItems.map((item, idx) => (
              <Box
                key={idx}
                display="flex"
                justifyContent="space-between"
                my={1}
              >
                <Typography>
                  {item.name} × {item.quantity}
                </Typography>
                <Typography>
                  ₹
                  {(item.selectedVariant?.price ||
                    item.variants?.[0]?.price ||
                    0) * item.quantity}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">
                <strong>Total:</strong>
              </Typography>
              <Typography variant="subtitle1">
                <strong>₹{totalPrice}</strong>
              </Typography>
            </Box>
            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Order placed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Checkout;
