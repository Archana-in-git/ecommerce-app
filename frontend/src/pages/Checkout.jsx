
import React, { useState } from 'react';
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
} from '@mui/material';

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    const isFormValid = Object.values(shippingInfo).every((val) => val.trim() !== '');
    if (!isFormValid) {
      setError('Please fill in all shipping fields.');
      return;
    }

    setError('');
    setOpenSnackbar(true);

    // Simulate order submission
    console.log('Order Placed:', {
      shippingInfo,
      paymentMethod,
      items: cartItems,
    });
  };

  const cartItems = [
    { id: 1, name: 'Product A', qty: 2, price: 29.99 },
    { id: 2, name: 'Product B', qty: 1, price: 49.99 },
  ];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
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
              {['fullName', 'address', 'city', 'postalCode', 'country'].map((field) => (
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
              ))}
            </Grid>

            <Box mt={3}>
              <FormLabel component="legend">Payment Method</FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
                <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
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
            {cartItems.map((item) => (
              <Box key={item.id} display="flex" justifyContent="space-between" my={1}>
                <Typography>{item.name} × {item.qty}</Typography>
                <Typography>${(item.qty * item.price).toFixed(2)}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1"><strong>Total:</strong></Typography>
              <Typography variant="subtitle1"><strong>${totalPrice}</strong></Typography>
            </Box>
            {error && (
              <Typography color="error" mt={2}>{error}</Typography>
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
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Order placed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Checkout;
