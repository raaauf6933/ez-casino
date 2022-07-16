import * as React from "react";
import AppHeader from "../AppHeader";
import { Box, Hidden } from "@mui/material";
import SideMenu from "../StaticDrawer";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import AppStateProgress from "components/AppStateProgress";
import MobileDrawer from "./components/Drawer";

const AppLayout = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props;
  const [openMobileDrawer, setOpenMobileDrawer] =
    React.useState<boolean>(false);

  return (
    <>
      {/* <Box
      // sx={{ minHeight: "100vh" }}
      > */}
      <AppHeader setOpenMobileDrawer={setOpenMobileDrawer} />
      <AppStateProgress />

      <div
        style={{
          display: "flex",
          flexGrow: 2
        }}
      >
        <Hidden smDown>
          <SideMenu />
        </Hidden>
        <Hidden smUp>
          <MobileDrawer open={openMobileDrawer} setOpen={setOpenMobileDrawer} />
        </Hidden>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <Box
            component="main"
            sx={{
              maxWidth: "1024px",
              overflow: "auto",
              // width: "",
              padding: "1em 1em 1em 1em"
            }}
          >
            {children}
          </Box>
        </div>
      </div>
      {/* </Box> */}
    </>
  );
};

export default AppLayout;
