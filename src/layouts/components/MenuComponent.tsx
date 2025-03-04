import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Task";
import { NavLink } from "react-router";

export default function MenuComponent() {
    return (
      <Box sx={{ width: 250, overflow: "auto" }}>
        <aside>
          <List>
            <ListItem>
              <ListItemButton component={NavLink} to="/dashboard">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemButton component={NavLink} to="/task">
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
              </ListItemButton>
            </ListItem>
          </List>
        </aside>
      </Box>
    );
}