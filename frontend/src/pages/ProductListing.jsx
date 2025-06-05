import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Divider,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/productService";

const categories = ["All", "Smartphones", "Tablets", "Accessories"]; // example categories

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New states for search and category filter
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts(filters);
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on mount and when filters change
  useEffect(() => {
    const filters = {};
    if (searchTerm) filters.search = searchTerm;
    if (categoryFilter && categoryFilter !== "All")
      filters.category = categoryFilter;
    fetchProducts(filters);
  }, [searchTerm, categoryFilter]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#00C853", fontWeight: 600 }}
      >
        Explore Our Latest Smartphones
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Search & Filter Controls */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TextField
          select
          label="Category"
          variant="outlined"
          size="small"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {products.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ width: "100%" }}>
            No products found.
          </Typography>
        ) : (
          products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="product-card"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.imageUrls[0]}
                  alt={product.name}
                  sx={{ objectFit: "contain", p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.brand}
                  </Typography>

                  {/* Price display */}
                  {product.variants && product.variants.length > 0 ? (
                    <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                      ₹{product.variants[0].price}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                      N/A
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <IconButton color="primary" component={Link} to="/cart">
                    <ShoppingCart />
                  </IconButton>
                  <Button
                    size="small"
                    component={Link}
                    to={`/products/${product._id}`}
                    sx={{ textTransform: "none" }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    to={`/order/${product._id}`}
                    sx={{
                      backgroundColor: "#00C853",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#00B347" },
                    }}
                  >
                    Order Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ProductListing;
