import { makeStyles } from "@mui/styles";
// import theme from "theme";

// const newTheme = theme();

export default makeStyles(
  () => ({
    auto: {
      bottom: 0,
      marginTop: "1em",
      maxWidth: "1024px",
      position: "unset",
      width: "100%"
    },
    root: {
      bottom: 0,
      // maxWidth: "1024px",
      marginTop: "1em",
      position: "unset",
      width: "100%"

      // [newTheme.breakpoints.up("xs")]: {
      //   marginTop: "1em",
      //   position: "unset",
      //   width: "100%"
      // },
      // [newTheme.breakpoints.up("sm")]: {
      //   position: "unset",
      //   width: "50%"
      // },
      // [newTheme.breakpoints.up("md")]: {
      //   position: "unset",
      //   width: "70%"
      // }
    }
  }),
  {
    name: "SaveButtonBar"
  }
);
