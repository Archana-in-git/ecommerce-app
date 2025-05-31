import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { useNavigate } from "react-router-dom";

const OutOfStock = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#fff8f0",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 100, color: "#f44336" }} />
        <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
          Uh-oh! This product is currently out of stock.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Looks like this flash sale item flew off the shelves!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Browse Other Products
        </Button>
      </Container>
    </Box>
  );
};

export default OutOfStock;
