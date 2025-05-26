import React from "react";
// import { Link } from "react-router-dom";
// import { AppBar, Toolbar, IconButton, Typography, Badge, Button } from "@mui/material";
// import { ShoppingCart } from "@mui/icons-material";

const Navbar = () => {
  // TODO: Get user info from AuthContext
  // const { user, logout } = useContext(AuthContext);
  // TODO: Get cart count from CartContext
  // const { cartItems } = useContext(CartContext);

  return (
    <header>
      {/* TODO: Replace with MUI AppBar */}
      <nav className="navbar">
        <div className="logo">
          {/* TODO: Replace with logo image if available */}
          <h2>SmartphoneZone</h2>
        </div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Products</li>
          <li>Cart {/* TODO: Badge(cart count) */}</li>

          {/* TODO: Conditional rendering based on user role */}
          {/* If user is NOT logged in: */}
          <li>Login</li>
          <li>Register</li>

          {/* If user is logged in and not admin: */}
          {/* <li>Profile</li> */}
          {/* <li><button onClick={logout}>Logout</button></li> */}

          {/* If admin: */}
          {/* <li>Admin Dashboard</li> */}
        </ul>

        {/* TODO: Add hamburger menu for mobile */}
      </nav>
    </header>
  );
};

export default Navbar;
