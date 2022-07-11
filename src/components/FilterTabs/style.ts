import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export default makeStyles(
  () => ({
    tabsRoot: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingLeft: theme.spacing(1)
    }
  }),
  {
    name: "FilterTabs"
  }
);
