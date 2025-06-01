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
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import "../styles/ProductListing.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching products from API...");
        const data = await getAllProducts();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

      <Grid container spacing={3}>
        {products.map((product) => (
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
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                  ₹{product.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <IconButton color="primary" component={Link} to="/cart">
                  <ShoppingCart />
                </IconButton>
                <Button
                  size="small"
                  component={Link}
                  to={`/product/${product._id}`}
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
        ))}
      </Grid>
    </Container>
  );
};

export default ProductListing;
