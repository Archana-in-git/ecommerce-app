// src/components/Home.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* 🔝 Hero Section */}
      <Box
        sx={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: { xs: 4, md: 8 },
          borderRadius: 3,
          textAlign: "center",
          color: "white",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Top Smartphones at Best Prices!
        </Typography>
        <Typography variant="h6">Latest models from leading brands.</Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleShopNow}
          sx={{ alignSelf: "center" }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
