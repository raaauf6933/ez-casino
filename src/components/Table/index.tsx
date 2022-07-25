import React from "react";
import _ from "lodash";
import TableComponent from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
// import Skeleton from "@mui/material/Skeleton";
import TableRow from "@mui/material/TableRow";
// import { TableContainer, Paper } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { ColumnType } from "./../../types";
import useStyles from "./style";
import usePaginate from "hooks/usePaginate";
import { renderCollection } from "utils/misc";
import { Skeleton } from "@mui/material";
import TableHeadBulk from "components/TableHeadBulk";

interface TableProps {
  columns: ColumnType[];
  data: any[];
  loading: boolean;
  onRowClick?: (id: string) => void;
  minWidth?: number;
  selected?: string[];
  toggleAll?: () => void;
  toolbar?: React.ReactNode;
}

const Table: React.FC<TableProps> = props => {
  const {
    columns,
    data,
    loading,
    onRowClick,
    minWidth,
    toggleAll,
    selected,
    toolbar
  } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    currentPage: 0,
    pageSize: 10
  });

  const getPageData = () => {
    const { currentPage, pageSize } = state;
    const dataToRender = usePaginate(data, currentPage, pageSize);

    return {
      data: dataToRender,
      totalCount: data?.length
    };
  };

  // const getRowID = (item: unknown, column: ColumnType)=> {

  //   return _.get(item, column.path).id;
  // }

  const renderCell = (item: unknown, column: ColumnType): React.ReactNode => {
    if (typeof item === "function") {
      return null;
    }

    if (column.content) {
      return column.content(item);
    }

    return _.get(item, column.path);
  };

  const filterColumns = columns.filter(e => !e.hide);
  const pageData = getPageData().data;

  return (
    <>
      {/* <TableContainer component={Paper} className={classes.root}> */}
      <div className={classes.root}>
        <TableComponent
          sx={{ minWidth: minWidth ? minWidth : "unset" }}
          aria-label="simple table"
        >
          {toggleAll ? (
            <TableHeadBulk
              columns={filterColumns}
              colSpan={filterColumns.length}
              disabled={false}
              items={pageData ? pageData : []}
              selected={selected ? selected.length : 0}
              toggleAll={toggleAll}
              toolbar={toolbar}
            />
          ) : (
            <TableHead>
              <TableRow>
                {filterColumns.map(thead => (
                  <TableCell key={thead.key}>
                    <b>{thead.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}

          <TableBody>
            {renderCollection(
              pageData,
              loading,
              item => (
                <TableRow
                  key={Object.keys(item)[0]}
                  onClick={() => (onRowClick ? onRowClick(item.id) : null)}
                  hover
                >
                  {columns.map((column, index) =>
                    column.hide ? null : (
                      <TableCell
                        key={column.key + index.toString()}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {renderCell(item, column)}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ),
              () => (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <h1>No Data</h1>
                  </TableCell>
                </TableRow>
              ),
              () => (
                <TableRow>
                  {columns.map(column => (
                    <>
                      <TableCell key={column.key} align="center">
                        <Skeleton key={column.key} />
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              )
            )}
          </TableBody>
        </TableComponent>
      </div>

      {/* </TableContainer> */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        // nextIconButtonProps={{
        //   disabled: loading
        // }}
        SelectProps={{
          disabled: loading
        }}
        count={data?.length ? data?.length : 0}
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
