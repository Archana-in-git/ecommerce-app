import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  MenuItem,
  Container,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllProducts } from "../services/productService";
import HeroCarousel from "../components/HeroCarousel";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { motion } from "framer-motion";
import PromotionalOffers from "../components/PromotionalOffers";
import Testimonials from "../components/Testimonials";
import TrustedBrands from "../components/TrustedBrands";
import NewsletterSignup from "../components/NewsletterSignup";
import FlashSaleSection from "../components/FlashSaleSection";

const brandOptions = ["All", "Apple", "Samsung", "Realme"];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Utility: Add flash sale metadata
  const addFlashSaleMeta = (products) => {
    return products.map((product) => {
      if (
        ["iPhone 15", "iPhone 15 Pro Max", "Samsung Galaxy S25 Edge"].includes(
          product.name
        )
      ) {
        return {
          ...product,
          isOnSale: true,
          salePrice: Number(product.price) - 5000 || 74999,
          saleEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        };
      }
      return product;
    });
  };

  // Fetch products and enhance with flash sale metadata
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        const withSaleMeta = addFlashSaleMeta(res);
        setProducts(withSaleMeta);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    filteredBrand === "All"
      ? products
      : products.filter((p) => p.brand === filteredBrand);

  return (
    <Box>
      {/* 🔝 Hero Section */}
      <HeroCarousel />

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {/* 🔍 Search & Filter */}
        {!loading && <FlashSaleSection products={products} />}

        {/* 🛍️ Featured Products */}
        {!loading && filteredProducts.length > 0 && (
          <FeaturedCarousel products={filteredProducts.slice(0, 6)} />
        )}

        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#00ff88",
              textShadow: "0 0 10px #00ff88",
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Explore by Category
          </Typography>
          <Grid container spacing={3}>
            {["Budget", "Flagship", "Gaming"].map((category, index) => (
              <Grid item xs={12} sm={4} key={category}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <Card
                    onClick={() => navigate("/products")}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: "#1a1a1a",
                      color: "#00ff88",
                      borderRadius: 3,
                      boxShadow: "0 0 25px rgba(0, 255, 100, 0.5)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 0 40px rgba(0, 255, 100, 0.8)",
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {category} Phones
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#ffffffcc", mt: 1 }}
                    >
                      Top models curated for this category
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
        {!loading && <PromotionalOffers />}
        {!loading && <Testimonials />}
        {!loading && <TrustedBrands />}
        <NewsletterSignup />
        {/* 📱 CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Box textAlign="center" mt={5}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/products")}
              sx={{
                backgroundColor: "#68cb3a",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                px: 4,
                "&:hover": {
                  backgroundColor: "#5ab332",
                },
              }}
            >
              View All Products
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
