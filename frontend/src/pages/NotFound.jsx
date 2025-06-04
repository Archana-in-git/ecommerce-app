import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css"; // 👈 Custom CSS

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <Typography variant="h1" className="notfound-title">
          404
        </Typography>
        <Typography variant="h5" className="notfound-message">
          Oops! Looks like you're lost in cyberspace.
        </Typography>
        <Typography variant="body1" className="notfound-subtext">
          The page you’re looking for isn’t here.
        </Typography>
        <Button
          variant="contained"
          className="notfound-button"
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
