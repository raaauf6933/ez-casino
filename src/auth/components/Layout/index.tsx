import { Box } from "@mui/material";
import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = props => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        background: "#1B2430"
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
