import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext"; // Make sure the path is correct
import { Link } from "react-router-dom"; // You probably want to use react-router

const Sidebar = () => {
  const { user } = useAuth();

  const commonLinks = [
    { text: "Dashboard", path: "/admin" },
    { text: "Orders", path: "/admin/orders" }, // <-- fix here
    { text: "Settings", path: "/settings" },
  ];

  const adminLinks = [
    { text: "Products", path: "/admin/products" },
    { text: "Users", path: "/admin/users" },
  ];

  const linksToShow =
    user?.role === "admin" ? [...commonLinks, ...adminLinks] : commonLinks;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1e1e1e",
        }, // optional: dark background
      }}
    >
      <Toolbar />
      <List>
        {linksToShow.map(({ text, path }) => (
          <ListItem button key={text} component={Link} to={path}>
            <ListItemText
              primary={text}
              primaryTypographyProps={{ sx: { color: "#ffffff" } }} // 👈 set text color
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
