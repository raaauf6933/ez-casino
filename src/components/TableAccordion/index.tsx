import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ColumnType } from "types";
import usePaginate from "hooks/usePaginate";
import useStyles from "./styles";
import { Skeleton, TablePagination } from "@mui/material";
import _ from "lodash";
import { renderCollection } from "utils/misc";

function Row(props: any) {
  const { item, columns, subTableColumns, subTableData, onRowClick } = props;
  const [open, setOpen] = React.useState(false);

  const renderCell = (item: unknown, column: ColumnType): React.ReactNode => {
    if (typeof item === "function") {
      return null;
    }

    if (column.content) {
      return column.content(item);
    }

    return _.get(item, column.path);
  };

  return (
    <React.Fragment>
      <TableRow onClick={() => (onRowClick ? onRowClick(item.id) : null)} hover>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((column: any, index: number) =>
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
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={subTableColumns.length + 1}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sub Agent
              </Typography>
              <div
                style={{
                  overflowX: "auto",
                  tableLayout: "auto",
                  width: "100%"
                }}
              >
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {subTableColumns.map((thead: any) => (
                        <TableCell key={thead.key}>
                          <b>{thead.label}</b>
                        </TableCell>
                      ))}
                      {/* <TableCell>Game ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {renderCollection(
                      subTableData,
                      false,
                      subData => (
                        <>
                          <TableRow
                            key={Object.keys(subData)[0]}
                            onClick={() =>
                              onRowClick ? onRowClick(subData.id) : null
                            }
                            hover
                          >
                            {subTableColumns.map((column: any, index: number) =>
                              column.hide ? null : (
                                <TableCell
                                  key={column.key + index.toString()}
                                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                >
                                  {renderCell(subData, column)}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        </>
                      ),
                      () => (
                        <TableRow>
                          <TableCell
                            colSpan={subTableColumns.length}
                            align="center"
                          >
                            <h1>No Data</h1>
                          </TableCell>
                        </TableRow>
                      ),
                      () => (
                        <TableRow>
                          {subTableColumns.map((column: any) => (
                            <>
                              <TableCell key={column.key} align="center">
                                <Skeleton key={column.key} />
                              </TableCell>
                            </>
                          ))}
                        </TableRow>
                      )
                    )}
                    {/* {subTableColumns.map((column: any, index: number) =>
                      column.hide ? null : (
                        <TableCell
                          key={column.key + index.toString()}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {renderCell(item, column)}
                        </TableCell>
                      )
                    )} */}
                  </TableBody>
                </Table>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface TableAccordionProps {
  columns: ColumnType[];
  subTableColumns: ColumnType[];
  data: any[];
  loading: boolean;
  onRowClick?: (id: string) => void;
  minWidth?: number;
  selected?: string[];
  toggleAll?: () => void;
  toolbar?: React.ReactNode;
  defaultPageSize?: number;
}

const TableAccordion: React.FC<TableAccordionProps> = props => {
  const {
    minWidth,
    columns,
    defaultPageSize,
    data,
    loading,
    onRowClick,
    subTableColumns
  } = props;

  const classes = useStyles();
  const [state, setState] = React.useState({
    currentPage: 0,
    pageSize: defaultPageSize || 10
  });

  const getPageData = () => {
    const { currentPage, pageSize } = state;
    const dataToRender = usePaginate(data, currentPage, pageSize);

    return {
      data: dataToRender,
      totalCount: data?.length
    };
  };

  const filterColumns = columns.filter(e => !e.hide);
  const pageData = getPageData().data;

  return (
    <>
      <div className={classes.root}>
        <Table
          sx={{ minWidth: minWidth ? minWidth : "unset" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell />
              {filterColumns.map(thead => (
                <TableCell key={thead.key}>
                  <b>{thead.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ "& > *": { borderBottom: "unset" } }}>
            {renderCollection(
              pageData,
              loading,
              item => (
                <>
                  <Row
                    item={item}
                    columns={columns}
                    onRowClick={onRowClick}
                    subTableColumns={subTableColumns}
                    subTableData={item.subData}
                  />
                </>
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
                  {columns.map((column: any) => (
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
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
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

export default TableAccordion;
