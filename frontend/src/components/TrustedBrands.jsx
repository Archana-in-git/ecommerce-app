import { Box, Typography, Grid } from "@mui/material";

const brands = [
  "https://freelogopng.com/images/all_img/1685901381apple-logo-png-white.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  "https://download.logo.wine/logo/Vivo_(technology_company)/Vivo_(technology_company)-Logo.wine.png",
  "https://phonedady.com/uploads/brand_images/c1768756717bed356cf4015697fce94e.png",
  "https://pluspng.com/img-png/oppo-logo-png-img-oppo-logo-in-svg-vector-or-png-file-format-logo-wine-3000x2000.png",
  "https://1000logos.net/wp-content/uploads/2018/10/Xiaomi-Logo-2019.png",
  "https://images.seeklogo.com/logo-png/48/2/iqoo-logo-png_seeklogo-483644.png",
  "https://www.seekpng.com/png/full/788-7887426_google-g-png-google-logo-white-png.png",
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
