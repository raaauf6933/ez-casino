import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth, useUser } from "context/auth/context";
import { accountDetailsUrl } from "page/AccountDetails/url";
import { useNavigate } from "react-router-dom";
import Popper from "./components/Popper";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

const AppHeader = (): JSX.Element => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const user = useUser();
  const id = user?._id ? user?._id : "";

  const navigateAccountDetails = () => {
    navigate(accountDetailsUrl(id?.toString()));
  };

  return (
    <Box>
      <AppBar
        position="static"
        style={{
          background: "#14A873"
        }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EZ - CASINO
          </Typography>
          <Typography variant="body1" component="div">
            {user?.first_name} {user?.last_name}
          </Typography>
          <Popper
            toolbar={[
              {
                label: "Account Details",
                onClick: navigateAccountDetails
              },
              {
                label: "Logout",
                onClick: logout
              }
            ]}
          />
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
