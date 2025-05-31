// src/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./pages/NotFound";
import OutOfStock from "./pages/OutOfStock";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/outofstock" element={<OutOfStock />} />
    </Routes>
  );
};

export default AppRoutes;
