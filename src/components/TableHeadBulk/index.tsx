import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import * as React from "react";
import useStyles from "./style";
import classNames from "classnames";
import { ColumnType } from "types";

interface TableHeadBulkProps {
  toolbar?: React.ReactNode;
  toggleAll: (items: Node[], selected: number) => void;
  selected: number;
  items: any[];
  disabled: boolean;
  colSpan: number;
  columns: ColumnType[];
}

const TableHeadBulk: React.FC<TableHeadBulkProps> = props => {
  const { columns, colSpan, disabled, items, selected, toggleAll, toolbar } =
    props;

  const classes = useStyles(props);

  return (
    <TableHead>
      <TableRow>
        {(items === undefined || items.length > 0) && (
          <TableCell
            className={classNames({
              [classes.checkboxSelected]: selected
            })}
          >
            <Checkbox
              indeterminate={items && items.length > selected && selected > 0}
              checked={selected === 0 ? false : true}
              disabled={disabled}
              onChange={() => toggleAll(items, selected)}
            />
          </TableCell>
        )}
        {selected ? (
          <>
            <TableCell className={classNames(classes.root)} colSpan={colSpan}>
              <div className={classes.container}>
                {selected && selected === 1 ? (
                  <Typography>Selected {selected} items</Typography>
                ) : (
                  <Typography>Selected {selected} items</Typography>
                )}
                <div className={classes.spacer} />
                {toolbar && <div className={classes.toolbar}>{toolbar}</div>}
              </div>
            </TableCell>
          </>
        ) : (
          columns
            .filter(th => th.path !== "check_box")
            .map(th => <TableCell key={th.key}>{th.label}</TableCell>)
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadBulk;
