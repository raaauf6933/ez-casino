import { ColumnType } from "types";

const ClubTransactionTableColumn: ColumnType[] = [
  {
    key: 2,
    label: "Date Created",
    path: "date_created"
  },
  {
    key: 99,
    label: "Type",
    path: "type"
  },
  {
    key: 3,
    label: "Amount",
    path: "amount"
  },
  {
    key: 7,
    label: "Status",
    path: "status"
  }
];

export default ClubTransactionTableColumn;
