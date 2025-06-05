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
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom color="error">
          🔥 Flash Sale — Limited Time!
        </Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={`skeleton-${i}`}>
              <Card sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
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
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={item.imageUrls?.[0]}
                    alt={item.name}
                    sx={{
                      height: 200, // fixed height like FeaturedCarousel
                      width: "100%",
                      objectFit: "contain",
                      backgroundColor: "#f0f0f0",
                      p: 1,
                    }}
                  />
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

                <CardContent sx={{ flexGrow: 1 }}>
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
