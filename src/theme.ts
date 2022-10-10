import { createTheme, Theme } from "@mui/material/styles";
import { yellow as ywcollor } from "@mui/material/colors";

export default (): Theme =>
  createTheme({
    palette: {
      error: {
        main: "#dc3545"
      },
      primary: {
        contrastText: "#16213E",
        main: "#FFD700"
      },
      warning: {
        main: ywcollor[300]
      }
    }
  });
