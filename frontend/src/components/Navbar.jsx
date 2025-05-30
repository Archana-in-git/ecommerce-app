import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

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

           <Link to="/">
          <IconButton
            size="large"
            edge="start"
            sx={{ mr: 2 }}
            color="inherit"
            
          >
            <HomeIcon/>
          </IconButton></Link>
          

          <Link to="/Register">
            <Button  color="inherit">Register</Button>
          </Link>
          <Link to="/Login">
            <Button  color="inherit">Login</Button>
          </Link>
          <Link to="/NotFOund">
            <Button color="inherit">NotFound</Button>
          </Link>
          
            <Link to="/Cart">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              
              aria-haspopup="true"
              
              color="inherit"
            >
              <ShoppingCartIcon />
            </IconButton></Link>



        </Toolbar>
      </AppBar>
    </Box>
  );
}
