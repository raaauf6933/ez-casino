import { Box } from "@mui/material";
import * as React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = props => {
  const { children } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        height: "100vh"
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
