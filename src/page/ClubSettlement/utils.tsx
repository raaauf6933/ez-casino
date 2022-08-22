import { AxiosResponse } from "axios";
import StatusLabel from "components/StatusLabel";
import moment from "moment";
import { ColumnType } from "types";
import { currencyFormat } from "utils/currencyFormat";

export const club_batch_payout_columns: ColumnType[] = [
  {
    key: 1,
    label: "ID",
    path: "id"
  },
  {
    key: 2,
    label: "Total Club Fee",
    path: "total_club_fee"
  },
  {
    key: 3,
    label: "Generated By",
    path: "generated_by"
  },
  {
    key: 3,
    label: "Date Created",
    path: "date_created"
  },
  {
    key: 4,
    label: "Status",
    path: "status"
  }
];

export const club_cash_advance_column: ColumnType[] = [
  {
    key: 1,
    label: "ID",
    path: "id"
  },
  {
    key: 2,
    label: "Club Name",
    path: "club_name"
  },
  {
    key: 3,
    label: "Amount",
    path: "amount"
  },
  {
    key: 3,
    label: "Date Created",
    path: "date_created"
  },
  {
    key: 4,
    label: "Status",
    path: "status"
  }
];

export const club_batch_payoutdetails_column: ColumnType[] = [
  {
    key: 1,
    label: "ID",
    path: "id"
  },
  {
    key: 2,
    label: "Club Name",
    path: "club_name"
  },
  {
    key: 3,
    label: "Amount",
    path: "amount"
  }
];

export const tabs = [
  {
    label: "ALL",
    name: "ALL"
  },
  {
    label: "Club Payout",
    name: "CLUB_PAYOUT"
  },
  {
    label: "Cash Advance",
    name: "CASH_ADVANCE"
  }
];

export const parseBatchClubPayoutList = (
  response: AxiosResponse<any, any> | undefined
) => {
  return response?.data?.data.map((batch: any) => ({
    date_created: moment(batch.createdAt).format("LLL"),
    generated_by: `${batch?.user?.first_name} ${batch?.user?.last_name}`,
    id: batch.id,
    status: <StatusLabel status={batch.status} />,
    total_club_fee: currencyFormat(batch.total_club_fee)
  }));
};
