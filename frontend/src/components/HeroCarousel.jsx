import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/banners/banner1.png";
import banner2 from "../assets/banners/banner2.webp";
import banner3 from "../assets/banners/banner3.webp";

// 🖼️ Hero banners
const heroBanners = [
  {
    title: "Unbeatable Smartphone Deals",
    subtitle: "Get the latest models at lowest prices!",
    image: banner1,
    cta: "Shop Now",
  },
  {
    title: "Flagship Phones on Sale",
    subtitle: "Up to 25% off on Samsung, Apple, OnePlus",
    image: banner2,
    cta: "View Offers",
  },
  {
    title: "Budget Phones Bonanza",
    subtitle: "Stylish, powerful, and affordable",
    image: banner3,
    cta: "Browse Collection",
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Slider {...settings}>
        {heroBanners.map((banner, idx) => (
          <Box
            key={idx}
            sx={{
              height: { xs: "300px", md: "450px" },
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#fff",
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,0.5)",
                p: 4,
                borderRadius: 2,
                maxWidth: 600,
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                {banner.title}
              </Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>
                {banner.subtitle}
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/products")}
              >
                {banner.cta}
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroCarousel;
