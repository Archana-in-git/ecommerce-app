import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111", // dark custom footer
        color: "#fff",
        py: 3,
        mt: 5,
        textAlign: "center",
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} TechCart. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link to="/about" className="footer-link">
            About Us
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
          <Link to="/privacy" className="footer-link">
            Privacy Policy
          </Link>
          <Link to="/terms" className="footer-link">
            Terms of Service
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
