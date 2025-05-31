import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Stack,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedCarousel = ({ products }) => {
  const navigate = useNavigate();
  const [timers, setTimers] = useState({});

  // Setup countdown timer state per product
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      products.forEach((p) => {
        if (p.isOnSale && p.saleEndTime) {
          const end = new Date(p.saleEndTime).getTime();
          const now = new Date().getTime();
          const timeLeft = Math.max(0, end - now);
          updated[p._id] = timeLeft;
        }
      });
      setTimers(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [products]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Featured Smartphones
      </Typography>
      <Slider {...settings}>
        {products.map((product) => {
          const timeLeft = timers[product._id];
          const hours = Math.floor((timeLeft || 0) / (1000 * 60 * 60));
          const minutes = Math.floor(
            ((timeLeft || 0) % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor(((timeLeft || 0) % (1000 * 60)) / 1000);

          return (
            <Box key={product._id} p={1}>
              <Card sx={{ position: "relative", height: "100%" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={product.imageUrls?.[0]}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.isOnSale ? (
                      <>
                        <Typography
                          component="span"
                          sx={{ textDecoration: "line-through", mr: 1 }}
                        >
                          ₹{product.price}
                        </Typography>
                        <Typography
                          component="span"
                          color="error"
                          fontWeight="bold"
                        >
                          ₹{product.salePrice}
                        </Typography>
                      </>
                    ) : (
                      <>₹{product.price}</>
                    )}
                  </Typography>

                  {/* Countdown Timer */}
                  {product.isOnSale && timeLeft > 0 && (
                    <Box mt={1}>
                      <Chip
                        label={`Flash Sale - Ends in ${hours}h ${minutes}m ${seconds}s`}
                        size="small"
                        color="warning"
                        icon={<AccessTimeIcon />}
                        sx={{ mb: 1 }}
                      />
                      <LinearProgress
                        variant="determinate"
                        value={(
                          (timeLeft / (2 * 60 * 60 * 1000)) *
                          100
                        ).toFixed(2)}
                      />
                    </Box>
                  )}

                  <Stack direction="row" spacing={1} mt={2}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => {
                        // Add your add-to-cart handler here
                        console.log("Added to cart:", product.name);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default FeaturedCarousel;
