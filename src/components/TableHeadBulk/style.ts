import { makeStyles } from "@mui/styles";

export default makeStyles(
  () => ({
    cell: {
      padding: 0
    },

    checkboxSelected: {
      backgroundColor: "#FFFFF"
    },
    container: {
      alignItems: "center",
      display: "flex",
      height: 47,
      marginRight: "16px"
    },
    dragRows: {
      padding: 0,
      width: 52
    },
    padding: {
      "&:last-child": {
        padding: 0
      }
    },
    root: {
      backgroundColor: "#FFFFF",
      paddingLeft: 0,
      paddingRight: 24
    },
    spacer: {
      flex: 1
    },
    toolbar: {
      "& > *": {
        marginLeft: "8px"
      }
    }
  }),
  {
    name: "TableHeadBulk"
  }
);
