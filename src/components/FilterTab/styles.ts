import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export default makeStyles(
  () => ({
    selectedTabLabel: {
      "& .tabLabel": {
        color: theme.typography.body1.color,
        fontWeight: "600 !important"
      }
    },
    tabLabel: {
      "&:hover": {
        color: theme.typography.body1.color
      },
      color: theme.typography.caption.color,
      fontSize: "1rem",
      fontWeight: "600 !important"
    },
    tabRoot: {
      "& .MuiTab-root": {
        fontWeight: 600
      },
      minWidth: "80px",
      opacity: 1,
      paddingTop: theme.spacing(1),
      textTransform: "initial"
    }
  }),
  {
    name: "FilterTabs"
  }
);
