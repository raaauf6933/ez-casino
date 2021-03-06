import { createTheme, Theme } from "@mui/material/styles";
import { yellow as ywcollor } from "@mui/material/colors";

export default (): Theme =>
  createTheme({
    palette: {
      primary: {
        main: "rgb(20, 168, 115)"
      },
      warning: {
        main: ywcollor[300]
      }
    }
  });
