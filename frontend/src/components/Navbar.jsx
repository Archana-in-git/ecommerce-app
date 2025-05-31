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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const guestLinks = [
    { title: "Home", path: "/" },
    { title: "Register", path: "/register" },
    { title: "Login", path: "/login" },
    { title: "Checkout", path: "/checkout" },
  ];

  const userLinks = [
    { title: "Home", path: "/" },
    { title: "Checkout", path: "/checkout" },
    { title: "Profile", path: "/profile" },
    // Add more links here if needed
  ];

  return (
    <AppBar
      position="static"
      className="navbar"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar className="toolbar">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <img src={logo} alt="TechCart Logo" className="logo" />
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
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
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
