import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        display: "inline-block",
        transformOrigin: "top left",
        scale: 0.91,
      }}
    >
      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card
          className="product-card"
          sx={{
            maxWidth: 280, // control max width here
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <Slider {...settings}>
            {(product.imageUrls || []).map((url, idx) => (
              <div key={idx}>
                <img
                  src={url}
                  alt={`${product.name} image ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "180px", // reduced from 200px
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
              </div>
            ))}
          </Slider>
          <CardContent sx={{ paddingBottom: 2 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              noWrap
              sx={{ color: "black" }} // ✅ force black text
            >
              {product.name}
            </Typography>

            <Typography
              variant="body2"
              noWrap
              sx={{ color: "black" }} // ✅ force black text
            >
              {product.brand}
            </Typography>

            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: "black" }} // ✅ force black text
            >
              ₹{product.variants?.[0]?.price}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
