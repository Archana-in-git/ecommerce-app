import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";

const promoData = [
  {
    title: "🔥 Google Pixel 9 Pro at ₹5,000 Off",
    description: "Only today! Unleash AI-powered performance.",
    deadline: "2025-06-10T23:59:59",
    productId: "683ace69233ea37ae38fb1bc",
  },
  {
    title: "⚡ OnePlus 13R Deal",
    description: "Flat ₹3,000 discount with exchange bonus.",
    deadline: "2025-06-12T23:59:59",
    productId: "683acec9233ea37ae38fb1bf",
  },
  {
    title: "🎁 Special Offer Coming Soon",
    description: "Stay tuned for the next blockbuster deal!",
    deadline: "2025-06-20T23:59:59",
    productId: "683acc2e233ea37ae38fb0a5",
  },
];

const PromotionalOffers = () => {
  const navigate = useNavigate();

  const getCountdown = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;

    if (diff <= 0) return "Offer expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hrs}h ${mins}m left`;
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "700",
          mb: 3,
          color: "#6dbd50",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        🎁 Limited-Time Offers
      </Typography>

      <Grid container spacing={4}>
        {promoData.map((offer, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#1a1a1a",
                  border: "2px solid #6dbd50",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "#00e676",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="700"
                    gutterBottom
                    sx={{
                      color: "#00ff88",
                    }}
                  >
                    {offer.title}
                  </Typography>

                  <Typography variant="body2" color="#cfcfcf" sx={{ mb: 2 }}>
                    {offer.description}
                  </Typography>

                  <Typography
                    variant="caption"
                    display="flex"
                    alignItems="center"
                    color="#ff5252"
                    sx={{ mb: 3, fontWeight: 600 }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.7 }} />
                    {getCountdown(offer.deadline)}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    size="medium"
                    onClick={() => navigate(`/product/${offer.productId}`)}
                    sx={{
                      backgroundColor: "#6dbd50",
                      color: "#000",
                      fontWeight: "700",
                      textTransform: "none",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#00e676",
                      },
                    }}
                  >
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PromotionalOffers;
