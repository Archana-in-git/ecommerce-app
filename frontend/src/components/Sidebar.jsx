import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";

const Sidebar = () => (
  <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
    <Toolbar />
    <List>
      {["Dashboard", "Products", "Orders", "Users", "Settings"].map((text) => (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default Sidebar;
