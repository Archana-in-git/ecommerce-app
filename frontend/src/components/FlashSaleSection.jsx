import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FlashSaleSection = ({ products }) => {
  const navigate = useNavigate();
  const flashSaleItems = products.filter((p) => p.isOnSale);
  const [timeLeft, setTimeLeft] = useState({});

  // Countdown timer setup
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimes = {};
      flashSaleItems.forEach((item) => {
        const distance =
          new Date(item.saleEndTime).getTime() - new Date().getTime();

        if (distance > 0) {
          const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((distance / (1000 * 60)) % 60);
          const seconds = Math.floor((distance / 1000) % 60);

          updatedTimes[item._id] = {
            hours: hours.toString().padStart(2, "0"),
            minutes: minutes.toString().padStart(2, "0"),
            seconds: seconds.toString().padStart(2, "0"),
          };
        } else {
          updatedTimes[item._id] = null; // Sale ended
        }
      });

      setTimeLeft(updatedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [flashSaleItems]);

  if (flashSaleItems.length === 0) return null;

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom color="error">
        🔥 Flash Sale — Limited Time!
      </Typography>

      <Grid container spacing={3}>
        {flashSaleItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card sx={{ p: 2, border: "2px solid red" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageUrls?.[0]}
                  alt={item.name}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.brand}
                  </Typography>
                  <Box mt={1}>
                    <Typography variant="body1" color="error" fontWeight="bold">
                      ₹{item.salePrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ₹{item.price || "99999"}
                    </Typography>
                  </Box>

                  <Box mt={1}>
                    {timeLeft[item._id] ? (
                      <Chip
                        icon={<AccessTimeIcon />}
                        label={`Ends in ${timeLeft[item._id].hours}:${
                          timeLeft[item._id].minutes
                        }:${timeLeft[item._id].seconds}`}
                        color="error"
                        size="small"
                      />
                    ) : (
                      <Chip label="Sale Ended" size="small" />
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    Buy Now
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

export default FlashSaleSection;
