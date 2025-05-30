import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
            Home
          </Button>

          <Link to="/Register">
            <Button color="inherit">Register</Button>
          </Link>
          <Link to="/Login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/NotFOund">
            <Button color="inherit">NotFound</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
