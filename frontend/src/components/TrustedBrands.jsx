import { Box, Typography, Grid } from "@mui/material";

const brands = [
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4f/Realme_Logo.png",
];

const TrustedBrands = () => (
  <Box sx={{ mt: 6, textAlign: "center" }}>
    <Typography variant="h6" gutterBottom>
      🤝 Trusted by Top Brands
    </Typography>
    <Grid container spacing={2} justifyContent="center">
      {brands.map((logo, i) => (
        <Grid item key={i}>
          <img src={logo} alt={`brand-${i}`} height="40" />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default TrustedBrands;
