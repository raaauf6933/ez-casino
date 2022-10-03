import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth, useUser } from "context/auth/context";
import { accountDetailsUrl } from "page/AccountDetails/url";
import { useNavigate } from "react-router-dom";
import Popper from "./components/Popper";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Hidden } from "@mui/material";

interface AppHeaderProps {
  setOpenMobileDrawer: (data: boolean) => void;
}

const AppHeader: React.FC<AppHeaderProps> = (props: AppHeaderProps) => {
  const { setOpenMobileDrawer } = props;
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
        // style={{
        //   background: "#14A873"
        // }}
        color="primary"
      >
        <Toolbar>
          <Hidden smUp>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenMobileDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
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
