import { Button } from "@mui/material";
import { NavLink } from "react-router";

interface FooterProps {
    isLogin?: boolean;
    isSingUp?: boolean;
}

export default function Footer ({isLogin, isSingUp}: FooterProps) {
    return (
      <div className="mt-4 flex justify-center">
        {isLogin &&
            <Button component={NavLink} variant="outlined" to="/signup">
              Sign up
            </Button>   
        }
        {isSingUp &&
            <Button component={NavLink} variant="outlined" to="/">
              Log in
            </Button>
        }
      </div>
    );
}