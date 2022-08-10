import { ColumnType } from "types";

const PayoutAgentDetailsColumn: ColumnType[] = [
  {
    key: 2,
    label: "Date Created",
    path: "date_created"
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
  }
];

export default PayoutAgentDetailsColumn;
