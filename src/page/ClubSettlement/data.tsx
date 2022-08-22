import StatusLabel from "components/StatusLabel";
import moment from "moment";
import { AgentPayoutStatus, BatchPayoutStatusType } from "types";
import { currencyFormat } from "utils/currencyFormat";

export const club_payout_data = [
  {
    club_name: "X POKER PH",
    date_created: moment(new Date()).format("LLL"),
    generated_by: "Jonas Kevin Esquillo",
    id: 1,
    status: <StatusLabel status={BatchPayoutStatusType.ONGOING} />
  }
];

export const club_cashadvance_data = [
  {
    amount: currencyFormat(120000),
    club_name: "X POKER PH",
    date_created: moment(new Date()).format("LLL"),
    id: 1,
    status: <StatusLabel status={AgentPayoutStatus.PENDING} />
  }
];
