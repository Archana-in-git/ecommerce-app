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
  Skeleton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedCarousel = ({ products }) => {
  const navigate = useNavigate();
  const [timers, setTimers] = useState({});

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

  const renderSkeletonCard = (_, i) => (
    <Box key={`skeleton-${i}`} p={1}>
      <Card
        sx={{
          backgroundColor: "var(--dark-bg-alt)",
          borderRadius: "var(--border-radius)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <Skeleton variant="rectangular" height={180} />
        <CardContent>
          <Skeleton width="80%" height={24} sx={{ mb: 1 }} />
          <Skeleton width="60%" height={20} />
          <Box mt={2}>
            <Skeleton width="90%" height={10} sx={{ mb: 1 }} />
            <Skeleton width="50%" height={10} />
          </Box>
          <Stack direction="row" spacing={1} mt={2}>
            <Skeleton variant="rounded" width={80} height={36} />
            <Skeleton variant="rounded" width={100} height={36} />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ color: "var(--text-color)" }}>
        Featured Smartphones
      </Typography>

      <Slider {...settings}>
        {products.length === 0
          ? Array.from({ length: 3 }).map(renderSkeletonCard)
          : products.map((product) => {
              const timeLeft = timers[product._id];
              const hours = Math.floor((timeLeft || 0) / (1000 * 60 * 60));
              const minutes = Math.floor(
                ((timeLeft || 0) % (1000 * 60 * 60)) / (1000 * 60)
              );
              const seconds = Math.floor(
                ((timeLeft || 0) % (1000 * 60)) / 1000
              );

              return (
                <Box key={product._id} p={1}>
                  <Card
                    sx={{
                      backgroundColor: "var(--dark-bg-alt)",
                      color: "var(--text-color)",
                      borderRadius: "var(--border-radius)",
                      boxShadow: "var(--shadow-soft)",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={product.imageUrls?.[0]}
                        alt={product.name}
                        sx={{
                          objectFit: "contain",
                          backgroundColor: "#2a2e36",
                          p: 1,
                        }}
                      />
                      {/* Gradient Overlay */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "40px",
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))",
                          borderTopLeftRadius: "var(--border-radius)",
                          borderTopRightRadius: "var(--border-radius)",
                        }}
                      />
                    </Box>

                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {product.name}
                      </Typography>

                      <Typography variant="body2" sx={{ color: "#bbb" }}>
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
                              sx={{
                                color: "#ff5252",
                                fontWeight: "bold",
                              }}
                            >
                              ₹{product.salePrice}
                            </Typography>
                          </>
                        ) : (
                          <>₹{product.price}</>
                        )}
                      </Typography>

                      {product.isOnSale && timeLeft > 0 && (
                        <Box mt={2}>
                          <Chip
                            label={`Ends in ${hours}h ${minutes}m ${seconds}s`}
                            size="small"
                            icon={<AccessTimeIcon />}
                            sx={{
                              backgroundColor: "#ff9800",
                              color: "#fff",
                              mb: 1,
                            }}
                          />
                          <LinearProgress
                            variant="determinate"
                            value={(
                              (timeLeft / (2 * 60 * 60 * 1000)) *
                              100
                            ).toFixed(2)}
                            sx={{
                              backgroundColor: "#333",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#ff9800",
                              },
                              borderRadius: "4px",
                              height: "6px",
                            }}
                          />
                        </Box>
                      )}

                      <Stack direction="row" spacing={1} mt={2}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "var(--primary-color)",
                            color: "#fff",
                            textTransform: "none",
                            ":hover": {
                              backgroundColor: "#5aa246",
                            },
                          }}
                          onClick={() => {
                            if (product.isOnSale) {
                              navigate("/outofstock");
                            } else {
                              navigate(`/product/${product._id}`);
                            }
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<ShoppingCartIcon />}
                          sx={{
                            borderColor: "var(--primary-color)",
                            color: "var(--primary-color)",
                            textTransform: "none",
                            ":hover": {
                              backgroundColor: "rgba(109, 189, 80, 0.1)",
                              borderColor: "var(--primary-color)",
                            },
                          }}
                          onClick={() => {
                            if (product.isOnSale) {
                              navigate("/outofstock");
                            } else {
                              navigate(`/product/${product._id}`);
                            }
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
