import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
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
import "../styles/Checkout.css"; // 👈 Import custom CSS

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
      setTimeout(() => navigate("/"), 3000);
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
    <div className="checkout-container">
      <Typography variant="h4" className="checkout-title">
        Checkout
      </Typography>
      <Grid container spacing={4}>
        {/* Shipping Form */}
        <Grid item xs={12} md={6}>
          <div className="checkout-box">
            <Typography variant="h6" className="section-title">
              Shipping Address
            </Typography>
            <Grid container spacing={2}>
              {["fullName", "address", "city", "postalCode", "country"].map(
                (field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={shippingInfo[field]}
                      onChange={handleInputChange}
                      className="checkout-input"
                    />
                  </Grid>
                )
              )}
            </Grid>

            <div className="payment-method">
              <FormLabel component="legend" className="section-title">
                Payment Method
              </FormLabel>
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
            </div>
          </div>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={6}>
          <div className="checkout-box">
            <Typography variant="h6" className="section-title">
              Order Summary
            </Typography>
            {cartItems.map((item, idx) => (
              <div key={idx} className="summary-item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹
                  {(item.selectedVariant?.price ||
                    item.variants?.[0]?.price ||
                    0) * item.quantity}
                </span>
              </div>
            ))}
            <Divider className="divider" />
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>₹{totalPrice}</strong>
            </div>
            {error && <p className="checkout-error">{error}</p>}
            <Button
              variant="contained"
              fullWidth
              onClick={handlePlaceOrder}
              className="checkout-btn"
            >
              Place Order
            </Button>
          </div>
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
    </div>
  );
};

export default Checkout;
