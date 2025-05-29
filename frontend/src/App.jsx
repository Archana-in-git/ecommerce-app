// src/App.jsx
import React from "react";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Box>
      <Navbar />
      <AppRoutes />
      <Footer />
    </Box>
  );
};

export default App;
