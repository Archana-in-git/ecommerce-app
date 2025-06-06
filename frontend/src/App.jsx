// src/App.jsx
import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const location = useLocation(); // 👈 get current route

  // 👇 Only show Footer on homepage
  const showFooter = location.pathname === "/";
  return (
    <Box>
      <Navbar />
      <AppRoutes />
       {showFooter && <Footer />} {/* ✅ conditionally render */}
    </Box>
  );
};

export default App;
