import React from "react";
import _ from "lodash";
import TableComponent from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import { TableContainer, Paper } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { ColumnType } from "./../../types";
// import useStyles from "./style";
import usePaginate from "hooks/usePaginate";
import { renderCollection } from "utils/misc";

interface TableProps {
  columns: ColumnType[];
  data: any[];
}

const Table: React.FC<TableProps> = props => {
  const { columns, data } = props;
  // const classes = useStyles();

  const [state, setState] = React.useState({
    currentPage: 0,
    pageSize: 10
  });

  const getPageData = () => {
    const { currentPage, pageSize } = state;
    const dataToRender = usePaginate(data, currentPage, pageSize);

    return {
      data: dataToRender,
      totalCount: data.length
    };
  };

  const renderCell = (item: unknown, column: ColumnType): React.ReactNode =>
    _.get(item, column.path);

  return (
    <>
      {/* <TableContainer component={Paper} className={classes.root}> */}
      <TableComponent sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(thead => (
              <TableCell key={thead.key}>
                <b>{thead.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            getPageData().data,
            item => (
              <TableRow key={Object.keys(item)[0]} hover>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.key + index.toString()}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {renderCell(item, column)}
                  </TableCell>
                ))}
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <span>No Data</span>
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <span>No Data</span>
                </TableCell>
              </TableRow>
            )
          )}

          {/* {getPageData().data.map((item: object) => (
          <TableRow key={Object.keys(item)[0]} hover>
            {columns.map((column, index) => (
              <TableCell
                key={column.key + index.toString()}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {renderCell(item, column)}
              </TableCell>
            ))}
          </TableRow>
        ))} */}
        </TableBody>
      </TableComponent>
      {/* </TableContainer> */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={state.pageSize}
        page={state.currentPage}
        onPageChange={(_e, page) => setState({ ...state, currentPage: page })}
        onRowsPerPageChange={e => {
          setState({ ...state, pageSize: parseInt(e.target.value) });
        }}
      />
    </>
  );
};

export default Table;
