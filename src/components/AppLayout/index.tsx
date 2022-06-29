import * as React from "react";
import AppHeader from "../AppHeader";
import { Box, Hidden } from "@mui/material";
import SideMenu from "../StaticDrawer";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import AppStateProgress from "components/AppStateProgress";

const AppLayout = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props;
  // const theme = useTheme();
  // const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <AppHeader />
        <AppStateProgress />
        <div
          style={{
            display: "flex",
            height: "100vh"
          }}
        >
          <Hidden smDown>
            <SideMenu />
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
                // maxWidth: "1024px",
                overflow: "auto",
                // width: "",
                padding: "1em 1em 1em 1em"
              }}
            >
              {children}
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
};

export default AppLayout;
