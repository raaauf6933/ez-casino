import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import AppStateContext from "context/appState/context";

const AppStateProgress: React.FC = () => {
  const { state } = React.useContext(AppStateContext);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        style={{
          width: "100%",
          zIndex: 1201
        }}
        sx={{
          display: state.loading ? "block" : "none"
        }}
      />
    </Box>
  );
};

export default AppStateProgress;
