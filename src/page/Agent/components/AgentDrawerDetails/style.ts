import { makeStyles } from "@mui/styles";

export default makeStyles(
  () => ({
    table: {
      "& th, td": {
        fontSize: "1em",
        padding: "5px"
      },
      width: "100%"
    }
  }),
  {
    name: "Table"
  }
);
