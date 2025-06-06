import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

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
import ProtectedRoute from "./components/ProtectedRoute";
import AdminOrders from "./pages/AdminOrders";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminProductList from "./pages/AdminProductList";
import AdminUsers from "./pages/AdminUsers"; // <-- ADD THIS
import AdminEditProduct from "./pages/AdminEditProduct";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/outofstock" element={<OutOfStock />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute admin>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute admin>
            <AdminOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/product/add"
        element={
          <ProtectedRoute admin>
            <AdminAddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute admin>
            <AdminProductList />
          </ProtectedRoute>
        }
      />

      {/* ADD the AdminUsers route here */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute admin>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

<Route path="/admin/products/edit/:id" element={<ProtectedRoute admin><AdminEditProduct /></ProtectedRoute>} />

    </Routes>
  );
};

export default AppRoutes;
