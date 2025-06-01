import React from "react";
import { Box, Grid, CssBaseline } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import ChartPanel from "../components/ChartPanel";
import OrdersTable from "../components/OrdersTable";

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header />

        <Grid container spacing={3}>
          <StatsCard title="Total Revenue" value="$32,000" color="#1976d2" />
          <StatsCard title="Orders" value="820" color="#2e7d32" />
          <StatsCard title="Users" value="3,200" color="#ed6c02" />
          <StatsCard title="Pending" value="24" color="#d32f2f" />

          <Grid item xs={12} md={8}>
            <ChartPanel />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrdersTable />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
