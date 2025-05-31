import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion"; // ✅ import motion

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
      whileHover={{ scale: 1.03 }} // smooth scale on hover
      initial={{ opacity: 0, y: 20 }} // animation start state
      animate={{ opacity: 1, y: 0 }} // end state
      transition={{ duration: 0.5, ease: "easeOut" }} // smoothness
    >
      <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
        <Slider {...settings}>
          {(product.imageUrls || []).map((url, idx) => (
            <div key={idx}>
              <img
                src={url}
                alt={`${product.name} image ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              />
            </div>
          ))}
        </Slider>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand}
          </Typography>
          <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
            ₹{product.variants?.[0]?.price}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
