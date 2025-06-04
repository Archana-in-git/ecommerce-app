import React from "react";
import { Typography, Button } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { useNavigate } from "react-router-dom";
import "../styles/OutOfStock.css"; // 👈 Custom CSS

const OutOfStock = () => {
  const navigate = useNavigate();

  return (
    <div className="outofstock-container">
      <div className="outofstock-content">
        <SentimentDissatisfiedIcon className="outofstock-icon" />
        <Typography variant="h4" className="outofstock-title">
          Out of Stock!
        </Typography>
        <Typography variant="body1" className="outofstock-message">
          Looks like this flash sale item flew off the shelves.
        </Typography>
        <Button
          variant="contained"
          className="outofstock-button"
          onClick={() => navigate("/")}
        >
          Browse Other Products
        </Button>
      </div>
    </div>
  );
};

export default OutOfStock;
