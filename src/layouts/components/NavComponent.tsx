import { AppBar,  Button,  IconButton,  Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../pages/auth/AuthProvider";

interface NavComponentProps {
    onOpenMenu: () => void;
}


export default function NavComponent({ onOpenMenu }: NavComponentProps) {
    const auth = useAuth();

    return (
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={onOpenMenu}
            >
                <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                Tasks App
            </Typography>

            <Button color="inherit" onClick={auth.logOut}>Log out</Button>
        </Toolbar>
      </AppBar>
    );
}