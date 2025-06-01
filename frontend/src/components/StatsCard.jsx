import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const StatsCard = ({ title, value, color }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card sx={{ backgroundColor: color, color: "#fff" }}>
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default StatsCard;
