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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Dummy data
const dummyProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: "₹129,900",
    image: "https://via.placeholder.com/300x200?text=iPhone+14+Pro",
    description: "Experience the new Dynamic Island.",
    brand: "Apple",
    category: "Flagship",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: "₹74,999",
    image: "https://via.placeholder.com/300x200?text=Galaxy+S23",
    description: "Epic in every way.",
    brand: "Samsung",
    category: "Flagship",
  },
  {
    id: 3,
    name: "Realme Narzo 60",
    price: "₹12,999",
    image: "https://via.placeholder.com/300x200?text=Narzo+60",
    description: "Budget phone with 5G.",
    brand: "Realme",
    category: "Budget",
  },
];

// Brand options for filter
const brandOptions = ["All", "Apple", "Samsung", "Realme"];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* 🔝 Hero Section */}
      <Box
        sx={{
          backgroundImage:
            "url(https://via.placeholder.com/1500x400?text=Top+Smartphones)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 8,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Top Smartphones at Best Prices!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Latest models from leading brands.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/products")}>
          Shop Now
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {/* 🔍 Search Bar */}
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
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              defaultValue="All"
              label="Filter by Brand"
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
        <Typography variant="h5" gutterBottom>
          Featured Smartphones
        </Typography>
        <Grid container spacing={3}>
          {dummyProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ my: 1 }}>
                    {product.price}
                  </Typography>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    View Details
                  </Button>
                  <Button variant="contained" size="small">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 🔁 Categories / Tags Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Explore Categories
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="outlined">Budget Phones</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">Flagships</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">Gaming Phones</Button>
            </Grid>
          </Grid>
        </Box>

        {/* 📰 Promotional Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Special Offers
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor: "#f0f0f0" }}>
                <CardContent>
                  <Typography variant="h6">20% Off on iPhones</Typography>
                  <Typography variant="body2">
                    Valid till: June 30, 2025
                  </Typography>
                  <Button size="small" sx={{ mt: 1 }}>
                    Explore Deals
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor: "#f9f9f9" }}>
                <CardContent>
                  <Typography variant="h6">
                    Samsung Flagships at 10% Off
                  </Typography>
                  <Typography variant="body2">Limited Time Offer</Typography>
                  <Button size="small" sx={{ mt: 1 }}>
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* 📱 All Products Preview */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            All Products Preview
          </Typography>
          <Grid container spacing={3}>
            {dummyProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={`preview-${product.id}`}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="subtitle1">{product.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box textAlign="center" mt={2}>
            <Button variant="contained" onClick={() => navigate("/products")}>
              View All Products
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
