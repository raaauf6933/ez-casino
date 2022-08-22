import { Typography } from "@mui/material";
import StatusLabel from "components/StatusLabel";
import moment from "moment-timezone";
import { AgentPayoutStatus } from "types";
import { currencyFormat } from "utils/currencyFormat";

export const my_transaction_data = [
  {
    amount: <Typography color="red">{currencyFormat(60000)}</Typography>,
    date_created: moment(new Date()).format("LLL"),
    id: 1,
    status: <StatusLabel status={AgentPayoutStatus.PENDING} />,
    type: "Cash Advance"
  },
  {
    amount: <Typography color="green">{currencyFormat(120000)}</Typography>,
    date_created: moment(new Date()).format("LLL"),
    id: 2,
    status: "-",
    type: "Payout"
  }
];
