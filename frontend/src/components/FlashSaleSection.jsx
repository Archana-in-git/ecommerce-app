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
  Skeleton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FlashSaleSection = ({ products }) => {
  const navigate = useNavigate();
  const flashSaleItems = products.filter((p) => p.isOnSale);
  const [timeLeft, setTimeLeft] = useState({});

  // Countdown timer
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
          updatedTimes[item._id] = null;
        }
      });

      setTimeLeft(updatedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [flashSaleItems]);

  if (products.length === 0) {
    // Show 3 loading skeletons
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom color="error">
          🔥 Flash Sale — Limited Time!
        </Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={`skeleton-${i}`}>
              <Card
                sx={{
                  p: 2,
                  backgroundColor: "var(--dark-bg-alt)",
                  borderRadius: "var(--border-radius)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton width="80%" height={24} sx={{ mb: 1 }} />
                  <Skeleton width="50%" height={20} sx={{ mb: 1 }} />
                  <Skeleton width="60%" height={22} />
                  <Skeleton width="40%" height={18} sx={{ mb: 1 }} />
                  <Skeleton width="70%" height={30} sx={{ mt: 2 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

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
              <Card
                sx={{
                  p: 2,
                  backgroundColor: "var(--dark-bg-alt)",
                  color: "var(--text-color)",
                  borderRadius: "var(--border-radius)",
                  boxShadow: "var(--shadow-soft)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrls?.[0]}
                    alt={item.name}
                    sx={{
                      objectFit: "contain",
                      backgroundColor: "#2a2e36",
                      p: 1,
                    }}
                  />
                  {/* Gradient overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "40px",
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))",
                    }}
                  />
                </Box>

                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" sx={{ color: "#bbb" }}>
                    {item.brand}
                  </Typography>

                  <Box mt={1}>
                    <Typography variant="body1" color="error" fontWeight="bold">
                      ₹{item.salePrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: "line-through", color: "#888" }}
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
                        sx={{ fontWeight: 500 }}
                      />
                    ) : (
                      <Chip
                        label="Sale Ended"
                        size="small"
                        color="default"
                        sx={{ color: "#ccc" }}
                      />
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      borderRadius: "12px",
                      fontWeight: "bold",
                    }}
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
