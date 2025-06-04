import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrder(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      setCancelLoading(true);
      await axios.put(
        `/api/orders/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchOrder(); // refresh data after cancel
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) return <CircularProgress />;

  if (error)
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Typography>
        <strong>Order ID:</strong> {order._id}
      </Typography>
      <Typography>
        <strong>Status:</strong> {order.status}
      </Typography>
      <Typography>
        <strong>Payment Method:</strong> {order.paymentMethod}
      </Typography>
      <Typography>
        <strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}
      </Typography>

      <Box mt={3}>
        <Typography variant="h6">Shipping Info</Typography>
        <Typography>Name: {order.shippingInfo.fullName}</Typography>
        <Typography>Address: {order.shippingInfo.address}</Typography>
        <Typography>City: {order.shippingInfo.city}</Typography>
        <Typography>Postal Code: {order.shippingInfo.postalCode}</Typography>
        <Typography>Country: {order.shippingInfo.country}</Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Items</Typography>
        {order.orderItems.map((item, idx) => (
          <Box key={idx} sx={{ mb: 1 }}>
            <Typography>
              {item.name} x {item.quantity} - ₹
              {(item.price * item.quantity).toFixed(2)}
            </Typography>
            {item.selectedVariant && (
              <Typography variant="body2" color="text.secondary">
                Variant: {item.selectedVariant.storage} - ₹
                {item.selectedVariant.price}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      {order.status === "Pending" && (
        <Button
          variant="contained"
          color="error"
          onClick={handleCancel}
          disabled={cancelLoading}
          sx={{ mt: 3 }}
        >
          {cancelLoading ? "Cancelling..." : "Cancel Order"}
        </Button>
      )}

      <Button
        variant="outlined"
        sx={{ mt: 2, ml: 2 }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default OrderPage;
