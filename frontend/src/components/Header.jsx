import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";

const Header = () => (
  <AppBar position="static" color="default" elevation={0}>
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Typography variant="h6">Admin Dashboard</Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar alt="Admin" src="/profile.jpg" />
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
