import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/admin");
        setOrders(res.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchOrders();
    } else {
      setError("Unauthorized");
      setLoading(false);
    }
  }, [user]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );

  if (orders.length === 0)
    return (
      <Typography align="center" sx={{ mt: 4, color: "white" }}>
        No orders found.
      </Typography>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Orders
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table aria-label="admin orders table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Order ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                User
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Amount
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  color: "white", // <-- add this line here
                }}
              >
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user?.name || "N/A"}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell
                  sx={{
                    color:
                      order.status === "Delivered"
                        ? "lightgreen"
                        : order.status === "Pending"
                        ? "orange"
                        : "inherit",
                    fontWeight: "medium",
                  }}
                >
                  {order.status}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminOrders;
