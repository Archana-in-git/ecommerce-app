import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const orders = [
  { id: "ORD001", user: "John", total: "$120", status: "Shipped" },
  { id: "ORD002", user: "Emma", total: "$340", status: "Processing" },
  { id: "ORD003", user: "Liam", total: "$90", status: "Delivered" },
];

const OrdersTable = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Recent Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default OrdersTable;
