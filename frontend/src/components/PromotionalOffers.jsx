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
    title: "🔥 Mega Deal: 20% Off on iPhone 13",
    description: "Limited time offer – hurry before it ends!",
    deadline: "2025-06-15T23:59:59",
    productId: "your-iphone-id", // replace with real ID
  },
  {
    title: "🎮 Gaming Beast Bundle",
    description: "Get Realme GT Neo with accessories at ₹1000 off!",
    deadline: "2025-06-10T23:59:59",
    productId: "your-realme-id", // replace with real ID
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
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6">{offer.title}</Typography>
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
