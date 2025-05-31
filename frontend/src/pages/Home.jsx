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

const brandOptions = ["All", "Apple", "Samsung", "Realme"];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res);
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
        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              placeholder="Search by name or brand..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              // Optional: add onChange to search filter
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Filter by Brand"
              value={filteredBrand}
              onChange={(e) => setFilteredBrand(e.target.value)}
            >
              {brandOptions.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        {/* 🛍️ Featured Products */}
        {!loading && filteredProducts.length > 0 && (
          <FeaturedCarousel products={filteredProducts.slice(0, 6)} />
        )}

        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom>
            Explore by Category
          </Typography>
          <Grid container spacing={2}>
            {["Budget", "Flagship", "Gaming"].map((category, index) => (
              <Grid item xs={12} sm={4} key={category}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <Card
                    sx={{ p: 3, textAlign: "center", cursor: "pointer" }}
                    onClick={() => navigate("/products")}
                  >
                    <Typography variant="h6">{category} Phones</Typography>
                    <Typography variant="body2" color="text.secondary">
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
        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/products")}
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
