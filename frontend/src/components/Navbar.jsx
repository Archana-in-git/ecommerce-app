import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/navbar.css";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Before return (
  const guestLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Register", path: "/register" },
    { title: "Login", path: "/login" },
  ];

  const userLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Profile", path: "/profile" },
  ];

  // ✅ Conditionally show admin link
  if (user && user.role === "admin") {
    userLinks.push({ title: "Admin", path: "/admin" });
  }

  return (
    <AppBar
      position="static"
      className="navbar"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar className="toolbar">
        {/* Logo */}
        {/* Logo with App Name */}
        <Link
          to="/"
          className="logo-link"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src={logo}
            alt="TechCart Logo"
            className="logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span className="techcart-font">TechCart</span>
        </Link>

        {/* Desktop Nav Links */}
        <Box className="nav-links">
          {(user ? userLinks : guestLinks).map((link) => (
            <Link to={link.path} key={link.title} className="nav-button">
              <Button color="inherit">{link.title}</Button>
            </Link>
          ))}

          {user ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : null}

          <Link to="/cart">
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Link>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          className="menu-button"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #1c1f26 0%, #101215 100%)",
            color: "#ffffff",
            width: 240,
            borderLeft: "2px solid #68cb3a",
          },
        }}
      >
        <Box role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {(user ? userLinks : guestLinks).map((link) => (
              <ListItem button key={link.title} component={Link} to={link.path}>
                <ListItemText primary={link.title} />
              </ListItem>
            ))}

            <ListItem button component={Link} to="/cart">
              <ListItemText primary="Cart" />
            </ListItem>

            {user && (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
