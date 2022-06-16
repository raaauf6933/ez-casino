import { makeStyles } from "@mui/styles";
import theme from "theme";

const newTheme = theme();

export default makeStyles(
  () => ({
    root: {
      bottom: 0,
      position: "fixed",
      [newTheme.breakpoints.up("xs")]: {
        marginTop: "1em",
        position: "unset",
        width: "100%"
      },
      [newTheme.breakpoints.up("sm")]: {
        position: "fixed",
        width: "50%"
      },
      [newTheme.breakpoints.up("md")]: {
        position: "fixed",
        width: "70%"
      },
      [newTheme.breakpoints.up("lg")]: {
        position: "fixed",
        width: "80%"
      }
    }
  }),
  {
    name: "SaveButtonBar"
  }
);
