import { ColumnType } from "types";

const PayoutBatchDetailsColumn: ColumnType[] = [
  {
    key: 1,
    label: "Game ID",
    path: "game_code"
  },
  {
    key: 2,
    label: "Name",
    path: "name"
  },
  {
    key: 99,
    label: "Commission Rate",
    path: "comms_rate"
  },
  {
    key: 3,
    label: "Initial Salary",
    path: "initial_salary"
  },
  {
    key: 4,
    label: "Sub Agent Salary",
    path: "sub_agent_salary"
  },
  {
    key: 5,
    label: "Admin Fee",
    path: "admin_fee"
  },
  {
    key: 6,
    label: "Deduction",
    path: "deduction"
  },
  {
    key: 7,
    label: "Total Salary",
    path: "total_salary"
  },
  {
    key: 8,
    label: "Status",
    path: "status"
  }
];

export default PayoutBatchDetailsColumn;
