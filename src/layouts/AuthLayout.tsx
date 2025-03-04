import { Box, Drawer, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import NavComponent from "./components/NavComponent";
import MenuComponent from "./components/MenuComponent";
import { useState } from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const drawerWidth = 250;
    const [ open, setOpen ] = useState(true);

    const onOpenMenu = () => {
        setOpen(!open);
        console.log("Open menu", open);
    }

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <NavComponent onOpenMenu={onOpenMenu} />

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: {
              md: "block",
            }
          }}
          variant="persistent"
          open={open}
          onClose={onOpenMenu}
        >
          <Toolbar />
          <MenuComponent />
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
