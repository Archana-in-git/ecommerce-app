import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
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
import { deleteProduct } from "../services/productService";

import { getAllProducts } from "../services/productService";
import Slider from "react-slick";
import "../styles/ProductListing.css"; // CSS file with card + dot styles
import { useAuth } from "../context/AuthContext";

const categories = ["All", "Smartphones", "Tablets", "Accessories"];

const ProductListing = () => {
  const { user } = useAuth(); // ✅ access current user
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const filters = {};
    if (searchTerm) filters.search = searchTerm;
    if (categoryFilter && categoryFilter !== "All")
      filters.category = categoryFilter;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllProducts(filters);
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, categoryFilter]);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

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

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
          justifyContent: "center",
          // no background color here, stays transparent
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "white", // white input bg
            borderRadius: 1,
            input: { color: "black" }, // black text inside input
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0,0,0,0.23)", // default outline color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00C853", // green on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00C853", // green on focus
            },
          }}
        />
        <TextField
          select
          label="Category"
          variant="outlined"
          size="small"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{
            minWidth: 160,
            backgroundColor: "white",
            borderRadius: 1,
            ".MuiSelect-select": { color: "black" }, // black text in select
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0,0,0,0.23)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00C853",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00C853",
            },
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {products.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ width: "100%" }}>
            No products found.
          </Typography>
        ) : (
          products.map((product) => (
            <Grid
              item
              key={product._id}
              xs={12}
              sm={6}
              md={4} // you can try md={5} for slightly wider cards or md={3} smaller cards
              lg={3}
              sx={{ display: "flex", justifyContent: "center" }} // centers card inside grid item
            >
              <Card
                className="product-card"
                sx={{
                  maxWidth: 280,
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: 3,
                  color: "black !important", // ✅ sets default text color for all children
                }}
              >
                <Box sx={{ px: 1.5, pt: 1.5 }}>
                  <Slider {...sliderSettings}>
                    {product.imageUrls.map((url, index) => (
                      <Box key={index}>
                        <img
                          src={url}
                          alt={`${product.name} image ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "160px", // reduced from 180px for smaller card
                            objectFit: "contain",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    ))}
                  </Slider>
                </Box>

                <CardContent sx={{ py: 1 }}>
                  <Typography variant="h6" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {product.brand}
                  </Typography>
                  {product.variants && product.variants.length > 0 ? (
                    <Typography variant="subtitle1" fontWeight="bold" mt={0.5}>
                      ₹{product.variants[0].price}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1" fontWeight="bold" mt={0.5}>
                      N/A
                    </Typography>
                  )}
                </CardContent>

                <CardActions
                  sx={{ justifyContent: "space-between", px: 1.5, py: 1 }}
                >
                  <IconButton
                    color="primary"
                    component={Link}
                    to="/cart"
                    size="small"
                  >
                    <ShoppingCart fontSize="small" />
                  </IconButton>
                  <Button
                    size="small"
                    component={Link}
                    to={`/products/${product._id}`}
                    sx={{ textTransform: "none", fontSize: "0.85rem" }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    to="/checkout"
                    state={{
                      productId: product._id,
                      productName: product.name,
                      price: product.variants?.[0]?.price || 0,
                      quantity: 1, // default quantity
                    }}
                    sx={{
                      backgroundColor: "#00C853",
                      textTransform: "none",
                      fontSize: "0.85rem",
                      "&:hover": { backgroundColor: "#00B347" },
                    }}
                  >
                    Order Now
                  </Button>
                  {user?.role === "admin" && (
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDelete(product._id)}
                      sx={{ fontSize: "0.85rem" }}
                    >
                      Delete
                    </Button>
                  )}
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
