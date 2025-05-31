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
    productId: "683ace69233ea37ae38fb1bc", // Google Pixel 9 Pro
  },
  {
    title: "⚡ OnePlus 13R Deal",
    description: "Flat ₹3,000 discount with exchange bonus.",
    deadline: "2025-06-12T23:59:59",
    productId: "683acec9233ea37ae38fb1bf", // OnePlus 13R
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
      <Typography variant="h5" gutterBottom>
        🎁 Limited-Time Offers
      </Typography>
      <Grid container spacing={3}>
        {promoData.map((offer, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card sx={{ p: 2, border: "2px solid #1976d2" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {offer.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {offer.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="flex"
                    alignItems="center"
                    color="error"
                    sx={{ mb: 2 }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {getCountdown(offer.deadline)}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/product/${offer.productId}`)}
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
